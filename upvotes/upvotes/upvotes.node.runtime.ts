import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { getModelForClass } from '@typegoose/typegoose';
import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { Upvote } from '@infinity/upvotes.entities.upvote';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import type { UpvotesConfig } from './upvotes-config.js';
import { upvotesGqlSchema } from './upvotes.graphql.js';
import { UpvoteModel, upvoteModelMock } from './upvote.model.js';
import { UpvoteRepository } from './upvote-repository.js';
import {
  type CreateUpvoteOptions,
  type DeleteUpvoteOptions,
  type GetUpvoteOptions,
  type ListUpvotesOptions,
  type GetUpvoteCountOptions,
  type GetUserUpvoteStatusOptions,
} from './upvote-options.js';

export class UpvotesNode {
  constructor(
    private upvotesConfig: UpvotesConfig,
    private upvoteRepository: UpvoteRepository,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
  ) {}

  /**
   * Converts an UpvoteModel document to an Upvote entity.
   * @param model The UpvoteModel document to convert.
   * @returns An Upvote entity.
   */
  private createUpvoteFromModel(model: UpvoteModel): Upvote {
    return Upvote.from({
      id: model.id,
      userId: model.userId,
      itemId: model.itemId,
      itemType: model.itemType,
      createdAt: model.createdAt.toISOString(),
    });
  }

  /**
   * Creates a new upvote for an item.
   * @param options - The options for creating the upvote.
   * @param user - The authenticated user creating the upvote.
   * @returns The created Upvote entity.
   * @throws Unauthorized if the user is not authenticated.
   */
  async createUpvote(options: CreateUpvoteOptions, user: User): Promise<Upvote> {
    if (!user) throw new Unauthorized('Authentication required to create an upvote.');
    const upvote = await this.upvoteRepository.createUpvote(options, user.id);
    return this.createUpvoteFromModel(upvote);
  }

  /**
   * Deletes an existing upvote for an item by the authenticated user.
   * @param options - The options specifying the item for which to delete the upvote.
   * @param user - The authenticated user deleting the upvote.
   * @returns The deleted Upvote entity.
   * @throws Unauthorized if the user is not authenticated.
   * @throws NotFound if the user has not upvoted the specified item.
   */
  async deleteUpvote(options: DeleteUpvoteOptions, user: User): Promise<Upvote> {
    if (!user) throw new Unauthorized('Authentication required to delete an upvote.');

    const deletedUpvote = await this.upvoteRepository.deleteUpvoteByItemAndUser(
      options.itemId,
      options.itemType,
      user.id
    );

    if (!deletedUpvote) {
      throw new NotFound(`Upvote for item ${options.itemId} of type ${options.itemType} by user ${user.id} not found.`);
    }

    return this.createUpvoteFromModel(deletedUpvote);
  }

  /**
   * Retrieves a specific upvote by its ID.
   * @param options - The options to retrieve the upvote by ID.
   * @param user - Optional: The authenticated user making the request.
   * @returns The Upvote entity or null if not found.
   */
  async getUpvote(options: GetUpvoteOptions, user?: User): Promise<Upvote | null> {
    const upvote = await this.upvoteRepository.getUpvoteById(options.id);
    return upvote ? this.createUpvoteFromModel(upvote) : null;
  }

  /**
   * Lists upvotes based on provided options.
   * @param options - Filtering and pagination options.
   * @param user - Optional: The authenticated user making the request.
   * @returns An array of Upvote entities.
   */
  async listUpvotes(options: ListUpvotesOptions, user?: User): Promise<Upvote[]> {
    const upvotes = await this.upvoteRepository.listUpvotes(options);
    return upvotes.map((upvote) => this.createUpvoteFromModel(upvote));
  }

  /**
   * Retrieves the number of upvotes for an item.
   * @param options - Options specifying the item for which to get the upvote count.
   * @returns The count of upvotes.
   */
  async getUpvoteCount(options: GetUpvoteCountOptions): Promise<number> {
    return this.upvoteRepository.countUpvotes(options.itemId, options.itemType);
  }

  /**
   * Checks if a user has upvoted an item.
   * @param options - Options specifying the item to check.
   * @param user - Optional: The authenticated user.
   * @returns True if the user has upvoted the item, false otherwise. Returns false if user is not authenticated.
   */
  async getUserUpvoteStatus(options: GetUserUpvoteStatusOptions, user?: User): Promise<boolean> {
    if (!user) return false;
    const upvote = await this.upvoteRepository.getUpvoteByItemAndUser(options.itemId, options.itemType, user.id);
    return !!upvote;
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform]: [SymphonyPlatformNode, ProductHuntPlatformNode],
    config: UpvotesConfig,
  ) {
    const upvoteModel = getModelForClass(UpvoteModel);
    const upvoteRepository = new UpvoteRepository(upvoteModel);

    const upvotes = new UpvotesNode(config, upvoteRepository, symphonyPlatform, productHuntPlatform);

    const gqlSchema = upvotesGqlSchema(upvotes);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingDocs = await upvoteModel.find().limit(1);
      const hasDocs = Boolean(existingDocs.length);
      if (hasDocs) return undefined;
      await upvoteModel.insertMany(upvoteModelMock);
      return undefined;
    });

    return upvotes;
  }
}

export default UpvotesNode;