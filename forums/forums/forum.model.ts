import { prop, index } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

/**
 * Represents the Mongoose schema for a Forum.
 */
@index({ name: 1 })
@index({ description: 'text' })
export class ForumModel {
  @prop({ unique: true, required: true, default: () => uuid() })
  public id!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop()
  public imageUrl?: string;

  @prop({ required: true, default: () => new Date().toISOString() })
  public createdAt!: string;

  @prop({ required: true, default: () => new Date().toISOString() })
  public updatedAt!: string;
}

/**
 * Mock data for ForumModel.
 */
export const mockForumModels = [
  {
    id: 'forum-1',
    name: 'General Discussion',
    description: 'A place for all general discussions and announcements.',
    imageUrl: 'https://images.unsplash.com/photo-1649767428212-7590dbf20116?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBkaXNjdXNzaW9uJTIwZm9ydW18ZW58MXwwfHxvcmFuZ2V8MTc0OTYwMTQxMnww&ixlib=rb-4.1.0',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'forum-2',
    name: 'Tech Talk',
    description: 'Discuss the latest in technology, software, and hardware.',
    imageUrl: 'https://images.unsplash.com/photo-1578183561786-a461f6c5e202?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxvbmxpbmUlMjBkaXNjdXNzaW9uJTIwZm9ydW18ZW58MXwwfHxvcmFuZ2V8MTc0OTYwMTQxMnww&ixlib=rb-4.1.0',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'forum-3',
    name: 'Feedback & Support',
    description: 'Share your feedback and get support for the platform.',
    imageUrl: 'https://images.unsplash.com/photo-1603029705305-d10f0ec5d5a5?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxvbmxpbmUlMjBkaXNjdXNzaW9uJTIwZm9ydW18ZW58MXwwfHxvcmFuZ2V8MTc0OTYwMTQxMnww&ixlib=rb-4.1.0',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];