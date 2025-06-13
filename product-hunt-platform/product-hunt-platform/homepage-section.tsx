import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface HomepageSection {
  /**
   * name of the item
   */
  name: string;

  /**
   * The React component to render for this homepage section.
   */
  component: ComponentType;

  /**
   * An optional weight for sorting homepage sections. Lower numbers typically appear first.
   */
  weight?: number;
}

export type HomepageSectionSlot = SlotRegistry<HomepageSection[]>;