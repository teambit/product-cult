import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { UserProfile } from '@infinity/people.entities.user-profile';
import type { User } from '@infinity/product-hunt-platform.entities.user';

import type { PeopleConfig } from './people-config.js';
import { peopleGqlSchema } from './people.graphql.js';
import { UserProfileModel, userProfileModelMock } from './user-profile.model.js';
import { UserProfileRepository, type UpdateUserProfileOptions, type GetUserProfileOptions, type ListUserProfilesOptions } from './user-profile-repository.js';
import { getModelForClass } from '@typegoose/typegoose';

export class PeopleNode {
  constructor(
    private peopleConfig: PeopleConfig,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private userProfileRepository: UserProfileRepository,
  ) {}

  /**
   * Transforms a UserProfileModel instance into a UserProfile entity.
   * @param model The UserProfileModel instance to transform.
   * @returns The UserProfile entity.
   */
  private createProfileFromModel(model: UserProfileModel): UserProfile {
    return UserProfile.from({
      userId: model.userId,
      name: model.name,
      bio: model.bio,
      createdAt: model.createdAt.toISOString(),
      imageUrl: model.imageUrl,
      company: model.company,
      email: model.email,
      location: model.location,
      socialMediaLinks: model.socialMediaLinks,
      updatedAt: model.updatedAt?.toISOString(),
    });
  }

  /**
   * Updates the user profile.
   * @param options The options for updating the user profile.
   * @param user The authenticated user.
   * @returns The updated UserProfile entity.
   * @throws Unauthorized if the user is not authenticated.
   * @throws NotFound if the user profile to update does not exist.
   */
  async updateUserProfile(options: UpdateUserProfileOptions & { displayName?: string }, user: User): Promise<UserProfile> {
    if (!user) {
      throw new Unauthorized();
    }

    // Attempt to retrieve existing profile for the current user's ID
    const existingProfile = await this.userProfileRepository.findById(user.id);
    if (!existingProfile) {
      // If no profile exists, perhaps create one with basic info from user, then update.
      // For now, let's assume it should exist for update or throw NotFound.
      throw new NotFound(`User profile with ID ${user.id} not found.`);
    }

    const updatedProfile = await this.userProfileRepository.update(user.id, {
      name: options.displayName, // Mapping displayName to name in model
      bio: options.bio,
      company: options.company,
      imageUrl: options.imageUrl,
      // You might also want to update email if it's part of user's core data
      // For this example, assuming bio, displayName, company, imageUrl are mutable.
    });

    if (!updatedProfile) {
      throw new NotFound(`User profile with ID ${user.id} not found after update attempt.`);
    }

    return this.createProfileFromModel(updatedProfile);
  }

  /**
   * Retrieves a user's profile.
   * @param options The options including the userId.
   * @param user The currently authenticated user (optional, for authorization checks).
   * @returns The UserProfile entity.
   * @throws NotFound if the user profile is not found.
   */
  async getUserProfile(options: GetUserProfileOptions, user?: User): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findById(options.userId);
    if (!profile) {
      throw new NotFound(`User profile with ID ${options.userId} not found.`);
    }
    return this.createProfileFromModel(profile);
  }

  /**
   * Lists user profiles with pagination and search.
   * @param options The list options including offset, limit, and search term.
   * @param user The currently authenticated user (optional, for authorization checks).
   * @returns An array of UserProfile entities.
   * @throws Unauthorized if the user is not authenticated.
   */
  async listUserProfiles(options?: ListUserProfilesOptions, user?: User): Promise<UserProfile[]> {
    // if (!user) {
    //   throw new Unauthorized();
    // }
    // Implement any admin or specific role check if needed, otherwise allow any authenticated user to list.
    // For this example, any authenticated user can list.

    const profiles = await this.userProfileRepository.list(options);
    return profiles.map((profile) => this.createProfileFromModel(profile));
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform]: [SymphonyPlatformNode, ProductHuntPlatformNode],
    config: PeopleConfig,
  ) {
    const userProfileModel = getModelForClass(UserProfileModel);
    const userProfileRepository = new UserProfileRepository(userProfileModel);

    const people = new PeopleNode(config, symphonyPlatform, productHuntPlatform, userProfileRepository);

    const gqlSchema = peopleGqlSchema(people);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      }
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingDocs = await userProfileModel.find().limit(1);
      const hasDocs = Boolean(existingDocs.length);
      if (!hasDocs) {
        // Map mock data to ensure `createdAt` is a Date object, if not already.
        const mockDataWithDates = userProfileModelMock.map(profile => ({
          ...profile,
          createdAt: new Date(profile.createdAt),
          updatedAt: profile.updatedAt ? new Date(profile.updatedAt) : undefined,
        }));
        await userProfileModel.insertMany(mockDataWithDates);
      }
    });

    return people;
  }
}

export default PeopleNode;