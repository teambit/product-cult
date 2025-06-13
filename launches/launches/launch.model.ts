import { getModelForClass, modelOptions, prop, index, ReturnModelType } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'launches', timestamps: true } })
@index({ name: 1 })
@index({ tagline: 'text', description: 'text' })
export class LaunchModel {
  @prop({ unique: true, required: true })
  public id!: string;

  @prop({ required: true })
  public productId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public tagline!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public launchDate!: string; // ISO 8601 format

  @prop({ required: true, default: 'pending' })
  public status!: string; // e.g., 'pending', 'approved', 'rejected', 'upcoming', 'live', 'archived'

  @prop({ required: true })
  public submittedBy!: string; // User ID

  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;
}

export const mockLaunchModels: Partial<LaunchModel>[] = [
  {
    id: 'launch-1',
    productId: 'product-alpha',
    name: 'Apollo 11 Mission',
    tagline: 'The first moon landing!',
    description: 'A historic mission that landed humans on the Moon for the first time, fulfilling President Kennedy\'s national goal.',
    launchDate: '1969-07-16T13:32:00Z',
    status: 'archived',
    submittedBy: 'user-1',
  },
  {
    id: 'launch-2',
    productId: 'product-beta',
    name: 'SpaceX Starship Inaugural Launch',
    tagline: 'To Mars and beyond!',
    description: 'The highly anticipated first orbital test flight of SpaceX\'s next-generation fully reusable super heavy-lift launch vehicle.',
    launchDate: '2025-03-20T09:00:00Z',
    status: 'upcoming',
    submittedBy: 'user-2',
  },
  {
    id: 'launch-3',
    productId: 'product-gamma',
    name: 'Webb Space Telescope Deployment',
    tagline: 'Unveiling the universe.',
    description: 'The James Webb Space Telescope\'s critical deployment phase after launch, unfolding its mirrors and sunshield in space.',
    launchDate: '2021-12-25T12:20:00Z',
    status: 'live',
    submittedBy: 'user-1',
  },
  {
    id: 'launch-4',
    productId: 'product-delta',
    name: 'Perseverance Rover Landing',
    tagline: 'Seeking signs of ancient life on Mars.',
    description: 'NASA\'s Perseverance rover successfully landed on Mars\'s Jezero Crater, beginning its mission to seek signs of ancient microbial life.',
    launchDate: '2021-02-18T20:55:00Z',
    status: 'archived',
    submittedBy: 'user-3',
  },
  {
    id: 'launch-5',
    productId: 'product-epsilon',
    name: 'Artemis I Uncrewed Test Flight',
    tagline: 'Paving the way for humanity\'s return to the Moon.',
    description: 'The first integrated test of NASA’s deep space exploration systems: the Orion spacecraft, Space Launch System (SLS) rocket, and ground systems.',
    launchDate: '2022-11-16T06:47:00Z',
    status: 'archived',
    submittedBy: 'user-2',
  }
];