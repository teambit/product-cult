/**
 * Plain JavaScript object representation of an Upvote.
 * This type is used for serialization and deserialization of Upvote objects.
 */
export type PlainUpvote = {
  /**
   * Unique identifier for the upvote.
   */
  id: string;

  /**
   * Identifier of the user who made the upvote.
   */
  userId: string;

  /**
   * Identifier of the item that was upvoted.
   */
  itemId: string;

  /**
   * Type of the item that was upvoted (e.g., "product", "launch").
   */
  itemType: string;

  /**
   * ISO 8601 string representing when the upvote was created.
   */
  createdAt: string;
};

/**
 * Represents an upvote entity.
 * It encapsulates data related to a user's upvote on a specific item.
 */
export class Upvote {
  /**
   * Constructs a new Upvote instance.
   * @param id Unique identifier for the upvote.
   * @param userId Identifier of the user who made the upvote.
   * @param itemId Identifier of the item that was upvoted.
   * @param itemType Type of the item that was upvoted (e.g., "product", "launch").
   * @param createdAt ISO 8601 string representing when the upvote was created.
   */
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly itemId: string,
    public readonly itemType: string,
    public readonly createdAt: string
  ) {}

  /**
   * Serializes the Upvote instance into a plain JavaScript object.
   * @returns The plain object representation of the upvote, conforming to PlainUpvote.
   */
  toObject(): PlainUpvote {
    return {
      id: this.id,
      userId: this.userId,
      itemId: this.itemId,
      itemType: this.itemType,
      createdAt: this.createdAt,
    };
  }

  /**
   * Creates an Upvote instance from a plain upvote object.
   * This method is used to reconstruct an Upvote entity from data that conforms to PlainUpvote.
   * @param plainUpvote The plain object containing upvote data.
   * @returns A new Upvote instance.
   */
  static from(plainUpvote: PlainUpvote): Upvote {
    return new Upvote(
      plainUpvote.id,
      plainUpvote.userId,
      plainUpvote.itemId,
      plainUpvote.itemType,
      plainUpvote.createdAt
    );
  }
}