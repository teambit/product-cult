import bcrypt from 'bcryptjs';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserModel } from './user.model.js';
import {
  CreateUserOptions,
  LoginUserOptions,
  UpdateUserOptions,
  GetUserOptions,
  ListUsersOptions,
} from './user-options.js';

export class UserRepository {
  constructor(private userModel: ReturnModelType<typeof UserModel>) {}

  /**
   * Creates a new user in the database.
   * @param options The options for creating the user, including username, email, and password.
   * @returns The created user model.
   */
  async createUser(options: CreateUserOptions): Promise<UserModel> {
    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(options.password, 10);
    const user = await this.userModel.create({
      id,
      username: options.name, // Mapping name from options to username in model
      email: options.email,
      password: passwordHash,
      roles: [],
    });
    return user.toObject();
  }

  /**
   * Authenticates a user based on email and password.
   * @param options The login options including email and password.
   * @returns The authenticated user model, or undefined if authentication fails.
   */
  async login(options: LoginUserOptions): Promise<UserModel | undefined> {
    if (!options.email || !options.password) return undefined;
    const user = await this.userModel.findOne({ email: options.email });
    if (!user) return undefined;
    const ok = await user.verifyPassword(options.password);
    if (!ok) return undefined;
    return user.toObject();
  }

  /**
   * Finds a user by their unique ID.
   * @param options The options including the userId.
   * @returns The user model, or undefined if not found.
   */
  async findById(options: GetUserOptions): Promise<UserModel | undefined> {
    const user = await this.userModel.findOne({ id: options.userId });
    return user?.toObject();
  }

  /**
   * Finds a user by their username.
   * @param username The username to search for.
   * @returns The user model, or undefined if not found.
   */
  async findByName(username: string): Promise<UserModel | undefined> {
    const user = await this.userModel.findOne({ username });
    return user?.toObject();
  }

  /**
   * Finds a user by their email address.
   * @param email The email address to search for.
   * @returns The user model, or undefined if not found.
   */
  async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.userModel.findOne({ email });
    return user?.toObject();
  }

  /**
   * Updates an existing user's profile.
   * @param userId The ID of the user to update.
   * @param options The update options (name, password, avatar).
   * @returns The updated user model, or undefined if the user was not found.
   */
  async updateUser(userId: string, options: UpdateUserOptions): Promise<UserModel | undefined> {
    const user = await this.userModel.findOne({ id: userId });
    if (!user) return undefined;

    if (options.name !== undefined) user.username = options.name;
    if (options.avatar !== undefined) user.imageUrl = options.avatar;
    if (options.password !== undefined) {
      user.password = await bcrypt.hash(options.password, 10);
    }

    await user.save();
    return user.toObject();
  }

  /**
   * Lists users with optional pagination and search functionality.
   * @param options The list options including offset, limit, and search term.
   * @returns An array of user models.
   */
  async listUsers(options: ListUsersOptions): Promise<UserModel[]> {
    const query: any = {};
    if (options.search) {
      query.$or = [
        { username: { $regex: options.search, $options: 'i' } },
        { email: { $regex: options.search, $options: 'i' } },
      ];
    }

    const usersQuery = this.userModel.find(query);
    if (options.offset !== undefined) usersQuery.skip(options.offset);
    if (options.limit !== undefined) usersQuery.limit(options.limit);

    const users = await usersQuery.exec();
    return users.map((user) => user.toObject());
  }
}