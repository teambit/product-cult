import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface UpvoteCount {
  /**
   * name of the item
   */
  name: string;

  /**
   * The unique identifier of the item for which to display the upvote count.
   */
  itemId: string;
  /**
   * The type of the item (e.g., "product", "launch").
   */
  itemType: string;
}

export type UpvoteCountSlot = SlotRegistry<UpvoteCount[]>;