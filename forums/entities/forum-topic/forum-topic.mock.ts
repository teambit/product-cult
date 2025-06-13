import { ForumTopic, PlainForumTopic } from "./forum-topic.js";
import { v4 as uuidv4 } from 'uuid';

/**
 * Provides a list of mock ForumTopic instances for development and testing.
 * @param overrides Optional partial PlainForumTopic objects to customize the mock data.
 * Each object in the overrides array will be merged with a default mock topic.
 * @returns An array of ForumTopic instances.
 */
export function mockForumTopics(overrides: Partial<PlainForumTopic>[] = []): ForumTopic[] {
  const defaultTopics: PlainForumTopic[] = [
    {
      id: uuidv4(),
      forumId: "forum-1",
      title: "Welcome to the General Discussion!",
      content: "Feel free to discuss anything here.",
      userId: "user-123",
      createdAt: new Date("2023-01-15T10:00:00.000Z").toISOString(),
      updatedAt: new Date("2023-01-15T10:00:00.000Z").toISOString(),
    },
    {
      id: uuidv4(),
      forumId: "forum-2",
      title: "Introduce Yourself",
      content: "Let's get to know each other. Share a bit about yourself.",
      userId: "user-456",
      createdAt: new Date("2023-01-16T12:30:00.000Z").toISOString(),
      updatedAt: new Date("2023-01-17T09:15:00.000Z").toISOString(),
    },
    {
      id: uuidv4(),
      forumId: "forum-1",
      title: "Latest Tech News & Trends",
      content: "What's new in the world of technology? Share articles and insights.",
      userId: "user-789",
      createdAt: new Date("2023-02-01T08:00:00.000Z").toISOString(),
      updatedAt: new Date("2023-02-05T14:20:00.000Z").toISOString(),
    }
  ];

  if (overrides.length === 0) {
    return defaultTopics.map(ForumTopic.from);
  }

  return overrides.map(override => {
    // Find a default to merge with, or use a minimal base if no id matches
    const base = defaultTopics.find(t => t.id === override.id) || {
        id: uuidv4(),
        forumId: "forum-default",
        title: "Default Title",
        content: "Default content.",
        userId: "user-default",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    return ForumTopic.from({ ...base, ...override });
  });
}