import { prop, DocumentType, modelOptions, index } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

/**
 * Represents a sub-document for storing indexed data.
 */
@modelOptions({ schemaOptions: { _id: false } })
class SearchData {
  @prop({ type: () => String })
  public url?: string;

  @prop({ type: () => Object, default: {} })
  public attributes?: Record<string, any>;
}

@index({ title: 'text', description: 'text', keywords: 'text' })
@index({ type: 1 })
@index({ id: 1 }, { unique: true })
@modelOptions({ schemaOptions: { timestamps: true } })
export class SearchIndexModel {
  @prop({ required: true, unique: true, default: () => uuid() })
  public id: string;

  @prop({ required: true })
  public type: string; // e.g., 'product', 'news', 'forum-post'

  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public description: string;

  @prop()
  public imageUrl?: string;

  @prop({ type: () => [String] })
  public keywords?: string[]; // keywords extracted for search

  @prop({ type: () => SearchData })
  public data?: SearchData; // additional structured data
}

export type SearchIndexDocument = DocumentType<SearchIndexModel>;

export const mockSearchIndexModels: SearchIndexModel[] = [
  {
    id: uuid(),
    type: 'product',
    title: 'Bit Cloud',
    description: 'A comprehensive kit for building and composing Bit components.',
    imageUrl: 'https://images.unsplash.com/photo-1563273941-3f576efb8738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['bit', 'harmony', 'development', 'kit', 'component'],
    data: { url: '/products/bit-harmony-kit' }
  },
  {
    id: uuid(),
    type: 'product',
    title: 'Gemini 2.5 Pro',
    description: 'Introducing major performance improvements and new features in Bit version 10.0.',
    imageUrl: 'https://images.unsplash.com/photo-1601217817505-8e2cfe5b8419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['bit', 'release', 'v10', 'update', 'news'],
    data: { url: '/news/bit-v10-release' }
  },
  {
    id: uuid(),
    type: 'forum-post',
    title: 'GraphQL Error in Node Runtime',
    description: 'Having issues with GraphQL resolvers in my Bit Node.js runtime. Any help?',
    imageUrl: 'https://images.unsplash.com/photo-1571039045050-ab1a68aa8ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['graphql', 'error', 'node', 'runtime', 'bit', 'forum'],
    data: { url: '/forum/graphql-error' }
  },
  {
    id: uuid(),
    type: 'product',
    title: 'Ripple CI: CI/CD for the AI era',
    description: 'Visualize and browse your Bit components with this powerful new tool.',
    imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['component', 'explorer', 'tool', 'bit'],
    data: { url: '/products/component-explorer' }
  },
  {
    id: uuid(),
    type: 'product',
    title: 'Atlas: Document oriented database to scale to millions of users',
    description: 'Document oriented database to scale to millions of users for the age of AI.',
    imageUrl: 'https://images.unsplash.com/photo-1659841064804-5f507b1b488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['component', 'explorer', 'tool', 'bit'],
    data: { url: '/products/component-explorer' }
  },
  {
    id: uuid(),
    type: 'news',
    title: 'Bit and AI: The Future of Component Development',
    description: 'Exploring how AI is revolutionizing the way we develop and manage components with Bit.',
    imageUrl: 'https://images.unsplash.com/photo-1477013743164-ffc3a5e556da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxzZWFyY2glMjB0ZWNobm9sb2d5fGVufDF8MHx8Ymx1ZXwxNzQ5NjAwNzY3fDA&ixlib=rb-4.1.0&q=80&w=200',
    keywords: ['ai', 'future', 'component', 'development', 'news'],
    data: { url: '/news/bit-ai' }
  }
];