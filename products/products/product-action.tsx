import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type React from 'react'; // Import React for ComponentType

/**
 * Props for a product action component.
 */
export type ProductActionProps = {
  /**
   * The ID of the product for which the action is being performed.
   */
  productId: string;
};

export interface ProductAction {
  /**
   * name of the item.
   */
  name: string;

  /**
   * The React component to render for this product action.
   */
  component: React.ComponentType<ProductActionProps>;
}

export type ProductActionSlot = SlotRegistry<ProductAction[]>;