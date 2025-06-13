import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type React from 'react'; // Import React for ComponentType
// import type { Product } from '@infinity/products.entities.product'; // Changed import source

/**
 * Props for a product details tab component.
 */
export type ProductProps = {
  /**
   * The product entity for which the details tab is displayed.
   */
  productId: string;
};

export interface ProductDetailsTab {
  /**
   * name of the item.
   */
  name: string;

  /**
   * The label displayed for the product details tab.
   */
  label: string;

  /**
   * The React component to render for this product details tab.
   */
  component: React.ComponentType<ProductProps>;
}

export type ProductDetailsTabSlot = SlotRegistry<ProductDetailsTab[]>;