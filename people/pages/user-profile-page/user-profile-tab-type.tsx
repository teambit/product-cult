import type { ComponentType } from 'react';

/**
 * Defines the structure for a tab in the user profile page.
 */
export type UserProfileTab = {
  /**
   * A unique identifier for the tab.
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
  component: ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};