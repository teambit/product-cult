import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface UserUpvotedItemsList {
  /**
   * name of the item
   */
  name: string;

  /**
   * The ID of the user whose upvoted items are to be listed.
   */
  userId: string;
  /**
   * The type of items to filter by (e.g., "product", "launch").
   */
  itemType: string;
}

export type UserUpvotedItemsListSlot = SlotRegistry<UserUpvotedItemsList[]>;