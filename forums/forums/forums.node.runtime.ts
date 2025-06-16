import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';

import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { SearchAspect, type SearchNode, type SearchResultItem } from '@infinity/search.search';
// TODO: Resolve missing SearchResult type/class for indexFunction. Expected from '@infinity/search.entities.search-result'
// but this package is not in the allowed list or directly exported by '@infinity/search.search'.
// The following import would be needed if the package was allowed:
// import { SearchResult } from '@infinity/search.entities.search-result';
import { getModelForClass } from '@typegoose/typegoose';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

import { Forum } from '@infinity/forums.entities.forum';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import { ForumPost } from '@infinity/forums.entities.forum-post';

import type { ForumsConfig } from './forums-config.js';
import { forumsGqlSchema } from './forums.graphql.js';

import { ForumModel, mockForumModels } from './forum.model.js';
import { ForumTopicModel, mockForumTopicModels } from './forum-topic.model.js';
import { ForumPostModel, mockForumPostModels } from './forum-post.model.js';

import { ForumRepository } from './forum-repository.js';
import { ForumTopicRepository } from './forum-topic-repository.js';
import { ForumPostRepository } from './forum-post-repository.js';

import type {
  User,
  CreateForumOptions, GetForumOptions, UpdateForumOptions, DeleteForumOptions, ListForumsOptions, SearchForumsOptions,
  CreateTopicOptions, GetTopicOptions, UpdateTopicOptions, DeleteTopicOptions, ListTopicsOptions,
  CreatePostOptions, GetPostOptions, UpdatePostOptions, DeletePostOptions, ListPostsOptions
} from './forums-types.js';
import { SearchResult } from '@infinity/search.entities.search-result';

export class ForumsNode {
  constructor(
    private forumsConfig: ForumsConfig,
    private forumRepository: ForumRepository,
    private forumTopicRepository: ForumTopicRepository,
    private forumPostRepository: ForumPostRepository,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private search: SearchNode,
  ) {}

  /**
   * Ensures the user is authenticated. Throws Unauthorized if not.
   * @param user - The user object from the session.
   */
  private async ensureAuthenticated(user?: User) {
    if (!user || !user.id) throw new Unauthorized();
  }

  /**
   * Ensures the user is an administrator. Throws AccessDenied if not.
   * @param user - The user object from the session.
   */
  private async ensureAdmin(user: User) {
    if (!user || !user.id) throw new Unauthorized();
    if (!user.roles?.includes('admin')) {
      throw new AccessDenied('Only administrators can perform this action.');
    }
  }

  /**
   * Ensures the user is either an administrator or the author of the content. Throws AccessDenied if not.
   * @param user - The user object from the session.
   * @param authorId - The ID of the content's author.
   */
  private async ensureAdminOrAuthor(user: User, authorId: string) {
    if (!user || !user.id) throw new Unauthorized();
    if (!user.roles?.includes('admin') && user.id !== authorId) {
      throw new AccessDenied();
    }
  }

  /**
   * Creates a new forum.
   * @param options - The options for creating the forum.
   * @param user - The user creating the forum. Must be an administrator.
   * @returns The created Forum entity.
   */
  async createForum(options: CreateForumOptions, user: User): Promise<Forum> {
    await this.ensureAdmin(user);
    const forum = await this.forumRepository.createForum(options);
    await this.search.indexContent({
      type: 'forum',
      id: forum.id,
      data: { ...forum.toObject(), type: 'forum' }
    });
    return forum;
  }

  /**
   * Retrieves a specific forum by ID.
   * @param options - The options containing the forum ID.
   * @param user - Optional user context.
   * @returns The Forum entity.
   * @throws NotFound if the forum is not found.
   */
  async getForum(options: GetForumOptions, user?: User): Promise<Forum> {
    const forum = await this.forumRepository.getForum(options.id);
    if (!forum) throw new NotFound(`Forum with id ${options.id} not found`);
    return forum;
  }

