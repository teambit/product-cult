import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { getModelForClass } from '@typegoose/typegoose';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect, type PeopleNode } from '@infinity/people.people';
import { ProductsAspect, type ProductsNode } from '@infinity/products.products';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { Launch } from '@infinity/launches.entities.launch';

import type { LaunchesConfig } from './launches-config.js';
import { launchesGqlSchema } from './launches.graphql.js';
import { LaunchRepository } from './launch-repository.js';
import { LaunchModel, mockLaunchModels } from './launch.model.js';
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

export class LaunchesNode {
  constructor(
    private launchesConfig: LaunchesConfig,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private products: ProductsNode,
    private people: PeopleNode,
    private launchRepository: LaunchRepository
  ) {}

  /**
   * Creates a new product launch.
   * @param options - Options for creating the launch.
   * @param user - The authenticated user.
   * @returns The created Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not authorized to create launches.
   */
  async createLaunch(options: CreateLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    if (!user.roles?.includes('admin') && !user.roles?.includes('submitter')) {
      throw new AccessDenied('Only authorized users can create launches.');
    }
    const createdLaunch = await this.launchRepository.createLaunch(options, user.id);
    return Launch.from(createdLaunch);
  }

  /**
   * Retrieves a product launch by ID.
   * @param options - Options for getting the launch.
   * @param user - The authenticated user (optional).
   * @returns The retrieved Launch entity.
   * @throws NotFound if the launch is not found.
   */
  async getLaunch(options: GetLaunchOptions, user?: User): Promise<Launch> {
    const launch = await this.launchRepository.getLaunch(options);
    return Launch.from(launch);
  }

  /**
   * Updates an existing product launch.
   * @param options - Options for updating the launch.
   * @param user - The authenticated user.
   * @returns The updated Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin or the launch owner.
   * @throws NotFound if the launch does not exist.
   */
  async updateLaunch(options: UpdateLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    const existingLaunch = await this.launchRepository.getLaunch({ id: options.id });

    if (!user.roles?.includes('admin') && existingLaunch.submittedBy !== user.id) {
      throw new AccessDenied('Only an admin or the launch owner can update this launch.');
    }
    const updatedLaunch = await this.launchRepository.updateLaunch(options);
    return Launch.from(updatedLaunch);
  }

  /**
   * Deletes a product launch.
   * @param options - Options for deleting the launch.
   * @param user - The authenticated user.
   * @returns The deleted Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin or the launch owner.
   * @throws NotFound if the launch does not exist.
   */
  async deleteLaunch(options: DeleteLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    const existingLaunch = await this.launchRepository.getLaunch({ id: options.id });

    if (!user.roles?.includes('admin') && existingLaunch.submittedBy !== user.id) {
      throw new AccessDenied('Only an admin or the launch owner can delete this launch.');
    }
    const deletedLaunch = await this.launchRepository.deleteLaunch(options);
    return Launch.from(deletedLaunch);
  }

  /**
   * Lists product launches based on provided options.
   * @param options - Options for listing launches.
   * @param user - The authenticated user (optional).
   * @returns An array of Launch entities.
   */
  async listLaunches(options?: ListLaunchesOptions, user?: User): Promise<Launch[]> {
    const launches = await this.launchRepository.listLaunches(options);
    return launches.map((launch) => Launch.from(launch));
  }

  /**
   * Submits a product launch for review.
   * @param options - Options for submitting the launch.
   * @param user - The authenticated user.
   * @returns The updated Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not the launch owner.
   * @throws NotFound if the launch does not exist.
   */
  async submitLaunch(options: SubmitLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    const existingLaunch = await this.launchRepository.getLaunch({ id: options.launchId });

    if (existingLaunch.submittedBy !== user.id) {
      throw new AccessDenied('Only the launch owner can submit this launch.');
    }
    const submittedLaunch = await this.launchRepository.submitLaunch(options);
    return Launch.from(submittedLaunch);
  }

  /**
   * Approves a submitted product launch.
   * @param options - Options for approving the launch.
   * @param user - The authenticated user.
   * @returns The updated Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   * @throws NotFound if the launch does not exist.
   */
  async approveLaunch(options: ApproveLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    if (!user.roles?.includes('admin')) {
      throw new AccessDenied('Only an admin can approve launches.');
    }
    const approvedLaunch = await this.launchRepository.approveLaunch(options);
    return Launch.from(approvedLaunch);
  }

  /**
   * Rejects a submitted product launch.
   * @param options - Options for rejecting the launch.
   * @param user - The authenticated user.
   * @returns The updated Launch entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   * @throws NotFound if the launch does not exist.
   */
  async rejectLaunch(options: RejectLaunchOptions, user: User): Promise<Launch> {
    if (!user) throw new Unauthorized();
    if (!user.roles?.includes('admin')) {
      throw new AccessDenied('Only an admin can reject launches.');
    }
    const rejectedLaunch = await this.launchRepository.rejectLaunch(options);
    return Launch.from(rejectedLaunch);
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, ProductsAspect, PeopleAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, products, people]: [SymphonyPlatformNode, ProductHuntPlatformNode, ProductsNode, PeopleNode],
    config: LaunchesConfig,
  ) {
    const launchModel = getModelForClass(LaunchModel);
    const launchRepository = new LaunchRepository(launchModel);
    const launches = new LaunchesNode(config, symphonyPlatform, productHuntPlatform, products, people, launchRepository);

    const gqlSchema = launchesGqlSchema(launches);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingDocs = await launchModel.find().limit(1);
      const hasDocs = Boolean(existingDocs.length);
      if (!hasDocs) {
        await launchModel.insertMany(mockLaunchModels);
      }
    });

    // Integrate with ProductHuntPlatform by adding a route
    // Note: Since this is Node.js runtime, we register a backend route,
    // actual UI routes are typically registered in browser runtime.
    // Assuming 'registerRoute' on ProductHuntPlatformNode refers to backend routes
    // or this is a placeholder for a frontend route definition.
    // For a backend Node.js aspect, routes are usually handled via GQL or dedicated REST.
    // If it expects a UI component, this should be in browser runtime.
    // As per instruction, `ProductHuntPlatformBrowser` has `registerRoute`, `ProductHuntPlatformNode` does not.
    // So, no `registerRoute` for the Node runtime.

    return launches;
  }
}

export default LaunchesNode;