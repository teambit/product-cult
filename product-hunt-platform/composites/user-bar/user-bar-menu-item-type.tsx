import type { ComponentType } from 'react';

/**
 * Defines the structure for a menu item in the UserBar dropdown.
 */
export type UserBarMenuItem = {
  /**
   * A unique name or key for the menu item.
   */
  name: string;
  /**
   * The text label displayed for the menu item.
   */
  label: string;
  /**
   * The URL or path the menu item should navigate to.
   */
  href: string;
  /**
   * An optional icon component to display next to the label.
   */
  icon?: ComponentType<{ className?: string }>;
  /**
   * An optional array of user roles. If provided, the menu item will only be visible to users possessing at least one of these roles.
   * If undefined or empty, the item is visible to all authenticated users.
   */
  allowedRoles?: readonly string[];
  /**
   * An optional weight for sorting menu items. Lower numbers typically appear first.
   * Not implemented for sorting in the current component but can be used by parent.
   */
  weight?: number;
};