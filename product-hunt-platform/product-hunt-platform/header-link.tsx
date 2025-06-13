import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface HeaderLink {
  /**
   * name of the item
   */
  name: string;

  /**
   * An optional weight for sorting header links. Lower numbers typically appear first.
   */
  weight?: number;

  /**
   * The text label to display for the link.
   */
  label: string;

  /**
   * The URL or path the link should navigate to.
   */
  href: string;

  /**
   * If true, the link will be treated as an external link.
   */
  external?: boolean;

  /**
   * Optional icon component to display next to the link label.
   */
  icon?: ComponentType;

  /**
   * Indicates if the header link should only be visible to authenticated users.
   */
  authenticated?: boolean;
}

export type HeaderLinkSlot = SlotRegistry<HeaderLink[]>;