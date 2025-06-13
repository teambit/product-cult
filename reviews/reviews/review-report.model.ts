import { prop, getModelForClass, modelOptions, index } from '@typegoose/typegoose';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a review report model for persistence.
 */
@modelOptions({
  schemaOptions: {
    collection: 'reviewreports',
    timestamps: true, // Adds createdAt and updatedAt
  },
})
@index({ reviewId: 1 })
@index({ userId: 1 })
export class ReviewReportModel {
  /**
   * Unique identifier for the review report (UUID).
   */
  @prop({ unique: true, required: true, type: String, default: () => uuidv4() })
  public id: string;

  /**
   * The ID of the review being reported.
   */
  @prop({ required: true, type: String })
  public reviewId: string;

  /**
   * The ID of the user who submitted the report.
   */
  @prop({ required: true, type: String })
  public userId: string;

  /**
   * The reason for reporting the review.
   */
  @prop({ required: true, type: String })
  public reason: string;

  // Timestamps are automatically added by Typegoose due to `timestamps: true`
  // Declaring them here helps with TypeScript type checking.
  public createdAt!: Date;
  
  public updatedAt!: Date;
}

export const reviewReportModelMock = [
  {
    id: 'f01c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    reviewId: 'b1cdef00-9c0b-4ef8-bb6d-6bb9bd380a12',
    userId: 'userAdmin',
    reason: 'Spam/Irrelevant content',
    createdAt: new Date(),
  },
  {
    id: 'g6h7i8j9-0k1l-2m3n-4o5p-6q7r8s9t0u1v',
    reviewId: 'd3ef2222-9c0b-4ef8-bb6d-6bb9bd380a14',
    userId: 'userModerator',
    reason: 'Offensive language',
    createdAt: new Date(),
  },
];
