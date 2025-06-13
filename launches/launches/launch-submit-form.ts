import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { CreateLaunchPageProps } from '@infinity/launches.admin.create-launch';

export interface LaunchSubmitForm {
  /**
   * name of the item
   */
  name: string;
  /**
   * The React component for the launch submission form.
   */
  component: React.ComponentType<CreateLaunchPageProps>;
}

export type LaunchSubmitFormSlot = SlotRegistry<LaunchSubmitForm[]>;