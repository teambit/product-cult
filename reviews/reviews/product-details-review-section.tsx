import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ComponentType } from 'react';

/**
 * Represents a section to be displayed on a product details page specifically for reviews.
 */
export interface ProductDetailsReviewSection {
  /**
   * Unique name for the product details review section.
   */
  name: string;

  /**
   * The React component to render for this review section.
   */
  component: ComponentType<any>;
}

export type ProductDetailsReviewSectionSlot = SlotRegistry<ProductDetailsReviewSection[]>;