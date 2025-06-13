import { Forum } from './forum.js';

describe('Forum', () => {
  it('should create a Forum instance from a plain object', () => {
    const plainForum = {
      id: '123',
      name: 'Test Forum',
      description: 'A test forum',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const forum = Forum.from(plainForum);
    expect(forum.name).toBe(plainForum.name);
  });

  it('should serialize a Forum instance into a plain object', () => {
    const now = new Date().toISOString();
    const forum = new Forum('Test Forum', 'A test forum', now, now);
    const plainForum = forum.toObject();
    expect(plainForum.name).toBe(forum.name);
    expect(plainForum.description).toBe(forum.description);
  });

  it('should generate a unique id if not provided', () => {
    const now = new Date().toISOString();
    const forum = new Forum('Test Forum', 'A test forum', now, now);
    expect(forum.id).toBeDefined();
  });
});