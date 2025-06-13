import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { LaunchCardProps } from '@infinity/launches.ui.launch-card';

export interface LaunchCard {
  /**
   * name of the item
   */
  name: string;
  /**
   * The React component to render for the launch card.
   */
  component: React.ComponentType<LaunchCardProps>;
}

export type LaunchCardSlot = SlotRegistry<LaunchCard[]>;