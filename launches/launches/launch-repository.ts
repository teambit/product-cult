import { ReturnModelType } from '@typegoose/typegoose';
import crypto from 'crypto';
import { LaunchModel } from './launch.model.js';
import {
  CreateLaunchOptions,
  GetLaunchOptions,
  UpdateLaunchOptions,
  DeleteLaunchOptions,
  ListLaunchesOptions,
  SubmitLaunchOptions,
  ApproveLaunchOptions,
  RejectLaunchOptions,
} from './launches-types.js';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import { PlainLaunch } from '@infinity/launches.entities.launch';

export class LaunchRepository {
  constructor(private launchModel: ReturnModelType<typeof LaunchModel>) {}

  private toPlain(doc: any): PlainLaunch {
    const plain = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };
    
    // Ensure id is present (it's a real prop, so should be fine)
    // plain.id = doc.id; 

    if (plain.createdAt && plain.createdAt instanceof Date) {
      plain.createdAt = plain.createdAt.toISOString();
    } else if (typeof plain.createdAt === 'number') { // Mongodb Timestamps can be numbers
      plain.createdAt = new Date(plain.createdAt).toISOString();
    }

    if (plain.updatedAt && plain.updatedAt instanceof Date) {
      plain.updatedAt = plain.updatedAt.toISOString();
    } else if (typeof plain.updatedAt === 'number') {
      plain.updatedAt = new Date(plain.updatedAt).toISOString();
    }
    
    // Remove Mongoose specific fields if they exist and are not part of PlainLaunch
    delete plain._id;
    delete plain.__v;

    return plain as PlainLaunch;
  }

  /**
   * Creates a new product launch in the database.
   * @param options - Options for creating the launch.
   * @param submittedBy - The ID of the user submitting the launch.
   * @returns The created PlainLaunch object.
   */
  async createLaunch(options: CreateLaunchOptions, submittedBy: string): Promise<PlainLaunch> {
    const id = crypto.randomUUID();
    const newLaunchDoc = await this.launchModel.create({
      id,
      productId: options.productId,
      name: options.name,
      tagline: options.tagline,
      description: options.description,
      launchDate: options.launchDate,
      status: 'pending', // Default status for new launches
      submittedBy,
    });
    return this.toPlain(newLaunchDoc);
  }

  /**
   * Retrieves a product launch by its ID.
   * @param options - Options containing the launch ID.
   * @returns The retrieved PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async getLaunch(options: GetLaunchOptions): Promise<PlainLaunch> {
    const launchDoc = await this.launchModel.findOne({ id: options.id });
    if (!launchDoc) {
      throw new NotFound(`Launch with ID ${options.id} not found.`);
    }
    return this.toPlain(launchDoc);
  }

  /**
   * Updates an existing product launch.
   * @param options - Options for updating the launch.
   * @returns The updated PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async updateLaunch(options: UpdateLaunchOptions): Promise<PlainLaunch> {
    const updatePayload: Partial<LaunchModel> = { ...options };
    // id is used for query, not in $set, remove it from payload
    const { id, ...payloadToSet } = options;


    const updatedLaunchDoc = await this.launchModel.findOneAndUpdate(
      { id: options.id },
      { $set: payloadToSet },
      { new: true }
    );
    if (!updatedLaunchDoc) {
      throw new NotFound(`Launch with ID ${options.id} not found for update.`);
    }
    return this.toPlain(updatedLaunchDoc);
  }

  /**
   * Deletes a product launch by its ID.
   * @param options - Options containing the launch ID.
   * @returns The deleted PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async deleteLaunch(options: DeleteLaunchOptions): Promise<PlainLaunch> {
    const deletedLaunchDoc = await this.launchModel.findOneAndDelete({ id: options.id });
    if (!deletedLaunchDoc) {
      throw new NotFound(`Launch with ID ${options.id} not found for deletion.`);
    }
    return this.toPlain(deletedLaunchDoc);
  }

  /**
   * Lists product launches based on provided filters and pagination.
   * @param options - Options for listing launches (limit, offset, filters).
   * @returns An array of PlainLaunch objects.
   */
  async listLaunches(options?: ListLaunchesOptions): Promise<PlainLaunch[]> {
    const filter: any = {};
    if (options?.productId) {
      filter.productId = options.productId;
    }
    if (options?.status) {
      filter.status = options.status;
    }
    if (options?.launchDateStart || options?.launchDateEnd) {
      filter.launchDate = {};
      if (options.launchDateStart) {
        filter.launchDate.$gte = options.launchDateStart;
      }
      if (options.launchDateEnd) {
        filter.launchDate.$lte = options.launchDateEnd;
      }
    }

    const query = this.launchModel.find(filter).sort({ launchDate: -1 });

    if (options?.offset) {
      query.skip(options.offset);
    }
    if (options?.limit) {
      query.limit(options.limit);
    }

    const launchDocs = await query.exec();
    return launchDocs.map((doc) => this.toPlain(doc));
  }

  /**
   * Submits a product launch for review. Changes its status to 'submitted'.
   * @param options - Options containing the launch ID.
   * @returns The updated PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async submitLaunch(options: SubmitLaunchOptions): Promise<PlainLaunch> {
    return this.updateLaunch({ id: options.launchId, status: 'submitted' });
  }

  /**
   * Approves a submitted product launch. Changes its status to 'approved'.
   * @param options - Options containing the launch ID.
   * @returns The updated PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async approveLaunch(options: ApproveLaunchOptions): Promise<PlainLaunch> {
    return this.updateLaunch({ id: options.launchId, status: 'approved' });
  }

  /**
   * Rejects a submitted product launch. Changes its status to 'rejected'.
   * @param options - Options containing the launch ID.
   * @returns The updated PlainLaunch object.
   * @throws NotFound if the launch is not found.
   */
  async rejectLaunch(options: RejectLaunchOptions): Promise<PlainLaunch> {
    return this.updateLaunch({ id: options.launchId, status: 'rejected' });
  }
}