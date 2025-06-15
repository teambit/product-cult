import { prop, index } from '@typegoose/typegoose';

/**
 * Represents the Upvote data model in the database.
 * This model stores information about a user's upvote on a specific item.
 */
@index({ itemId: 1, itemType: 1, userId: 1 }, { unique: true }) // Ensures a user can upvote a specific item only once
@index({ itemId: 1, itemType: 1 }) // For efficient counting and listing by item
@index({ userId: 1 }) // For efficient listing by user
export class UpvoteModel {
  /**
   * The unique identifier for the upvote.
   */
  @prop({ required: true, unique: true })
  public id!: string;

  /**
   * The ID of the user who cast the upvote.
   */
  @prop({ required: true })
  public userId!: string;

  /**
   * The ID of the item that was upvoted (e.g., product ID, launch ID).
   */
  @prop({ required: true })
  public itemId!: string;

  /**
   * The type of the item that was upvoted (e.g., "product", "launch").
   */
  @prop({ required: true })
  public itemType!: string;

  /**
   * The timestamp when the upvote was created.
   */
  @prop({ required: true })
  public createdAt!: Date;
}

/**
 * Mock data for UpvoteModel, used for seeding the database.
 */
export const upvoteModelMock = [
  {
    id: 'upvote-mock-1',
    userId: 'user-id-1',
    itemId: 'product-item-id-1',
    itemType: 'product',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: 'upvote-mock-2',
    userId: 'user-id-2',
    itemId: 'product-item-id-1',
    itemType: 'product',
    createdAt: new Date('2023-10-26T10:05:00Z'),
  },
  {
    id: 'upvote-mock-3',
    userId: 'user-id-1',
    itemId: 'launch-item-id-A',
    itemType: 'launch',
    createdAt: new Date('2023-10-27T11:00:00Z'),
  },
  {
    id: 'upvote-mock-4',
    userId: 'user-id-3',
    itemId: 'product-item-id-2',
    itemType: 'product',
    createdAt: new Date('2023-10-27T11:15:00Z'),
  },
  {
    id: 'upvote-mock-5',
    userId: 'user-id-2',
    itemId: 'launch-item-id-B',
    itemType: 'launch',
    createdAt: new Date('2023-10-28T12:30:00Z'),
  },
];
