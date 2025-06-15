import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface AuthRoute {
  /**
   * name of the item
   */
  name: string;

  /**
   * The URL path for this authentication route.
   */
  path: string;

  /**
   * The React component to render when this authentication route is matched.
   */
  component: ComponentType;

  /**
   * If true, the path will only match if the path is exactly the route's path.
   */
  exact?: boolean;

  /**
   * The path to redirect to if the user is not authenticated.
   */
  redirectTo: string;
}

export type AuthRouteSlot = SlotRegistry<AuthRoute[]>;