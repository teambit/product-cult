import { prop, index } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

/**
 * Represents the Mongoose schema for a Forum Topic.
 */
@index({ title: 1 })
@index({ content: 'text' })
export class ForumTopicModel {
  @prop({ unique: true, required: true, default: () => uuid() })
  public id!: string;

  @prop({ required: true })
  public forumId!: string;

  @prop({ required: true })
  public title!: string;

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
 * Mock data for ForumTopicModel.
 */
export const mockForumTopicModels = [
  {
    id: 'topic-1',
    forumId: 'forum-1',
    title: 'Welcome to the Forums!',
    content: 'Start your journey here. Introduce yourself and say hello!',
    userId: '1',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'topic-2',
    forumId: 'forum-1',
    title: 'Rules and Guidelines',
    content: 'Please read this before posting to ensure a friendly community.',
    userId: '3',
    createdAt: new Date(Date.now() - 86400000 * 3.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3.5).toISOString(),
  },
  {
    id: 'topic-3',
    forumId: 'forum-2',
    title: 'Future of AI in Product Development',
    content: 'Discussion about how AI will shape new product launches.',
    userId: '4',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'topic-4',
    forumId: 'forum-3',
    title: 'Bug Report: Login Issue',
    content: 'Experiencing issues logging in after the recent update.',
    userId: '5',
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  },
];
