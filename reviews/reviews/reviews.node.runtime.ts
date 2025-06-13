import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect, type PeopleNode } from '@infinity/people.people';
import { ProductsAspect, type ProductsNode } from '@infinity/products.products';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { getModelForClass } from '@typegoose/typegoose';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';

import type { ReviewsConfig } from './reviews-config.js';
import { reviewsGqlSchema } from './reviews.graphql.js';
import { ReviewModel, reviewsModelMock } from './reviews.model.js';
import { ReviewsRepository } from './reviews-repository.js';
import { ReviewReportModel, reviewReportModelMock } from './review-report.model.js';
import { ReviewReportRepository } from './review-report-repository.js';
import type {
  Review,
  ReviewReport,
  CreateReviewOptions,
  UpdateReviewOptions,
  DeleteReviewOptions,
  GetReviewOptions,
  ListReviewsOptions,
  ModerateReviewOptions,
  ListReportedReviewsOptions,
  ReportReviewOptions,
} from './reviews-types.js';
import type { ProductDetailsReviewSectionSlot } from './product-details-review-section.js';
import type { ReviewActionSlot } from './review-action.js';
import type { ReviewListItemSlot } from './review-list-item.js';
import type { UserProfileReviewsTabSlot } from './user-profile-reviews-tab.js';

export class ReviewsNode {
  constructor(
    private reviewsConfig: ReviewsConfig,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private products: ProductsNode,
    private people: PeopleNode,
    private reviewsRepository: ReviewsRepository,
    private reviewReportRepository: ReviewReportRepository,
    private productDetailsReviewSectionSlot: ProductDetailsReviewSectionSlot,
    private reviewActionSlot: ReviewActionSlot,
    private reviewListItemSlot: ReviewListItemSlot,
    private userProfileReviewsTabSlot: UserProfileReviewsTabSlot,
  ) {}

  /**
   * Transforms a ReviewModel document into a Review entity.
   * @param model - The ReviewModel document to transform.
   * @returns The Review entity.
   */
  private createReviewFromModel(model: ReviewModel): Review {
    return {
      id: model.id,
      productId: model.productId,
      userId: model.userId,
      rating: model.rating,
      comment: model.comment,
      createdAt: model.createdAt.toISOString(),
      updatedAt: model.updatedAt.toISOString(),
      status: model.status,
    };
  }

  /**
   * Transforms a ReviewReportModel document into a ReviewReport entity.
   * @param model - The ReviewReportModel document to transform.
   * @returns The ReviewReport entity.
   */
  private createReviewReportFromModel(model: ReviewReportModel): ReviewReport {
    return {
      id: model.id,
      reviewId: model.reviewId,
      userId: model.userId,
      reason: model.reason,
      createdAt: model.createdAt.toISOString(),
    };
  }

  /**
   * Creates a new review for a product.
   * @param options - The options for creating the review.
   * @param user - The authenticated user submitting the review.
   * @returns The created Review entity.
   * @throws Unauthorized if the user is not authenticated.
   */
  async createReview(options: CreateReviewOptions, user: User): Promise<Review> {
    if (!user) throw new Unauthorized();
    const review = await this.reviewsRepository.create({ ...options, userId: user.id });
    return this.createReviewFromModel(review);
  }

  /**
   * Updates an existing review.
   * Only the review owner or an admin can update a review.
   * @param options - The options for updating the review.
   * @param user - The authenticated user attempting to update.
   * @returns The updated Review entity.
   * @throws Unauthorized if the user is not authenticated.
   * @throws NotFound if the review does not exist.
   * @throws AccessDenied if the user is not the owner or an admin.
   */
  async updateReview(options: UpdateReviewOptions, user: User): Promise<Review> {
    if (!user) throw new Unauthorized();

    const existingReview = await this.reviewsRepository.findById(options.id);
    if (!existingReview) throw new NotFound(`Review with ID ${options.id} not found.`);

    const isAdmin = user.roles?.includes('admin');
    if (existingReview.userId !== user.id && !isAdmin) {
      throw new AccessDenied('You do not have permission to update this review.');
    }

    const updates: Partial<ReviewModel> = {};
    if (options.rating !== undefined) updates.rating = options.rating;
    if (options.comment !== undefined) updates.comment = options.comment;

    const updatedReview = await this.reviewsRepository.update(options.id, updates);
    if (!updatedReview) throw new NotFound(`Review with ID ${options.id} not found after update attempt.`);

    return this.createReviewFromModel(updatedReview);
  }

  /**
   * Deletes a review.
   * Only the review owner or an admin can delete a review.
   * @param options - The options for deleting the review.
   * @param user - The authenticated user attempting to delete.
   * @returns The deleted Review entity.
   * @throws Unauthorized if the user is not authenticated.
   * @throws NotFound if the review does not exist.
   * @throws AccessDenied if the user is not the owner or an admin.
   */
  async deleteReview(options: DeleteReviewOptions, user: User): Promise<Review> {
    if (!user) throw new Unauthorized();

    const existingReview = await this.reviewsRepository.findById(options.id);
    if (!existingReview) throw new NotFound(`Review with ID ${options.id} not found.`);

    const isAdmin = user.roles?.includes('admin');
    if (existingReview.userId !== user.id && !isAdmin) {
      throw new AccessDenied('You do not have permission to delete this review.');
    }

    const deletedReview = await this.reviewsRepository.delete(options.id);
    if (!deletedReview) throw new NotFound(`Review with ID ${options.id} not found after delete attempt.`);

    return this.createReviewFromModel(deletedReview);
  }

