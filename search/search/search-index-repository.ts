import { ReturnModelType } from '@typegoose/typegoose';
import { SearchIndexModel } from './search-index.model.js';
import type { IndexContentOptions, SearchOptions } from './search-types.js';

/**
 * Repository for managing search index data in the database.
 */
export class SearchIndexRepository {
  constructor(private searchIndexModel: ReturnModelType<typeof SearchIndexModel>) {}

  /**
   * Creates a new search index entry.
   * @param options - The options for creating the search index entry.
   * @returns The created SearchIndexModel document.
   */
  async create(options: IndexContentOptions): Promise<SearchIndexModel> {
    const existing = await this.searchIndexModel.findOne({ id: options.id, type: options.type });
    if (existing) {
      existing.title = options.data.title || existing.title;
      existing.description = options.data.description || existing.description;
      existing.imageUrl = options.data.imageUrl || existing.imageUrl;
      existing.keywords = options.data.keywords || existing.keywords;
      existing.data = options.data.data || existing.data;
      await existing.save();
      return existing.toObject();
    }

    const { type, id, data } = options;
    const doc = await this.searchIndexModel.create({
      id,
      type,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      keywords: data.keywords,
      data: data.data || {},
    });
    return doc.toObject();
  }

  /**
   * Lists search index entries based on search options.
   * @param options - Search query options.
   * @returns A list of SearchIndexModel documents.
   */
  async list(options: SearchOptions): Promise<SearchIndexModel[]> {
    const query: any = {};
    const { query: searchTerm, searchType, sortBy, sortOrder, limit, offset, filters } = options;

    if (searchTerm) {
      // Use text search for 'query'
      query.$text = { $search: searchTerm };
    }

    if (searchType) {
      query.type = searchType;
    }

    if (filters) {
      // Apply additional filters from the options
      Object.assign(query, filters);
    }

    let search = this.searchIndexModel.find(query);

    if (sortBy) {
      const sortDirection = sortOrder === 'desc' ? -1 : 1;
      search = search.sort({ [sortBy]: sortDirection });
    } else if (searchTerm) {
      // Sort by text score if a search term is present and no specific sortBy is given
      search = search.sort({ score: { $meta: 'textScore' } });
    } else {
      // Default sort by creation date if no search term and no specific sortBy
      search = search.sort({ createdAt: -1 });
    }

    if (offset !== undefined) {
      search = search.skip(offset);
    }
    if (limit !== undefined) {
      search = search.limit(limit);
    }

    const results = await search.exec();
    return results.map((result) => result.toObject());
  }
}