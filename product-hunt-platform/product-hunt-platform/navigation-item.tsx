import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface NavigationItem {
  /**
   * name of the item
   */
  name: string;

  /**
   * An optional weight for sorting menu items. Lower numbers typically appear first.
   */
  weight?: number;

  /**
   * The text label to display for the navigation item.
   */
  label: string;

  /**
   * The URL or path the navigation item should link to.
   */
  href: string;

  /**
   * An optional icon component to display next to the label.
   */
  icon?: ComponentType;
}

export type NavigationItemSlot = SlotRegistry<NavigationItem[]>;