  /**
   * Updates an existing forum.
   * @param options - The options for updating the forum.
   * @param user - The user updating the forum. Must be an administrator.
   * @returns The updated Forum entity.
   * @throws NotFound if the forum is not found.
   */
  async updateForum(options: UpdateForumOptions, user: User): Promise<Forum> {
    await this.ensureAdmin(user);
    const updatedForum = await this.forumRepository.updateForum(options.id, options);
    if (!updatedForum) throw new NotFound(`Forum with id ${options.id} not found`);
    await this.search.indexContent({
      type: 'forum',
      id: updatedForum.id,
      data: { ...updatedForum.toObject(), type: 'forum' }
    });
    return updatedForum;
  }

  /**
   * Deletes a forum.
   * @param options - The options for deleting the forum.
   * @param user - The user deleting the forum. Must be an administrator.
   * @throws NotFound if the forum is not found.
   */
  async deleteForum(options: DeleteForumOptions, user: User): Promise<void> {
    await this.ensureAdmin(user);
    const deleted = await this.forumRepository.deleteForum(options.id);
    if (!deleted) throw new NotFound(`Forum with id ${options.id} not found`);

    // Delete associated topics and their posts
    const topicsToDelete = await this.forumTopicRepository.listTopics(options.id);
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of topicsToDelete) {
      // eslint-disable-next-line no-await-in-loop
      await this.forumPostRepository.deletePostsByTopicId(topic.id);
      // eslint-disable-next-line no-await-in-loop
      await this.forumTopicRepository.deleteTopic(topic.id);
    }
  }

  /**
   * Lists all forums.
   * @param options - Optional pagination and search options.
   * @param user - Optional user context.
   * @returns An array of Forum entities.
   */
  async listForums(options?: ListForumsOptions, user?: User): Promise<Forum[]> {
    return this.forumRepository.listForums(options);
  }

  /**
   * Searches for forums based on a query.
   * @param options - Search query options.
   * @param user - Optional user context.
   * @returns An array of Forum entities matching the search criteria.
   */
  async searchForums(options: SearchForumsOptions, user?: User): Promise<Forum[]> {
    const searchResults = await this.search.search({
      query: options.query,
      limit: options.limit,
      offset: options.offset,
      searchType: 'forum'
    });
    const forumIds = searchResults.map(res => res.id);
    const forums = await Promise.all(forumIds.map(id => this.forumRepository.getForum(id)));
    return forums.filter((forum): forum is Forum => forum !== null);
  }

  /**
   * Creates a new topic within a forum.
   * @param options - The options for creating the topic.
   * @param user - The user creating the topic. Must be authenticated.
   * @returns The created ForumTopic entity.
   */
  async createTopic(options: CreateTopicOptions, user: User): Promise<ForumTopic> {
    await this.ensureAuthenticated(user);
    const topic = await this.forumTopicRepository.createTopic({ ...options, userId: user.id });
    const forum = await this.forumRepository.getForum(topic.forumId);
    await this.search.indexContent({
      type: 'forum-topic',
      id: topic.id,
      data: { ...topic.toObject(), type: 'forum-topic', forumName: forum?.name }
    });
    return topic;
  }

  /**
   * Retrieves a specific topic by ID.
   * @param options - The options containing the topic ID.
   * @param user - Optional user context.
   * @returns The ForumTopic entity.
   * @throws NotFound if the topic is not found.
   */
  async getTopic(options: GetTopicOptions, user?: User): Promise<ForumTopic> {
    const topic = await this.forumTopicRepository.getTopic(options.id);
    if (!topic) throw new NotFound(`Topic with id ${options.id} not found`);
    return topic;
  }

  /**
   * Updates an existing topic.
   * @param options - The options for updating the topic.
   * @param user - The user updating the topic. Must be authenticated and either the author or an administrator.
   * @returns The updated ForumTopic entity.
   * @throws NotFound if the topic is not found.
   */
  async updateTopic(options: UpdateTopicOptions, user: User): Promise<ForumTopic> {
    const existingTopic = await this.forumTopicRepository.getTopic(options.id);
    if (!existingTopic) throw new NotFound(`Topic with id ${options.id} not found`);
    await this.ensureAdminOrAuthor(user, existingTopic.userId);

    const updatedTopic = await this.forumTopicRepository.updateTopic(options.id, options);
    if (!updatedTopic) throw new NotFound(`Topic with id ${options.id} not found`);
    const forum = await this.forumRepository.getForum(updatedTopic.forumId);
    await this.search.indexContent({
      type: 'forum-topic',
      id: updatedTopic.id,
      data: { ...updatedTopic.toObject(), type: 'forum-topic', forumName: forum?.name }
    });
    return updatedTopic;
  }

  /**
   * Deletes a topic.
   * @param options - The options for deleting the topic.
   * @param user - The user deleting the topic. Must be authenticated and either the author or an administrator.
   * @throws NotFound if the topic is not found.
   */
  async deleteTopic(options: DeleteTopicOptions, user: User): Promise<void> {
    const existingTopic = await this.forumTopicRepository.getTopic(options.id);
    if (!existingTopic) throw new NotFound(`Topic with id ${options.id} not found`);
    await this.ensureAdminOrAuthor(user, existingTopic.userId);

    const deleted = await this.forumTopicRepository.deleteTopic(options.id);
    if (!deleted) throw new NotFound(`Topic with id ${options.id} not found`);

    // Delete associated posts
    await this.forumPostRepository.deletePostsByTopicId(options.id);
  }

  /**
   * Lists topics within a specific forum.
   * @param options - Options including forum ID and pagination.
   * @param user - Optional user context.
   * @returns An array of ForumTopic entities.
   */
  async listTopics(options: ListTopicsOptions, user?: User): Promise<ForumTopic[]> {
    return this.forumTopicRepository.listTopics(options.forumId, options);
  }

  /**
   * Creates a new post within a topic.
   * @param options - The options for creating the post.
   * @param user - The user creating the post. Must be authenticated.
   * @returns The created ForumPost entity.
   */
  async createPost(options: CreatePostOptions, user: User): Promise<ForumPost> {
    await this.ensureAuthenticated(user);
    const post = await this.forumPostRepository.createPost({ ...options, userId: user.id });
    const topic = await this.forumTopicRepository.getTopic(post.topicId);
    await this.search.indexContent({
      type: 'forum-post',
      id: post.id,
      data: { ...post.toObject(), type: 'forum-post', title: topic?.title, description: post.content }
    });
    return post;
  }

  /**
   * Retrieves a specific post by ID.
   * @param options - The options containing the post ID.
   * @param user - Optional user context.
   * @returns The ForumPost entity.
   * @throws NotFound if the post is not found.
   */
  async getPost(options: GetPostOptions, user?: User): Promise<ForumPost> {
    const post = await this.forumPostRepository.getPost(options.id);
    if (!post) throw new NotFound(`Post with id ${options.id} not found`);
    return post;
  }

  /**
   * Updates an existing post.
   * @param options - The options for updating the post.
   * @param user - The user updating the post. Must be authenticated and either the author or an administrator.
   * @returns The updated ForumPost entity.
   * @throws NotFound if the post is not found.
   */
  async updatePost(options: UpdatePostOptions, user: User): Promise<ForumPost> {
    const existingPost = await this.forumPostRepository.getPost(options.id);
    if (!existingPost) throw new NotFound(`Post with id ${options.id} not found`);
    await this.ensureAdminOrAuthor(user, existingPost.userId);

    const updatedPost = await this.forumPostRepository.updatePost(options.id, options);
    if (!updatedPost) throw new NotFound(`Post with id ${options.id} not found`);
    const topic = await this.forumTopicRepository.getTopic(updatedPost.topicId);
    await this.search.indexContent({
      type: 'forum-post',
      id: updatedPost.id,
      data: { ...updatedPost.toObject(), type: 'forum-post', topicTitle: topic?.title }
    });
    return updatedPost;
  }

  /**
   * Deletes a post.
   * @param options - The options for deleting the post.
   * @param user - The user deleting the post. Must be authenticated and either the author or an administrator.
   * @throws NotFound if the post is not found.
   */
  async deletePost(options: DeletePostOptions, user: User): Promise<void> {
    const existingPost = await this.forumPostRepository.getPost(options.id);
    if (!existingPost) throw new NotFound(`Post with id ${options.id} not found`);
    await this.ensureAdminOrAuthor(user, existingPost.userId);

    const deleted = await this.forumPostRepository.deletePost(options.id);
    if (!deleted) throw new NotFound(`Post with id ${options.id} not found`);
  }

  /**
   * Lists posts within a specific topic.
   * @param options - Options including topic ID and pagination.
   * @param user - Optional user context.
   * @returns An array of ForumPost entities.
   */
  async listPosts(options: ListPostsOptions, user?: User): Promise<ForumPost[]> {
    return this.forumPostRepository.listPosts(options.topicId, options);
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, SearchAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, search]: [SymphonyPlatformNode, ProductHuntPlatformNode, SearchNode],
    config: ForumsConfig,
  ) {
    const forumModel = getModelForClass(ForumModel);
    const forumTopicModel = getModelForClass(ForumTopicModel);
    const forumPostModel = getModelForClass(ForumPostModel);

    const forumRepository = new ForumRepository(forumModel);
    const forumTopicRepository = new ForumTopicRepository(forumTopicModel);
    const forumPostRepository = new ForumPostRepository(forumPostModel);

    const forums = new ForumsNode(
      config,
      forumRepository,
      forumTopicRepository,
      forumPostRepository,
      symphonyPlatform,
      productHuntPlatform,
      search,
    );

    const gqlSchema = forumsGqlSchema(forums);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    // Seed mock data
    symphonyPlatform.registerOnStart(async () => {
      const forumCount = await forumModel.countDocuments();
      if (forumCount === 0) {
        await forumModel.insertMany(mockForumModels);
      }
      const topicCount = await forumTopicModel.countDocuments();
      if (topicCount === 0) {
        await forumTopicModel.insertMany(mockForumTopicModels);
      }
      const postCount = await forumPostModel.countDocuments();
      if (postCount === 0) {
        await forumPostModel.insertMany(mockForumPostModels);
      }
    });

    // Register search types
    search.registerSearchType({
      name: 'forum',
      label: 'Forums',
      description: 'Search for forum discussions',
      indexFunction: (entity: Forum) => {
        const plainEntity = entity.toObject();

        return SearchResult.from({
          id: plainEntity.id,
          title: plainEntity.name,
          description: plainEntity.description,
          type: 'forum',
          // url: `/forums/${plainEntity.id}`,
          // imageUrl: plainEntity.imageUrl,
          // content: `${plainEntity.name} ${plainEntity.description}`,
          // Adding the 'data' field.
          data: { ...plainEntity, originalUrl: `/forums/${plainEntity.id}` }
        });
      }
    });

    search.registerSearchType({
      name: 'forum-topic',
      label: 'Forum Topics',
      description: 'Search for topics within forums',
      indexFunction: (entity: ForumTopic) => {
        const plainEntity = entity.toObject();
         
        return SearchResult.from({
          id: plainEntity.id,
          title: plainEntity.title,
          description: plainEntity.content,
          type: 'forum-topic',
          // url: `/forums/${plainEntity.forumId}/topics/${plainEntity.id}`,
          // content: `${plainEntity.title} ${plainEntity.content}`,
          data: { ...plainEntity, originalUrl: `/forums/${plainEntity.forumId}/topics/${plainEntity.id}` }
        });
      }
    });

    search.registerSearchType({
      name: 'forum-post',
      label: 'Forum Posts',
      description: 'Search for posts within forum topics',
      indexFunction: (entity: ForumPost) => {
        const plainEntity = entity.toObject();
         
        return SearchResult.from({
          id: plainEntity.id,
          title: `Post by ${plainEntity.userId} in topic ${plainEntity.topicId}`,
          description: plainEntity.content,
          type: 'forum-post',
          data: { ...plainEntity, originalUrl: `/forums/topic/${plainEntity.topicId}/post/${plainEntity.id}` }
        });
      }
    });
    
    return forums;
  }
}

export default ForumsNode;