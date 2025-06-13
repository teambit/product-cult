import type React from 'react';
import type { UserBarMenuItem } from './user-bar-menu-item-type.js';

/**
 * Props for the UserBar component.
 */
export type UserBarProps = {
  /**
   * An array of menu items to display in the dropdown when a user is logged in.
   * Defaults to an empty array if not provided.
   */
  menuItems?: UserBarMenuItem[];
  /**
   * Optional CSS class name to apply to the root element of the user bar.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the user bar.
   */
  style?: React.CSSProperties;
};