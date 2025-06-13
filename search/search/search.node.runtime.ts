import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { SearchResult } from '@infinity/search.entities.search-result';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';

import type { SearchConfig } from './search-config.js';
import { searchGqlSchema } from './search.graphql.js';
import { SearchIndexModel, mockSearchIndexModels } from './search-index.model.js';
import { SearchIndexRepository } from './search-index-repository.js';
import type { IndexContentOptions, RegisterSearchTypeOptions, SearchOptions, SearchType } from './search-types.js';
import { getModelForClass } from '@typegoose/typegoose';

/**
 * The Node.js runtime for the Search aspect, providing backend search capabilities.
 */
export class SearchNode {
  private registeredSearchTypes: Map<string, RegisterSearchTypeOptions> = new Map();

  constructor(
    private searchConfig: SearchConfig,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private searchIndexRepository: SearchIndexRepository
  ) {
    // Register default search types
    this.registerSearchType({
      name: 'product',
      label: 'Products',
      description: 'Search for products on the platform.',
      indexFunction: (entity: any) => new SearchResult(entity.id, entity.name, entity.description, 'product', { url: `/products/${entity.id}` }, entity.imageUrl),
    });
    this.registerSearchType({
      name: 'news',
      label: 'News Articles',
      description: 'Search for news articles.',
      indexFunction: (entity: any) => new SearchResult(entity.id, entity.title, entity.summary, 'news', { url: `/news/${entity.id}` }),
    });
    this.registerSearchType({
      name: 'forum-post',
      label: 'Forum Posts',
      description: 'Search for discussions and posts in forums.',
      indexFunction: (entity: any) => new SearchResult(entity.id, entity.subject, entity.contentPreview, 'forum-post', { url: `/forum/posts/${entity.id}` }),
    });
  }

  /**
   * Searches for content based on the provided options.
   * @param options - The search query options.
   * @returns A promise that resolves to an array of SearchResult entities.
   */
  async search(options: SearchOptions): Promise<SearchResult[]> {
    const searchModels = await this.searchIndexRepository.list(options);
    return searchModels.map(model => {
      // Assuming SearchResult.from can handle plain objects with corresponding properties
      return SearchResult.from({
        id: model.id,
        title: model.title,
        description: model.description,
        imageUrl: model.imageUrl,
        type: model.type,
        data: model.data?.attributes || {},
      });
    });
  }

  /**
   * Registers a new search type. This allows other aspects to contribute searchable content.
   * @param options - The options for registering the search type.
   */
  registerSearchType(options: RegisterSearchTypeOptions): void {
    if (this.registeredSearchTypes.has(options.name)) {
      console.warn(`Search type '${options.name}' is already registered. Overwriting.`);
    }
    this.registeredSearchTypes.set(options.name, options);
  }

  /**
   * Indexes content for a specific search type. This data will then be searchable.
   * @param options - The content indexing options.
   * @param user - The user performing the indexing, used for authorization. Must be an admin.
   */
  async indexContent(options: IndexContentOptions): Promise<void> {
    await this.searchIndexRepository.create(options);
  }

  /**
   * Lists all registered search types.
   * @returns An array of registered SearchType definitions.
   */
  listSearchTypes(): SearchType[] {
    return Array.from(this.registeredSearchTypes.values()).map(type => ({
      name: type.name,
      label: type.label,
      description: type.description,
    }));
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform]: [SymphonyPlatformNode, ProductHuntPlatformNode],
    config: SearchConfig,
  ) {
    const searchIndexModel = getModelForClass(SearchIndexModel);
    const searchIndexRepository = new SearchIndexRepository(searchIndexModel);

    const search = new SearchNode(config, symphonyPlatform, productHuntPlatform, searchIndexRepository);

    const gqlSchema = searchGqlSchema(search);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingDocs = await searchIndexModel.countDocuments();
      if (existingDocs === 0) {
        await searchIndexModel.insertMany(mockSearchIndexModels.map(doc => ({
          ...doc,
          _id: undefined // Let MongoDB generate _id, use 'id' for logical UUID
        })));
        console.log('Search index mock data seeded.');
      }
    });

    return search;
  }
}

export default SearchNode;