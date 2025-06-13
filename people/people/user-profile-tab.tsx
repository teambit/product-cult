import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface UserProfileTab {
  /**
   * name of the item
   */
  name: string;

  /**
   * The display text for the tab button.
   */
  label: string;

  /**
   * Optional icon component to display next to the label.
   * The icon component should accept a `className` prop for styling.
   */
  icon?: ComponentType<{ className?: string }>;

  /**
   * The React component to render when this tab is active.
   */
  component: ComponentType<any>;

  /**
   * An optional weight for sorting tabs. Lower numbers typically appear first.
   */
  weight?: number;
}

export type UserProfileTabSlot = SlotRegistry<UserProfileTab[]>;