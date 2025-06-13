import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Represents a tab to be displayed on a user profile page, showing their reviews.
 */
export interface UserProfileReviewsTab {
  /**
   * Unique name for the user profile reviews tab.
   */
  name: string;

  /**
   * The React component to render for this user profile reviews tab.
   */
  component: ComponentType<any>;
}

export type UserProfileReviewsTabSlot = SlotRegistry<UserProfileReviewsTab[]>;