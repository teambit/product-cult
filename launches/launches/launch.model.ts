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

  @prop()
  public imageUrl!: string;

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
    productId: '3', // Linked to Bit Cloud
    name: 'Hope AI: An architecture agent for composing software', // Kept original name
    imageUrl: 'https://static.bit.dev/blog/og-images/hope-ai-agent.png',
    tagline: 'Your AI architect for long-term products.', // Updated tagline
    description: 'Introducing Hope AI, a generative AI architecture agent that understands your software architecture and helps you compose features and applications.',
    launchDate: '2025-06-18T13:32:00Z',
    status: 'upcoming',
    submittedBy: '8',
  },
  {
    id: 'launch-2',
    productId: '5', // Linked to SpaceX Dragon
    name: 'SpaceX AI Space Travelers',
    tagline: 'Returning human spaceflight to the United States.',
    imageUrl: 'https://storage.googleapis.com/static.bit.dev/product-cult/launches%20-%20SpaceX%20Demo-2%20Mission.jpeg',
    description: 'The first crewed test flight of the SpaceX Dragon 2 capsule, launching American astronauts to the ISS from U.S. soil for the first time since 2011.',
    launchDate: '2025-08-30T19:22:00Z',
    status: 'upcoming',
    submittedBy: '6',
  },
  {
    id: 'launch-3',
    productId: '3', // Linked to Bit Cloud
    name: 'Ripple CI: The CI/CD for the AI era',
    imageUrl: 'https://storage.googleapis.com/static.bit.dev/product-cult/Product%20%20-%20bit%20cloud.jpeg',
    tagline: 'Build, update, and release composable components.',
    description: 'Launch of Ripple CI, the CI/CD built for components. Get faster, more reliable builds by simulating changes and updating your dependencies.',
    launchDate: '2024-11-10T10:00:00Z',
    status: 'archived',
    submittedBy: '8',
  },
  {
    id: 'launch-4',
    productId: '3', // Linked to Bit Cloud
    name: 'Cloud workspaces: Build anything, everywhere',
    tagline: 'Your complete dev environment, in the cloud.',
    imageUrl: 'https://static.bit.dev/design-graphics/Bit%20Cloud%20Pages/cloud-workspaces-hero.png',
    description: 'Introducing Bit Cloud Workspaces: a complete, cloud-based development environment to build, test, and collaborate on components from any machine.',
    launchDate: '2025-02-15T09:00:00Z',
    status: 'archived',
    submittedBy: '8',
  },
  {
    id: 'launch-5',
    productId: '4', // Linked to Atlas
    name: 'Atlas: The Database for Modern Apps',
    imageUrl: 'https://storage.googleapis.com/static.bit.dev/product-cult/launches%20-%20Atlas.jpeg',
    tagline: 'The database for modern applications, now faster.',
    description: 'Announcing the next generation of Atlas, our scalable document-oriented database designed to support millions of users with unparalleled performance and reliability.',
    launchDate: '2025-06-22T06:47:00Z',
    status: 'upcoming',
    submittedBy: '4',
  },
  {
    id: 'launch-6',
    productId: '6', // Linked to bit.dev
    name: 'Bit.dev: Compose components with AI',
    tagline: 'Build with AI, compose with components.',
    imageUrl: 'https://static.bit.dev/blog/og-images/bit-cloud-platform.png',
    description: "Introducing the next generation of development with bit.dev's AI-powered workspaces. Design, develop, and deliver with reusable components and zero overhead.",
    launchDate: '2025-05-20T11:00:00Z',
    status: 'archived',
    submittedBy: '8',
  },
  {
    id: 'launch-7',
    productId: '7', // Linked to Harmony
    name: 'Harmony: Build without glue code', // Corrected name
    imageUrl: 'https://static.bit.dev/blog/og-images/bit-cloud-platform.png',
    tagline: 'Compose platforms from independent business features.', // Corrected tagline
    description: 'Introducing Harmony, a minimalistic open-source library for composing highly performant and consistent platforms from independent business features. Seamlessly integrate API-centric features into shell applications while maintaining optimal performance, safety, and developer experience.', // Corrected description
    launchDate: '2023-09-14T14:00:00Z',
    status: 'archived',
    submittedBy: '8',
  }
];
