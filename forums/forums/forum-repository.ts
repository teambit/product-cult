import { ReturnModelType } from '@typegoose/typegoose';
import { FilterQuery } from 'mongoose';
import { ForumModel } from './forum.model.js';
import { Forum } from '@infinity/forums.entities.forum';
import type { CreateForumOptions, UpdateForumOptions, ListForumsOptions } from './forums-types.js';

/**
 * Repository for managing Forum data in the database.
 */
export class ForumRepository {
  constructor(private forumModel: ReturnModelType<typeof ForumModel>) {}

  /**
   * Creates a new forum in the database.
   * @param options - The options for creating the forum.
   * @returns The created Forum entity.
   */
  async createForum(options: CreateForumOptions): Promise<Forum> {
    const now = new Date().toISOString();
    const forumDoc = await this.forumModel.create({
      name: options.name,
      description: options.description,
      imageUrl: options.imageUrl,
      createdAt: now,
      updatedAt: now,
    });
    return Forum.from(forumDoc.toObject());
  }

  /**
   * Retrieves a forum by its ID.
   * @param id - The ID of the forum.
   * @returns The Forum entity if found, otherwise null.
   */
  async getForum(id: string): Promise<Forum | null> {
    const forumDoc = await this.forumModel.findOne({ id }).lean();
    if (!forumDoc) return null;
    return Forum.from(forumDoc);
  }

  /**
   * Updates an existing forum.
   * @param id - The ID of the forum to update.
   * @param updates - The fields to update.
   * @returns The updated Forum entity if found, otherwise null.
   */
  async updateForum(id: string, updates: Partial<UpdateForumOptions>): Promise<Forum | null> {
    const now = new Date().toISOString();
    const forumDoc = await this.forumModel.findOneAndUpdate(
      { id },
      { ...updates, updatedAt: now },
      { new: true }
    ).lean();
    if (!forumDoc) return null;
    return Forum.from(forumDoc);
  }

  /**
   * Deletes a forum by its ID.
   * @param id - The ID of the forum to delete.
   * @returns True if the forum was deleted, false otherwise.
   */
  async deleteForum(id: string): Promise<boolean> {
    const res = await this.forumModel.deleteOne({ id });
    return res.deletedCount === 1;
  }

  /**
   * Lists forums with optional pagination and search.
   * @param options - Pagination and search options.
   * @returns An array of Forum entities.
   */
  async listForums(options?: ListForumsOptions): Promise<Forum[]> {
    const filter: FilterQuery<ForumModel> = {};
    if (options?.search) {
      filter.$text = { $search: options.search };
    }

    const findQuery = this.forumModel.find(filter);

    if (options?.limit) {
      findQuery.limit(options.limit);
    }
    if (options?.offset) {
      findQuery.skip(options.offset);
    }

    const forumDocs = await findQuery.sort({ createdAt: -1 }).lean();
    return forumDocs.map((doc) => Forum.from(doc));
  }
}