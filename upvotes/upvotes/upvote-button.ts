import type { SlotRegistry } from '@bitdev/harmony.harmony';

export interface UpvoteButton {
  /**
   * name of the item
   */
  name: string;

  /**
   * Unique identifier of the item (e.g., product, launch) to be upvoted.
   */
  itemId: string;
  /**
   * Specifies the type of the item being upvoted (e.g., "product", "launch").
   */
  itemType: string;
  /**
   * Defines the size of the upvote icon within the button.
   */
  size?: string | number;
}

export type UpvoteButtonSlot = SlotRegistry<UpvoteButton[]>;