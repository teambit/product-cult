import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Represents a customizable item within a list of reviews.
 */
export interface ReviewListItem {
  /**
   * Unique name for the review list item.
   */
  name: string;

  /**
   * The React component to render for this review list item.
   */
  component: ComponentType<any>;
}

export type ReviewListItemSlot = SlotRegistry<ReviewListItem[]>;