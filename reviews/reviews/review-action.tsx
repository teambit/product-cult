import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Represents an action that can be performed on a review.
 */
export interface ReviewAction {
  /**
   * Unique name for the review action.
   */
  name: string;

  /**
   * The React component that represents the action.
   */
  component: ComponentType<any>;
}

export type ReviewActionSlot = SlotRegistry<ReviewAction[]>;