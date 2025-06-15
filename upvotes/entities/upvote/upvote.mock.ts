import { Upvote, PlainUpvote } from "./upvote.js";
import { mockUser } from "@infinity/product-hunt-platform.entities.user";
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a single mock Upvote instance with default data, allowing for partial overrides.
 * This is useful for testing and development scenarios where Upvote objects are needed.
 * @param overrides Optional. An object containing properties to override in the default mock Upvote.
 *                  All properties of PlainUpvote can be overridden.
 * @returns A mock Upvote instance.
 */
export function mockUpvote(overrides?: Partial<PlainUpvote>): Upvote {
  const defaultUser = mockUser(); // Get a mock user to ensure userId is valid if not overridden
  const defaultUpvote: PlainUpvote = {
    id: uuidv4(),
    userId: defaultUser.id,
    itemId: `item-${uuidv4().slice(0, 8)}`,
    itemType: Math.random() > 0.5 ? "product" : "launch",
    createdAt: new Date().toISOString(),
    ...overrides,
  };
  return Upvote.from(defaultUpvote);
}

/**
 * Provides an array of predefined mock Upvote instances for development and testing.
 * This function utilizes mockUpvote to generate varied upvote profiles.
 * @returns An array containing diverse mock Upvote objects.
 */
export function mockUpvotes(): Upvote[] {
  const user1 = mockUser({ username: 'upvoter-alpha' });
  const user2 = mockUser({ username: 'upvoter-beta' });

  return [
    mockUpvote({
      userId: user1.id,
      itemId: "product-climbing-shoes-xyz",
      itemType: "product",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    }),
    mockUpvote({
      userId: user2.id,
      itemId: "launch-new-saas-platform",
      itemType: "launch",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    }),
    mockUpvote({
      userId: user1.id,
      itemId: "product-ergonomic-keyboard-v2",
      itemType: "product",
    }),
    mockUpvote({
      userId: user2.id,
      itemId: "product-climbing-shoes-xyz", // Same item, different user
      itemType: "product",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
    }),
  ];
}