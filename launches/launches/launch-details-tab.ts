import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ProductProps as ProductsProductProps } from '@infinity/products.products';

export interface LaunchDetailsTab {
  /**
   * name of the item
   */
  name: string;
  /**
   * The display label for the tab.
   */
  label: string;
  /**
   * The React component to render for the tab content.
   */
  component: React.ComponentType<ProductsProductProps>;
}

export type LaunchDetailsTabSlot = SlotRegistry<LaunchDetailsTab[]>;