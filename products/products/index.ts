import { ProductsAspect } from './products.aspect.js';

export type { ProductsConfig } from './products-config.js';
export type { ProductAction, ProductActionProps, ProductActionSlot } from './product-action.js';
export type { ProductDetailsTab, ProductDetailsTabSlot, ProductProps } from './product-details-tab.js';
export type { ProductModel } from './product.model.js';
export type { ProductCategoryModel } from './product-category.model.js';
export type { ListProductsOptions, CreateProductOptions, UpdateProductOptions, DeleteProductOptions, GetProductOptions, ListProductCategoriesOptions, CreateProductCategoryOptions, UpdateProductCategoryOptions, DeleteProductCategoryOptions, GetProductCategoryOptions } from './product-options.js';
export type { ProductsBrowser } from './products.browser.runtime.js';
export type { ProductsNode } from './products.node.runtime.js';

export default ProductsAspect;
export { ProductsAspect };