import type { SlotRegistry } from '@bitdev/harmony.harmony';

/**
 * Props for a launch list filter component.
 */
export type LaunchListFilterProps = {
  /**
   * Optional CSS class name for the filter component.
   */
  className?: string;
  /**
   * Optional inline styles for the filter component.
   */
  style?: React.CSSProperties;
};

export interface LaunchListFilter {
  /**
   * name of the item
   */
  name: string;
  /**
   * The React component to render as a filter for the launch list.
   */
  component: React.ComponentType<LaunchListFilterProps>;
}

export type LaunchListFilterSlot = SlotRegistry<LaunchListFilter[]>;