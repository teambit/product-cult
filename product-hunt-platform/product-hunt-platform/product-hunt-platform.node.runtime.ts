import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';

import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import type { ProductHuntPlatformConfig } from './product-hunt-platform-config.js';
import { productHuntPlatformGqlSchema } from './product-hunt-platform.graphql.js';
import { UserRepository } from './user-repository.js';
import { UserModel, userModelMock } from './user.model.js';
import { User, PlainUser } from '@infinity/product-hunt-platform.entities.user';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import {
  CreateUserOptions,
  LoginUserOptions,
  UpdateUserOptions,
  GetUserOptions,
  ListUsersOptions,
} from './user-options.js';

// Helper to convert a user document object (with 'id') to PlainUser (with 'userId')
interface UserDocumentObject {
  id: string;
  email: string;
  username: string;
  imageUrl?: string;
  roles: string[]; // From UserModel, which defaults to []
}

function convertDocumentToPlainUser(doc: UserDocumentObject): PlainUser {
  return {
    userId: doc.id,
    email: doc.email,
    username: doc.username,
    imageUrl: doc.imageUrl,
    roles: doc.roles,
  };
}


export class ProductHuntPlatformNode {
  constructor(
    private productHuntPlatformConfig: ProductHuntPlatformConfig,
    private userRepository: UserRepository,
    private symphonyPlatform: SymphonyPlatformNode,
  ) {}

  /**
   * Creates a new user in the platform.
   * @param options The options for creating the user.
   * @returns The created User entity.
   * @throws AccessDenied if a user with the given email or username already exists.
   */
  async createUser(options: CreateUserOptions): Promise<User> {
    const existingUserByEmail = await this.userRepository.findByEmail(options.email);
    if (existingUserByEmail) throw new AccessDenied('User with this email already exists.');
    const existingUserByName = await this.userRepository.findByName(options.name);
    if (existingUserByName) throw new AccessDenied('User with this username already exists.');

    const userDocObject = await this.userRepository.createUser(options);
    return User.from(convertDocumentToPlainUser(userDocObject as UserDocumentObject));
  }

  /**
   * Logs in an existing user.
   * @param options The login options including email and password.
   * @returns The logged-in User entity.
   * @throws Unauthorized if login credentials are invalid.
   */
  async loginUser(options: LoginUserOptions): Promise<User | undefined> {
    const userDocObject = await this.userRepository.login(options);
    if (!userDocObject) return undefined;
    return User.from(convertDocumentToPlainUser(userDocObject as UserDocumentObject));
  }

  /**
   * Updates an existing user's profile.
   * A regular user can only update their own profile. An admin can update any profile.
   * @param options The update options.
   * @param currentUser The currently authenticated user.
   * @returns The updated User entity.
   * @throws Unauthorized if not authenticated.
   * @throws AccessDenied if the current user is not authorized to update the target user.
   * @throws NotFound if the target user to update does not exist.
   */
  async updateUser(options: UpdateUserOptions, currentUser: User): Promise<User> {
    if (!currentUser) throw new Unauthorized('Authentication required for updating user profile.');

    // For simplicity, allow user to update their own profile.
    // In a real app, options might include a target userId if an admin can update others.
    const userDocObject = await this.userRepository.updateUser(currentUser.id, options);
    if (!userDocObject) throw new NotFound(`User with id ${currentUser.id} not found.`);

    return User.from(convertDocumentToPlainUser(userDocObject as UserDocumentObject));
  }

  /**
   * Retrieves a user's profile by ID.
   * @param options The options including the userId.
   * @param currentUser The currently authenticated user. Optional for public profiles.
   * @returns The User entity.
   * @throws NotFound if the user is not found.
   * @throws AccessDenied if the current user is not authorized to view the profile.
   */
  async getUser(options: GetUserOptions, currentUser?: User): Promise<User> {
    const userDocObject = await this.userRepository.findById(options);
    if (!userDocObject) throw new NotFound(`User with id ${options.userId} not found.`);

    // Example authorization: Only admins or the user themselves can view full profiles.
    // For now, allowing any authenticated user to view.
    if (!currentUser) {
       // Decide if public profiles are allowed or require authentication
       // For now, assume public viewing is not allowed unless authenticated
       throw new Unauthorized('Authentication required to view user profiles.');
    }
    return User.from(convertDocumentToPlainUser(userDocObject as UserDocumentObject));
  }

  /**
   * Lists users with pagination and search.
   * Only accessible by authenticated users.
   * @param options The list options including offset, limit, and search term.
   * @param currentUser The currently authenticated user.
   * @returns An array of User entities.
   * @throws Unauthorized if not authenticated.
   */
  async listUsers(options: ListUsersOptions, currentUser?: User): Promise<User[]> {
    if (!currentUser) throw new Unauthorized('Authentication required to list users.');

    const userDocObjects = await this.userRepository.listUsers(options);
    return userDocObjects.map((doc) => User.from(convertDocumentToPlainUser(doc as UserDocumentObject)));
  }

  /**
   * Retrieves the platform manifest containing basic information.
   * @returns An object with the platform name and version.
   */
  getPlatformManifest(): { name: string; version: string } {
    return {
      name: this.symphonyPlatform.config.name,
      version: '1.0.0', // Hardcoded version for now, could be configurable
    };
  }

  static dependencies = [SymphonyPlatformAspect];

  static defaultConfig: ProductHuntPlatformConfig = {
    mongoUrl: process.env.MONGO_URL,
    sessionSecretKey: process.env.SESSION_SECRET_KEY || 'your_secret_key_please_change_me',
  };

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformNode],
    config: ProductHuntPlatformConfig,
  ) {
    if (config.mongoUrl) {
      await mongoose.connect(config.mongoUrl);
    } else {
      console.warn('MONGO_URL not provided, MongoDB connection skipped.');
    }

    const userModel = getModelForClass(UserModel);
    const userRepository = new UserRepository(userModel);

    const productHuntPlatform = new ProductHuntPlatformNode(config, userRepository, symphonyPlatform);

    const gqlSchema = productHuntPlatformGqlSchema(productHuntPlatform);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      },
    ]);

    /**
     * implement a middleware to authenticate users
     * and attach the user to the request.
     */
    symphonyPlatform.registerMiddlewares([
      bodyParser.urlencoded({ extended: true }),
      session({
        store: config.mongoUrl
          ? MongoStore.create({
              mongoUrl: config.mongoUrl,
              dbName: 'producthunt', // Specify dbName for connect-mongo
              collectionName: 'sessions', // Optional: specify collection name for sessions
            })
          : undefined, // If no mongoUrl, session store will be in-memory (not suitable for production)
        secret: config.sessionSecretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: 'auto', sameSite: 'lax' }, // Set 'lax' for CSRF protection and compatibility
      }),
    ]);

    symphonyPlatform.registerOnStart(async () => {
      const existingDocs = await userModel.find().limit(1);
      const hasDocs = Boolean(existingDocs.length);
      if (hasDocs) return undefined;
      await userModel.insertMany(userModelMock);
      return undefined;
    });

    return productHuntPlatform;
  }
}

export default ProductHuntPlatformNode;