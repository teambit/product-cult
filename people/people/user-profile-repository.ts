import type { ReturnModelType } from '@typegoose/typegoose';
import { UserProfileModel } from './user-profile.model.js';

export type CreateUserProfileOptions = {
  userId: string;
  name: string;
  bio: string;
  imageUrl?: string;
  company?: string;
  email?: string;
  location?: string;
  socialMediaLinks?: Record<string, string>;
};

export type UpdateUserProfileOptions = {
  name?: string;
  bio?: string;
  company?: string;
  imageUrl?: string;
  email?: string;
  location?: string;
  socialMediaLinks?: Record<string, string>;
};

export type GetUserProfileOptions = {
  userId: string;
};

export type ListUserProfilesOptions = {
  offset?: number;
  limit?: number;
  search?: string;
};

export class UserProfileRepository {
  constructor(private userProfileModel: ReturnModelType<typeof UserProfileModel>) {}

  /**
   * Creates a new user profile.
   */
  async create(options: CreateUserProfileOptions): Promise<UserProfileModel> {
    const newProfile = await this.userProfileModel.create({
      ...options,
      createdAt: new Date(),
    });
    return newProfile.toObject();
  }

  /**
   * Finds a user profile by userId.
   */
  async findById(userId: string): Promise<UserProfileModel | null> {
    const profile = await this.userProfileModel.findOne({ userId });
    return profile ? profile.toObject() : null;
  }

  /**
   * Updates an existing user profile.
   */
  async update(userId: string, options: UpdateUserProfileOptions): Promise<UserProfileModel | null> {
    const updateData: Partial<UserProfileModel> = { ...options, updatedAt: new Date() };
    const profile = await this.userProfileModel.findOneAndUpdate({ userId }, updateData, { new: true });
    return profile ? profile.toObject() : null;
  }

  /**
   * Lists user profiles with optional pagination and search.
   */
  async list(options?: ListUserProfilesOptions): Promise<UserProfileModel[]> {
    let query: any = {};
    if (options?.search) {
      query = {
        $or: [
          { name: { $regex: options.search, $options: 'i' } },
          { bio: { $regex: options.search, $options: 'i' } },
          { company: { $regex: options.search, $options: 'i' } },
        ],
      };
    }

    const profiles = await this.userProfileModel
      .find(query)
      .skip(options?.offset || 0)
      .limit(options?.limit || 0)
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    return profiles.map((profile) => profile.toObject());
  }

  /**
   * Deletes a user profile by userId.
   */
  async delete(userId: string): Promise<UserProfileModel | null> {
    const profile = await this.userProfileModel.findOneAndDelete({ userId });
    return profile ? profile.toObject() : null;
  }
}