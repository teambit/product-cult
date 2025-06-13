import type { ComponentType, ReactNode } from 'react';

/**
 * Defines the structure for an option within filter selection components like SelectList.
 * Each option has a value for identification, a label for display, and can be disabled or have an icon.
 */
export type FilterOptionType = {
  /**
   * The unique value associated with the filter option.
   * This value is used programmatically, e.g., in callbacks.
   */
  value: string;
  /**
   * The human-readable text or React node to display for this option.
   */
  label: ReactNode;
  /**
   * If true, this option will be visible but cannot be selected.
   * @default false
   */
  disabled?: boolean;
  /**
   * An optional icon component to be displayed alongside the option's label.
   */
  icon?: ComponentType<{ className?: string }>;
};