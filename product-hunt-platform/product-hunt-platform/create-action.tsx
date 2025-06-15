import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

export interface CreateAction {
  /**
   * name of the item
   */
  name: string;

  /**
   * The text label for the action.
   */
  label: string;

  /**
   * An optional weight for sorting create actions. Lower numbers typically appear first.
   */
  weight?: number;

  /**
   * An optional icon component to display for the action.
   */
  icon?: ComponentType;
}

export type CreateActionSlot = SlotRegistry<CreateAction[]>;