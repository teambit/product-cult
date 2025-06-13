import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface UserProfileCard {
  /**
   * name of the item
   */
  name: string;

  /**
   * The React component to render for this card.
   */
  component: ComponentType;

  /**
   * An optional weight for sorting cards. Lower numbers typically appear first.
   */
  weight?: number;
}

export type UserProfileCardSlot = SlotRegistry<UserProfileCard[]>;