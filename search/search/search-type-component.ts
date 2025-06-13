import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Props for a SearchTypeComponent.
 */
export type SearchTypeComponentProps = Record<string, any>; // No specific props provided, using generic type

export type SearchTypeComponent = {
  /**
   * name of the item.
   */
  name: string;
  /**
   * The React component to render for this search type.
   */
  component: ComponentType<SearchTypeComponentProps>;
};

export type SearchTypeComponentSlot = SlotRegistry<SearchTypeComponent[]>;