  /**
   * Retrieves a review by ID.
   * @param options - The options for retrieving the review.
   * @param user - The authenticated user (optional, for authorization checks if needed in future).
   * @returns The Review entity.
   * @throws NotFound if the review is not found.
   */
  async getReview(options: GetReviewOptions, user?: User): Promise<Review> {
    const review = await this.reviewsRepository.findById(options.id);
    if (!review) throw new NotFound(`Review with ID ${options.id} not found.`);
    return this.createReviewFromModel(review);
  }

  /**
   * Lists reviews based on provided options.
   * @param options - The options for filtering, limiting, and offsetting reviews.
   * @param user - The authenticated user (optional).
   * @returns An array of Review entities.
   */
  async listReviews(options: ListReviewsOptions, user?: User): Promise<Review[]> {
    const reviews = await this.reviewsRepository.list(options);
    return reviews.map((review) => this.createReviewFromModel(review));
  }

  /**
   * Moderates a review (e.g., approve, reject).
   * Only administrators can moderate reviews.
   * @param options - The options for moderating the review.
   * @param user - The authenticated user attempting to moderate.
   * @returns The moderated Review entity.
   * @throws Unauthorized if the user is not authenticated.
   * @throws AccessDenied if the user is not an admin.
   * @throws NotFound if the review does not exist.
   */
  async moderateReview(options: ModerateReviewOptions, user: User): Promise<Review> {
    if (!user) throw new Unauthorized();
    if (!user.roles?.includes('admin')) {
      throw new AccessDenied('You do not have permission to moderate reviews.');
    }

    const updatedReview = await this.reviewsRepository.update(options.id, { status: options.status });
    if (!updatedReview) throw new NotFound(`Review with ID ${options.id} not found.`);

    return this.createReviewFromModel(updatedReview);
  }

  /**
   * Lists reported reviews based on provided options.
   * Only administrators or moderators can view reported reviews.
   * @param options - The options for listing reported reviews.
   * @param user - The authenticated user.
   * @returns An array of ReviewReport entities.
   * @throws Unauthorized if the user is not authenticated.
   * @throws AccessDenied if the user is not an admin or moderator.
   */
  async listReportedReviews(options: ListReportedReviewsOptions, user: User): Promise<ReviewReport[]> {
    if (!user) throw new Unauthorized();
    const isModeratorOrAdmin = user.roles?.includes('admin') || user.roles?.includes('moderator');
    if (!isModeratorOrAdmin) {
      throw new AccessDenied('You do not have permission to view reported reviews.');
    }
    const reports = await this.reviewReportRepository.list(options);
    return reports.map((report) => this.createReviewReportFromModel(report));
  }

  /**
   * Reports a review.
   * @param options - The options for reporting the review.
   * @param user - The authenticated user submitting the report.
   * @returns The created ReviewReport entity.
   * @throws Unauthorized if the user is not authenticated.
   */
  async reportReview(options: ReportReviewOptions, user: User): Promise<ReviewReport> {
    if (!user) throw new Unauthorized();
    const report = await this.reviewReportRepository.create({ ...options, userId: user.id });
    return this.createReviewReportFromModel(report);
  }

  static dependencies = [
    SymphonyPlatformAspect,
    ProductHuntPlatformAspect,
    ProductsAspect,
    PeopleAspect,
  ];

  static async provider(
    [symphonyPlatform, productHuntPlatform, products, people]: [
      SymphonyPlatformNode,
      ProductHuntPlatformNode,
      ProductsNode,
      PeopleNode,
    ],
    config: ReviewsConfig,
    [productDetailsReviewSectionSlot, reviewActionSlot, reviewListItemSlot, userProfileReviewsTabSlot]: [
      ProductDetailsReviewSectionSlot,
      ReviewActionSlot,
      ReviewListItemSlot,
      UserProfileReviewsTabSlot,
    ]
  ) {
    const reviewModel = getModelForClass(ReviewModel);
    const reviewReportModel = getModelForClass(ReviewReportModel);
    const reviewsRepository = new ReviewsRepository(reviewModel);
    const reviewReportRepository = new ReviewReportRepository(reviewReportModel);

    const reviews = new ReviewsNode(
      config,
      symphonyPlatform,
      productHuntPlatform,
      products,
      people,
      reviewsRepository,
      reviewReportRepository,
      productDetailsReviewSectionSlot,
      reviewActionSlot,
      reviewListItemSlot,
      userProfileReviewsTabSlot
    );

    const gqlSchema = reviewsGqlSchema(reviews);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      },
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingReviews = await reviewModel.find().limit(1);
      if (existingReviews.length === 0) {
        await reviewModel.insertMany(reviewsModelMock);
      }

      const existingReviewReports = await reviewReportModel.find().limit(1);
      if (existingReviewReports.length === 0) {
        await reviewReportModel.insertMany(reviewReportModelMock);
      }
    });

    // ProductHuntPlatformNode does not have registerRoute.
    // Frontend routes are typically registered in the browser runtime.
    // If these were meant to be backend routes or some other platform-specific registration,
    // the ProductHuntPlatformNode API would need to support it.

    // Example of integrating with products aspect (slots are for browser, but demonstrating registration)
    // The prompt implied only node.runtime.ts so I'm commenting out browser-specific slot registrations
    // products.registerProductAction([
    //   {
    //     name: 'write-review',
    //     component: () => <p>Write Review Action</p>,
    //   },
    // ]);

    // products.registerProductDetailsTab([
    //   {
    //     name: 'product-reviews',
    //     label: 'Reviews',
    //     component: () => <p>Product Reviews Tab</p>,
    //   },
    // ]);

    // people.registerUserProfileTab([
    //   {
    //     name: 'user-reviews',
    //     label: 'My Reviews',
    //     component: () => <p>User Reviews Tab</p>,
    //   },
    // ]);

    return reviews;
  }
}

export default ReviewsNode;