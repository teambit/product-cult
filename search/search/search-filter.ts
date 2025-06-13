import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Props for a SearchFilter component.
 */
export type SearchFilterProps = Record<string, any>; // No specific props provided, using generic type

export type SearchFilter = {
  /**
   * name of the item.
   */
  name: string;
  /**
   * The label to display for the search filter.
   */
  label: string;
  /**
   * The React component to render for this search filter.
   */
  component: ComponentType<SearchFilterProps>;
};

export type SearchFilterSlot = SlotRegistry<SearchFilter[]>;