import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface UserBarMenuItem {
  /**
   * name of the item
   */
  name: string;

  /**
   * The text label displayed for the menu item.
   */
  label: string;

  /**
   * An optional array of user roles. If provided, the menu item will only be visible to users possessing at least one of these roles.
   */
  allowedRoles?: string[];

  /**
   * An optional icon component to display next to the label.
   */
  icon?: ComponentType;

  /**
   * The URL or path the menu item should navigate to.
   */
  href: string;

  /**
   * An optional weight for sorting menu items. Lower numbers typically appear first.
   */
  weight?: number;
}

export type UserBarMenuItemSlot = SlotRegistry<UserBarMenuItem[]>;