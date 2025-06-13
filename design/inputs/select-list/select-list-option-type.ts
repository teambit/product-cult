import type React from 'react';

/**
 * Defines the structure for an option in the SelectList component.
 * Each option must have a unique `value` and a `label` to display.
 * Options can be individually disabled and may include an optional icon.
 */
export type SelectListOption = {
  /**
   * The unique identifier for the option. This value is used in the `onChange` callback.
   */
  value: string;
  /**
   * The content displayed for the option in the dropdown and potentially in the selected display.
   * Can be a simple string or a more complex ReactNode for custom rendering.
   */
  label: React.ReactNode;
  /**
   * If true, this option cannot be selected.
   * @default false
   */
  disabled?: boolean;
  /**
   * An optional icon component to display alongside the option's label.
   */
  icon?: React.ComponentType<{ className?: string }>;
  /**
   * Allows for additional custom properties to be associated with the option,
   * which can be useful for custom `renderOption` or `renderSelectedValue` implementations.
   */
  [key: string]: any;
};