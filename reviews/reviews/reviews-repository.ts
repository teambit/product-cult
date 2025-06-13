import { ReturnModelType } from '@typegoose/typegoose';
import { ReviewModel } from './reviews.model.js';
import { CreateReviewOptions, UpdateReviewOptions, ListReviewsOptions } from './reviews-types.js';

/**
 * Repository for managing Review data in the database.
 */
export class ReviewsRepository {
  constructor(private reviewModel: ReturnModelType<typeof ReviewModel>) {}

  /**
   * Creates a new review in the database.
   * @param options - Options for creating the review.
   * @returns The created ReviewModel document.
   */
  async create(options: CreateReviewOptions & { userId: string }): Promise<ReviewModel> {
    const review = await this.reviewModel.create(options);
    return review.toObject();
  }

  /**
   * Finds a review by its ID.
   * @param id - The ID of the review to find.
   * @returns The ReviewModel document if found, otherwise null.
   */
  async findById(id: string): Promise<ReviewModel | null> {
    const review = await this.reviewModel.findOne({ id });
    return review ? review.toObject() : null;
  }

  /**
   * Updates an existing review by its ID.
   * @param id - The ID of the review to update.
   * @param updates - The fields to update.
   * @returns The updated ReviewModel document, or null if not found.
   */
  async update(id: string, updates: Partial<ReviewModel>): Promise<ReviewModel | null> {
    const review = await this.reviewModel.findOneAndUpdate({ id }, { $set: updates }, { new: true });
    return review ? review.toObject() : null;
  }

  /**
   * Deletes a review by its ID.
   * @param id - The ID of the review to delete.
   * @returns The deleted ReviewModel document, or null if not found.
   */
  async delete(id: string): Promise<ReviewModel | null> {
    const review = await this.reviewModel.findOneAndDelete({ id });
    return review ? review.toObject() : null;
  }

  /**
   * Lists reviews based on provided criteria.
   * @param options - Options for filtering, limiting, and offsetting reviews.
   * @returns An array of ReviewModel documents.
   */
  async list(options: ListReviewsOptions): Promise<ReviewModel[]> {
    const query: any = {};
    if (options.productId) query.productId = options.productId;
    if (options.userId) query.userId = options.userId;
    if (options.status) query.status = options.status;

    const reviews = await this.reviewModel
      .find(query)
      .limit(options.limit || 0)
      .skip(options.offset || 0)
      .sort({ createdAt: -1 });
    return reviews.map((review) => review.toObject());
  }
}