import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface UserProfileAction {
  /**
   * name of the item
   */
  name: string;

  /**
   * The React component to render for this action.
   */
  component: ComponentType<UserProfileActionProps>;
}

/**
 * Props for a UserProfileAction component.
 */
export type UserProfileActionProps = {
  /**
   * The ID of the user for whom the action is being performed.
   */
  userId: string;
};

export type UserProfileActionSlot = SlotRegistry<UserProfileAction[]>;