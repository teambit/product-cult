import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface DashboardPanel {
  /**
   * name of the item
   */
  name: string;

  /**
   * An optional label for the dashboard panel.
   */
  label?: string;

  /**
   * An optional weight for sorting dashboard panels. Lower numbers typically appear first.
   */
  weight?: number;

  /**
   * The React component to render within the dashboard panel.
   */
  component: ComponentType;
}

export type DashboardPanelSlot = SlotRegistry<DashboardPanel[]>;