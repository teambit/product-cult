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

  /**
   * If true, the path will only match if the path is exactly the route's path.
   */
  exact?: boolean;
}

export type RouteSlot = SlotRegistry<Route[]>;