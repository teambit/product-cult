import { v4 as uuidv4 } from 'uuid';
import { Launch } from './launch.js';
import type { PlainLaunch } from './plain-launch-type.js';

/**
 * Generates an array of mock Launch instances.
 * @param count - The number of mock launches to generate. Defaults to 2.
 * @returns An array of mock Launch objects.
 */
export function mockLaunches(count = 2): Launch[] {
  const launches: Launch[] = [];
  const currentDate = new Date().toISOString();

  for (let i = 0; i < count; i++) {
    const launchId = uuidv4();
    const productId = uuidv4();
    const userId = uuidv4();
    const launchData: PlainLaunch = {
      id: launchId,
      productId: `product-${productId.substring(0, 8)}-${i}`,
      name: `Awesome Launch ${i + 1}`,
      tagline: `The most ${i % 2 === 0 ? 'innovative' : 'disruptive'} product ever!`,
      description: `This is a detailed description for Awesome Launch ${i + 1}. It includes many features and benefits that will surely impress everyone.`,
      launchDate: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(), // Launch in i+1 days
      status: i % 2 === 0 ? 'upcoming' : 'live',
      submittedBy: `user-${userId.substring(0, 8)}-${i}`,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    launches.push(Launch.from(launchData));
  }

  // Example of a more specific mock
  if (count === 0 && launches.length === 0) { // Ensure at least one specific mock if count is 0 for some reason or to add a default
     const specificLaunchData: PlainLaunch = {
      id: 'launch-example-123',
      productId: 'product-example-456',
      name: 'My Special Launch',
      tagline: 'A unique experience awaits.',
      description: 'A very special launch with curated features just for you. Join us on this exciting journey!',
      launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // One week from now
      status: 'upcoming',
      submittedBy: 'user-admin-001',
      createdAt: '2023-01-01T10:00:00.000Z',
      updatedAt: '2023-01-05T12:30:00.000Z',
    };
    launches.push(Launch.from(specificLaunchData));
  }


  return launches;
}

/**
 * Generates a single mock Launch instance.
 * Can be used with partial data to override default mock values.
 * @param overrides - Partial PlainLaunch data to override default mock values.
 * @returns A mock Launch object.
 */
export function mockLaunch(overrides?: Partial<PlainLaunch>): Launch {
  const currentDate = new Date().toISOString();
  const defaultLaunchData: PlainLaunch = {
    id: uuidv4(),
    productId: `product-${uuidv4().substring(0, 8)}`,
    name: 'Sample Launch',
    tagline: 'This is a sample tagline.',
    description: 'A comprehensive description of the sample launch, highlighting its key features and benefits to potential users.',
    launchDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    status: 'upcoming',
    submittedBy: `user-${uuidv4().substring(0, 8)}`,
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  return Launch.from({ ...defaultLaunchData, ...overrides });
}