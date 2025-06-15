import { ReturnModelType } from '@typegoose/typegoose';
import { UpvoteModel } from './upvote.model.js';
import { v4 as uuid } from 'uuid';
import {
  CreateUpvoteOptions,
  ListUpvotesOptions,
} from './upvote-options.js';

/**
 * Manages data interactions for Upvote entities in the database.
 */
export class UpvoteRepository {
  constructor(private upvoteModel: ReturnModelType<typeof UpvoteModel>) {}

  /**
   * Creates a new upvote record in the database.
   * @param options - The creation options, including item ID and type.
   * @param userId - The ID of the user performing the upvote.
   * @returns The created UpvoteModel object.
   */
  async createUpvote(options: CreateUpvoteOptions, userId: string): Promise<UpvoteModel> {
    const id = uuid();
    const now = new Date();
    const res = await this.upvoteModel.create({
      id,
      userId,
      itemId: options.itemId,
      itemType: options.itemType,
      createdAt: now,
    });
    return res.toObject();
  }

  /**
   * Deletes a specific upvote based on item, item type, and user ID.
   * @param itemId - The ID of the item.
   * @param itemType - The type of the item.
   * @param userId - The ID of the user who cast the upvote.
   * @returns The deleted UpvoteModel object, or null if not found.
   */
  async deleteUpvoteByItemAndUser(itemId: string, itemType: string, userId: string): Promise<UpvoteModel | null> {
    const res = await this.upvoteModel.findOneAndDelete({ itemId, itemType, userId });
    return res ? res.toObject() : null;
  }

  /**
   * Retrieves a single upvote by its unique ID.
   * @param upvoteId - The unique ID of the upvote.
   * @returns The UpvoteModel object, or null if not found.
   */
  async getUpvoteById(upvoteId: string): Promise<UpvoteModel | null> {
    const res = await this.upvoteModel.findOne({ id: upvoteId });
    return res ? res.toObject() : null;
  }

  /**
   * Retrieves an upvote by item ID, item type, and user ID.
   * Useful for checking if a user has already upvoted a specific item.
   * @param itemId - The ID of the item.
   * @param itemType - The type of the item.
   * @param userId - The ID of the user.
   * @returns The UpvoteModel object, or null if no such upvote exists.
   */
  async getUpvoteByItemAndUser(itemId: string, itemType: string, userId: string): Promise<UpvoteModel | null> {
    const res = await this.upvoteModel.findOne({ itemId, itemType, userId });
    return res ? res.toObject() : null;
  }

  /**
   * Lists upvotes based on provided filtering and pagination options.
   * @param options - Filtering and pagination options.
   * @returns An array of UpvoteModel objects.
   */
  async listUpvotes(options: ListUpvotesOptions): Promise<UpvoteModel[]> {
    const query: any = {};
    if (options.itemId) query.itemId = options.itemId;
    if (options.itemType) query.itemType = options.itemType;
    if (options.userId) query.userId = options.userId;

    const upvotes = await this.upvoteModel
      .find(query)
      .skip(options.offset || 0)
      .limit(options.limit || 0)
      .sort({ createdAt: -1 }); // Sort by creation date, newest first
    
    return upvotes.map((upvote) => upvote.toObject());
  }

  /**
   * Counts the number of upvotes for a specific item.
   * @param itemId - The ID of the item.
   * @param itemType - The type of the item.
   * @returns The total number of upvotes for the specified item.
   */
  async countUpvotes(itemId: string, itemType: string): Promise<number> {
    return this.upvoteModel.countDocuments({ itemId, itemType });
  }
}