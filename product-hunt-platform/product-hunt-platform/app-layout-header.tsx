import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface AppLayoutHeader {
  /**
   * name of the item
   */
  name: string;

  /**
   * The React component to render as part of the app layout header.
   */
  component: ComponentType;
}

export type AppLayoutHeaderSlot = SlotRegistry<AppLayoutHeader[]>;