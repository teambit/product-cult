import type { SlotRegistry } from '@bitdev/harmony.harmony';
import { Launch } from '@infinity/launches.entities.launch';
// import type { ProductActionProps } from '@infinity/launches.products.track-launch-button';

export interface LaunchAction {
  /**
   * name of the item
   */
  name: string;
  /**
   * The React component to render for the launch action.
   */
  component: React.ComponentType<{ launch: Launch }>;
}

export type LaunchActionSlot = SlotRegistry<LaunchAction[]>;
