import { Upvote } from './upvote.js';
import { mockUpvote } from './upvote.mock.js';

describe('Upvote', () => {
  it('should create an Upvote instance from a plain object', () => {
    const plainUpvote = mockUpvote().toObject();
    const upvote = Upvote.from(plainUpvote);
    expect(upvote).toBeInstanceOf(Upvote);
  });

  it('should serialize an Upvote instance to a plain object', () => {
    const upvote = mockUpvote();
    const plainUpvote = upvote.toObject();
    expect(plainUpvote).toEqual({
      id: upvote.id,
      userId: upvote.userId,
      itemId: upvote.itemId,
      itemType: upvote.itemType,
      createdAt: upvote.createdAt,
    });
  });

  it('should return a mock upvote with valid properties', () => {
    const upvote = mockUpvote();
    expect(upvote.id).toBeDefined();
    expect(upvote.userId).toBeDefined();
    expect(upvote.itemId).toBeDefined();
    expect(upvote.itemType).toBeDefined();
    expect(upvote.createdAt).toBeDefined();
  });
});