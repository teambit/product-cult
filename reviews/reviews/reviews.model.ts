import { prop, getModelForClass, modelOptions, index } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a review model for persistence.
 */
@modelOptions({
  schemaOptions: {
    collection: 'reviews',
    timestamps: true, // Adds createdAt and updatedAt
  },
})
@index({ productId: 1 })
@index({ userId: 1 })
@index({ status: 1 })
export class ReviewModel {
  /**
   * Unique identifier for the review (UUID).
   */
  @prop({ unique: true, required: true, type: String, default: () => uuidv4() })
  public id: string;

  /**
   * The ID of the product this review is for.
   */
  @prop({ required: true, type: String })
  public productId: string;

  /**
   * The ID of the user who submitted the review.
   */
  @prop({ required: true, type: String })
  public userId: string;

  /**
   * The rating given in the review (e.g., 1 to 5 stars).
   */
  @prop({ required: true, type: Number })
  public rating: number;

  /**
   * The comment or text content of the review.
   */
  @prop({ required: true, type: String })
  public comment: string;

  /**
   * The status of the review (e.g., 'pending', 'approved', 'rejected').
   */
  @prop({ required: true, type: String, default: 'pending' })
  public status: string;

  // Timestamps are automatically added by Typegoose due to `timestamps: true`
  // Declaring them here helps with TypeScript type checking.
  public createdAt!: Date;
  
  public updatedAt!: Date;
}

export const reviewsModelMock = [
  {
    id: 'a0eebc99-9c0b-4ef228-bb444d-680a11',
    productId: '1',
    userId: 'userABC',
    rating: 4.5,
    comment: 'Great product, really enjoyed using it!',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'a0eebc99-9c0b-4ef45-b46d-0a11',
    productId: '5',
    userId: 'userABC',
    rating: 4.5,
    comment: 'To the moon!',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    productId: '5',
    userId: 'userABC',
    rating: 4.5,
    comment: 'Using this to support over 1M users. Highly recommended!',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'b1cdef00-9c0b-4ef8-bb6d-6bb9bd380a12',
    productId: '2',
    userId: '4',
    rating: 2.0,
    comment: 'Disappointing quality, expected more.',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'c2def111-9c0b-4ef8-bb6d-6bb9bd380a13',
    productId: '3',
    userId: '5',
    rating: 5.0,
    comment: 'Absolutely love this! Highly recommend.',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd3ef2222-9c0b-4ef8-bb6d-6bb9bd380a14',
    productId: '1',
    userId: 'userXYZ',
    rating: 3.5,
    comment: 'It\'s okay, does what it says but nothing special.',
    status: 'approved',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
