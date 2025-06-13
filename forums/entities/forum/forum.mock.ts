import { Forum } from './forum.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Provides a list of mock Forum instances for development and testing.
 * @param overrides Optional partial PlainForum objects to customize the mock data.
 *                  Each object in the overrides array will be merged with a default mock forum.
 * @returns An array of Forum instances.
 */
export function mockForums(overrides?: Partial<Parameters<typeof Forum.from>[0]>[]): Forum[] {
  const now = new Date().toISOString();
  const defaultForums = [
    {
      id: uuidv4(),
      name: 'General Discussion',
      description: 'A place to discuss general topics.',
      createdAt: now,
      updatedAt: now,
      imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=General',
    },
    {
      id: uuidv4(),
      name: 'Product Feedback',
      description: 'Share your feedback and suggestions for products.',
      createdAt: now,
      updatedAt: now,
      imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Feedback',
    },
    {
      id: uuidv4(),
      name: 'Tech Talk',
      description: 'Discuss the latest in technology.',
      createdAt: now,
      updatedAt: now,
      // No imageUrl for this one to test optionality
    },
  ];

  if (overrides) {
    return overrides.map((override, index) =>
      Forum.from({ ...defaultForums[index % defaultForums.length], ...override })
    );
  }

  return defaultForums.map(Forum.from);
}