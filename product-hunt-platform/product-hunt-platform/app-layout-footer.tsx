import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface AppLayoutFooter {
  /**
   * name of the item
   */
  name: string;

  /**
   * The React component to render as part of the app layout footer.
   */
  component: ComponentType;
}

export type AppLayoutFooterSlot = SlotRegistry<AppLayoutFooter[]>;