import { prop, getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

export class UserModel {
  @prop({ required: true, unique: true })
  public id!: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ type: String })
  public imageUrl?: string; // Optional image URL

  @prop({ type: () => [String], default: [] })
  public roles!: string[];

  /**
   * Compares a raw password with the hashed password stored in the model.
   * @param rawPassword The plain text password to compare.
   * @returns True if the passwords match, false otherwise.
   */
  public async verifyPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}

/**
 * Mock user data for seeding the database.
 */
export const userModelMock = [
  {
    id: 'user1-admin-uuid',
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('adminpassword', 10),
    imageUrl: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    roles: ['admin'],
  },
  {
    id: 'user2-john-uuid',
    username: 'john-doe',
    email: 'john.doe@example.com',
    password: bcrypt.hashSync('johnpassword', 10),
    imageUrl: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    roles: [],
  },
  {
    id: 'user3-jane-uuid',
    username: 'jane-doe',
    email: 'jane.doe@example.com',
    password: bcrypt.hashSync('janepassword', 10),
    imageUrl: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    roles: ['moderator'],
  },
];