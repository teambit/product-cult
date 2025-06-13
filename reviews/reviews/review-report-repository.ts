import { ReturnModelType } from '@typegoose/typegoose';
import { ReviewReportModel } from './review-report.model.js';
import { ReportReviewOptions, ListReportedReviewsOptions } from './reviews-types.js';

/**
 * Repository for managing ReviewReport data in the database.
 */
export class ReviewReportRepository {
  constructor(private reviewReportModel: ReturnModelType<typeof ReviewReportModel>) {}

  /**
   * Creates a new review report in the database.
   * @param options - Options for creating the review report.
   * @returns The created ReviewReportModel document.
   */
  async create(options: ReportReviewOptions & { userId: string }): Promise<ReviewReportModel> {
    const report = await this.reviewReportModel.create(options);
    return report.toObject();
  }

  /**
   * Finds a review report by its ID.
   * @param id - The ID of the review report to find.
   * @returns The ReviewReportModel document if found, otherwise null.
   */
  async findById(id: string): Promise<ReviewReportModel | null> {
    const report = await this.reviewReportModel.findOne({ id });
    return report ? report.toObject() : null;
  }

  /**
   * Lists review reports based on provided criteria.
   * @param options - Options for limiting and offsetting review reports.
   * @returns An array of ReviewReportModel documents.
   */
  async list(options: ListReportedReviewsOptions): Promise<ReviewReportModel[]> {
    const reports = await this.reviewReportModel
      .find({})
      .limit(options.limit || 0)
      .skip(options.offset || 0)
      .sort({ createdAt: -1 });
    return reports.map((report) => report.toObject());
  }
}