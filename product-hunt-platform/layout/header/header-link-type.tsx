import type { ComponentType } from 'react';

/**
 * Defines the structure for a navigation link in the header.
 */
export type HeaderLinkType = {
  /**
   * The text label to display for the link.
   */
  label: string;
  /**
   * The URL or path the link should navigate to.
   */
  href: string;
  /**
   * If true, the link will be treated as an external link.
   * @default false
   */
  external?: boolean;
  /**
   * Optional icon component to display next to the link label.
   */
  icon?: ComponentType<{ className?: string; size?: number | string }>;
};