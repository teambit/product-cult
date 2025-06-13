import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface Route {
  /**
   * name of the item
   */
  name: string;

  /**
   * The URL path for this route.
   */
  path: string;

  /**
   * The React component to render when this route is matched.
   */
  component: ComponentType;
}

export type RouteSlot = SlotRegistry<Route[]>;