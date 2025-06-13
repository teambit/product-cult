import type { PlainProductVariant } from '@infinity/products.entities.product';

/**
 * Options for listing products.
 */
export type ListProductsOptions = {
  /**
   * The maximum number of products to return.
   */
  limit?: number;
  /**
   * The number of products to skip.
   */
  offset?: number;
  /**
   * Filter products by category ID.
   */
  categoryId?: string;
  /**
   * Search term for product names or descriptions.
   */
  search?: string;
};

/**
 * Options for creating a new product.
 */
export type CreateProductOptions = {
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Price of the product.
   */
  price: number;
  /**
   * Optional. Array of image URLs for the product.
   */
  imageUrls?: string[];
  /**
   * Optional. Array of video URLs for the product.
   */
  videoUrls?: string[];
  /**
   * Identifier of the product's category.
   */
  categoryId: string;
  /**
   * Optional. Array of product variants.
   */
  variants?: PlainProductVariant[];
  /**
   * Identifier of the user who submitted the product.
   */
  submitterUserId: string; // Added to include submitterUserId
};

/**
 * Options for updating an existing product.
 */
export type UpdateProductOptions = {
  /**
   * Unique identifier of the product to update.
   */
  id: string;
  /**
   * New name for the product.
   */
  name?: string;
  /**
   * New description for the product.
   */
  description?: string;
  /**
   * New price for the product.
   */
  price?: number;
  /**
   * New array of image URLs for the product.
   */
  imageUrls?: string[];
  /**
   * New array of video URLs for the product.
   */
  videoUrls?: string[];
  /**
   * New identifier for the product's category.
   */
  categoryId?: string;
  /**
   * New array of product variants.
   */
  variants?: PlainProductVariant[];
};

/**
 * Options for deleting a product.
 */
export type DeleteProductOptions = {
  /**
   * Unique identifier of the product to delete.
   */
  id: string;
};

/**
 * Options for retrieving a single product by ID.
 */
export type GetProductOptions = {
  /**
   * Unique identifier of the product to retrieve.
   */
  id: string;
};

/**
 * Options for listing product categories.
 */
export type ListProductCategoriesOptions = {
  /**
   * Optional. Filter categories.
   */
  filter?: any;
  /**
   * The maximum number of categories to return.
   */
  limit?: number;
  /**
   * The number of categories to skip.
   */
  offset?: number;
};

/**
 * Options for creating a new product category.
 */
export type CreateProductCategoryOptions = {
  /**
   * Name of the product category.
   */
  name: string;
  /**
   * Description of the product category.
   */
  description: string;
  /**
   * Optional URL for an image representing the product category.
   */
  imageUrl?: string;
};

/**
 * Options for updating an existing product category.
 */
export type UpdateProductCategoryOptions = {
  /**
   * Unique identifier of the product category to update.
   */
  id: string;
  /**
   * New name for the product category.
   */
  name?: string;
  /**
   * New description for the product category.
   */
  description?: string;
  /**
   * New URL for an image representing the product category.
   */
  imageUrl?: string;
};

/**
 * Options for deleting a product category.
 */
export type DeleteProductCategoryOptions = {
  /**
   * Unique identifier of the product category to delete.
   */
  id: string;
};

/**
 * Options for retrieving a single product category by ID.
 */
export type GetProductCategoryOptions = {
  /**
   * Unique identifier of the product category to retrieve.
   */
  id: string;
};