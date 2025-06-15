import { prop, index } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

/**
 * Represents the Mongoose schema for a Forum Post.
 */
@index({ content: 'text' })
export class ForumPostModel {
  @prop({ unique: true, required: true, default: () => uuid() })
  public id!: string;

  @prop({ required: true })
  public topicId!: string;

  @prop({ required: true })
  public content!: string;

  @prop({ required: true })
  public userId!: string;

  @prop({ required: true, default: () => new Date().toISOString() })
  public createdAt!: string;

  @prop({ required: true, default: () => new Date().toISOString() })
  public updatedAt!: string;
}

/**
 * Mock data for ForumPostModel.
 */
export const mockForumPostModels = [
  {
    id: 'post-1',
    topicId: 'topic-1',
    content: 'Hello everyone! Glad to be here.',
    userId: '1',
    createdAt: new Date(Date.now() - 86400000 * 3.9).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3.9).toISOString(),
  },
  {
    id: 'post-2',
    topicId: 'topic-1',
    content: 'Me too! Looking forward to great discussions.',
    userId: '2',
    createdAt: new Date(Date.now() - 86400000 * 3.8).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3.8).toISOString(),
  },
  {
    id: 'post-3',
    topicId: 'topic-3',
    content: 'I think AI will primarily assist in market research and personalization.',
    userId: '1',
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
  },
  {
    id: 'post-4',
    topicId: 'topic-3',
    content: 'Agreed, especially in refining feature sets based on user data.',
    userId: '3',
    createdAt: new Date(Date.now() - 86400000 * 1.4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1.4).toISOString(),
  },
];
