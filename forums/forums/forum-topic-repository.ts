import { ReturnModelType } from '@typegoose/typegoose';
import { ForumTopicModel } from './forum-topic.model.js';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import type { CreateTopicOptions, UpdateTopicOptions, ListTopicsOptions } from './forums-types.js';

/**
 * Repository for managing Forum Topic data in the database.
 */
export class ForumTopicRepository {
  constructor(private forumTopicModel: ReturnModelType<typeof ForumTopicModel>) {}

  /**
   * Creates a new topic in the database.
   * @param options - The options for creating the topic, including userId.
   * @returns The created ForumTopic entity.
   */
  async createTopic(options: CreateTopicOptions & { userId: string }): Promise<ForumTopic> {
    const now = new Date().toISOString();
    const topicDoc = await this.forumTopicModel.create({
      forumId: options.forumId,
      title: options.title,
      content: options.content,
      userId: options.userId,
      createdAt: now,
      updatedAt: now,
    });
    return ForumTopic.from(topicDoc.toObject());
  }

  /**
   * Retrieves a topic by its ID.
   * @param id - The ID of the topic.
   * @returns The ForumTopic entity if found, otherwise null.
   */
  async getTopic(id: string): Promise<ForumTopic | null> {
    const topicDoc = await this.forumTopicModel.findOne({ id }).lean();
    if (!topicDoc) return null;
    return ForumTopic.from(topicDoc);
  }

  /**
   * Updates an existing topic.
   * @param id - The ID of the topic to update.
   * @param updates - The fields to update.
   * @returns The updated ForumTopic entity if found, otherwise null.
   */
  async updateTopic(id: string, updates: Partial<UpdateTopicOptions>): Promise<ForumTopic | null> {
    const now = new Date().toISOString();
    const topicDoc = await this.forumTopicModel.findOneAndUpdate(
      { id },
      { ...updates, updatedAt: now },
      { new: true }
    ).lean();
    if (!topicDoc) return null;
    return ForumTopic.from(topicDoc);
  }

  /**
   * Deletes a topic by its ID.
   * @param id - The ID of the topic to delete.
   * @returns True if the topic was deleted, false otherwise.
   */
  async deleteTopic(id: string): Promise<boolean> {
    const res = await this.forumTopicModel.deleteOne({ id });
    return res.deletedCount === 1;
  }

  /**
   * Deletes topics belonging to a specific forum.
   * @param forumId - The ID of the forum whose topics to delete.
   * @returns The number of deleted topics.
   */
  async deleteTopicsByForumId(forumId: string): Promise<number> {
    const res = await this.forumTopicModel.deleteMany({ forumId });
    return res.deletedCount;
  }

  /**
   * Lists topics within a specific forum with optional pagination.
   * @param forumId - The ID of the forum.
   * @param options - Pagination options.
   * @returns An array of ForumTopic entities.
   */
  async listTopics(forumId: string, options?: ListTopicsOptions): Promise<ForumTopic[]> {
    const findQuery = this.forumTopicModel.find({ forumId });

    if (options?.limit) {
      findQuery.limit(options.limit);
    }
    if (options?.offset) {
      findQuery.skip(options.offset);
    }

    const topicDocs = await findQuery.sort({ createdAt: -1 }).lean();
    return topicDocs.map((doc) => ForumTopic.from(doc));
  }
}