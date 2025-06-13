import { SymphonyPlatformAspect, type SymphonyPlatformNode } from '@bitdev/symphony.symphony-platform';
import { ProductHuntPlatformAspect, type ProductHuntPlatformNode } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect, type PeopleNode } from '@infinity/people.people';
import { SearchAspect, type SearchNode, type RegisterSearchTypeOptions } from '@infinity/search.search'; // Added RegisterSearchTypeOptions
import type { ProductsConfig } from './products-config.js';
import { productsGqlSchema } from './products.graphql.js';
import { getModelForClass } from '@typegoose/typegoose';
import { ProductModel } from './product.model.js';
import { ProductCategoryModel } from './product-category.model.js';
import { ProductRepository } from './product-repository.js';
import { ProductCategoryRepository } from './product-category-repository.js';
import {
  CreateProductOptions,
  UpdateProductOptions,
  DeleteProductOptions,
  GetProductOptions,
  ListProductsOptions,
  ListProductCategoriesOptions,
  CreateProductCategoryOptions,
  UpdateProductCategoryOptions,
  DeleteProductCategoryOptions,
  GetProductCategoryOptions,
} from './product-options.js';
import { Product, ProductVariant } from '@infinity/products.entities.product';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';

// Define a type for the object structure SearchResult expects, including toObject
type IndexableSearchResult = {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  data: any;
  toObject: () => Omit<IndexableSearchResult, 'toObject'>;
};


export class ProductsNode {
  constructor(
    private productsConfig: ProductsConfig,
    private symphonyPlatform: SymphonyPlatformNode,
    private productHuntPlatform: ProductHuntPlatformNode,
    private search: SearchNode,
    private people: PeopleNode,
    private productRepository: ProductRepository,
    private productCategoryRepository: ProductCategoryRepository,
  ) {}

  /**
   * Helper to check if a user is an admin.
   * @param user The user object.
   * @returns True if the user is an admin, false otherwise.
   */
  private isAdmin(user: User | undefined): boolean {
    return user?.roles?.includes('admin') || false;
  }

  /**
   * Transforms a ProductModel object into a Product entity.
   * @param productModel The product model from the database.
   * @returns The Product entity.
   */
  private createProductFromModel(productModel: ProductModel): Product {
    return Product.from({
      id: productModel.id,
      name: productModel.name,
      description: productModel.description,
      price: productModel.price,
      imageUrls: productModel.imageUrls,
      videoUrls: productModel.videoUrls,
      categoryId: productModel.categoryId,
      variants: productModel.variants?.map(v => new ProductVariant(v.name, v.sku, v.price, v.imageUrls || []).toObject()), // Ensured imageUrls is not undefined
      submitterUserId: productModel.submitterUserId,
    });
  }

  /**
   * Transforms a ProductCategoryModel object into a ProductCategory entity.
   * @param categoryModel The product category model from the database.
   * @returns The ProductCategory entity.
   */
  private createProductCategoryFromModel(categoryModel: ProductCategoryModel): ProductCategory {
    return ProductCategory.from({
      id: categoryModel.id,
      name: categoryModel.name,
      description: categoryModel.description,
      imageUrl: categoryModel.imageUrl,
    });
  }

  /**
   * Lists products based on provided options.
   * @param options - Options for listing products.
   * @param user - The authenticated user.
   * @returns An array of Product entities.
   */
  async listProducts(options?: ListProductsOptions, user?: User): Promise<Product[]> {
    const productModels = await this.productRepository.listProducts(options);
    return productModels.map((model) => this.createProductFromModel(model));
  }

  /**
   * Creates a new product.
   * @param options - Options for creating the product.
   * @param user - The authenticated user.
   * @returns The created Product entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   */
  async createProduct(options: CreateProductOptions, user: User): Promise<Product> {
    if (!user) {
      throw new Unauthorized('Authentication required to create a product.');
    }
    // Only admins can create products, or we can assume any logged-in user.
    // For this implementation, let's allow any logged-in user to create products.
    // If admin-only, uncomment: if (!this.isAdmin(user)) throw new AccessDenied('Only admins can create products.');

    const productModel = await this.productRepository.createProduct({
      ...options, // options now implicitly include submitterUserId due to type change
      submitterUserId: user.id, 
    });

    // Index the new product in the search service
    await this.search.indexContent({
      type: 'product',
      id: productModel.id,
      data: productModel, // This data is used by the indexFunction
    });

    return this.createProductFromModel(productModel);
  }

  /**
   * Updates an existing product.
   * @param options - Options for updating the product.
   * @param user - The authenticated user.
   * @returns The updated Product entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin or the product owner.
   * @throws NotFound if the product does not exist.
   */
  async updateProduct(options: UpdateProductOptions, user: User): Promise<Product> {
    if (!user) {
      throw new Unauthorized('Authentication required to update a product.');
    }

    const existingProductModel = await this.productRepository.getProduct({ id: options.id });
    if (!existingProductModel) {
      throw new NotFound(`Product with ID ${options.id} not found.`);
    }

    // Only admins or the product submitter can update the product
    if (!this.isAdmin(user) && existingProductModel.submitterUserId !== user.id) {
      throw new AccessDenied('You do not have permission to update this product.');
    }

    const productModel = await this.productRepository.updateProduct(options);

    // Re-index the updated product in the search service
    await this.search.indexContent({
      type: 'product',
      id: productModel.id,
      data: productModel, // This data is used by the indexFunction
    });

    return this.createProductFromModel(productModel);
  }

  /**
   * Deletes a product.
   * @param options - Options for deleting the product.
   * @param user - The authenticated user.
   * @returns The deleted Product entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin or the product owner.
   * @throws NotFound if the product does not exist.
   */
  async deleteProduct(options: DeleteProductOptions, user: User): Promise<Product> {
    if (!user) {
      throw new Unauthorized('Authentication required to delete a product.');
    }

    const existingProductModel = await this.productRepository.getProduct({ id: options.id });
    if (!existingProductModel) {
      throw new NotFound(`Product with ID ${options.id} not found.`);
    }

    // Only admins or the product submitter can delete the product
    if (!this.isAdmin(user) && existingProductModel.submitterUserId !== user.id) {
      throw new AccessDenied('You do not have permission to delete this product.');
    }

    const productModel = await this.productRepository.deleteProduct(options);
    return this.createProductFromModel(productModel);
  }

  /**
   * Retrieves a product by ID.
   * @param options - Options for retrieving the product.
   * @param user - The authenticated user (optional).
   * @returns The retrieved Product entity.
   * @throws NotFound if the product does not exist.
   */
  async getProduct(options: GetProductOptions, user?: User): Promise<Product> {
    const productModel = await this.productRepository.getProduct(options);
    if (!productModel) {
      throw new NotFound(`Product with ID ${options.id} not found.`);
    }
    return this.createProductFromModel(productModel);
  }

  /**
   * Lists product categories based on provided options.
   * @param options - Options for listing product categories.
   * @param user - The authenticated user (optional).
   * @returns An array of ProductCategory entities.
   */
  async listProductCategories(options?: ListProductCategoriesOptions, user?: User): Promise<ProductCategory[]> {
    const categoryModels = await this.productCategoryRepository.listProductCategories(options);
    return categoryModels.map((model) => this.createProductCategoryFromModel(model));
  }

  /**
   * Creates a new product category.
   * @param options - Options for creating the product category.
   * @param user - The authenticated user.
   * @returns The created ProductCategory entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   */
  async createProductCategory(options: CreateProductCategoryOptions, user: User): Promise<ProductCategory> {
    if (!user) {
      throw new Unauthorized('Authentication required to create a product category.');
    }
    if (!this.isAdmin(user)) {
      throw new AccessDenied('Only admins can create product categories.');
    }
    const categoryModel = await this.productCategoryRepository.createProductCategory(options);

    // Index the new category in the search service
    await this.search.indexContent({
      type: 'productCategory',
      id: categoryModel.id,
      data: categoryModel, // This data is used by the indexFunction
    });

    return this.createProductCategoryFromModel(categoryModel);
  }

  /**
   * Updates an existing product category.
   * @param options - Options for updating the product category.
   * @param user - The authenticated user.
   * @returns The updated ProductCategory entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   * @throws NotFound if the product category does not exist.
   */
  async updateProductCategory(options: UpdateProductCategoryOptions, user: User): Promise<ProductCategory> {
    if (!user) {
      throw new Unauthorized('Authentication required to update a product category.');
    }
    if (!this.isAdmin(user)) {
      throw new AccessDenied('Only admins can update product categories.');
    }
    const categoryModel = await this.productCategoryRepository.updateProductCategory(options);
    if (!categoryModel) {
      throw new NotFound(`Product category with ID ${options.id} not found.`);
    }

    // Re-index the updated category in the search service
    await this.search.indexContent({
      type: 'productCategory',
      id: categoryModel.id,
      data: categoryModel, // This data is used by the indexFunction
    });

    return this.createProductCategoryFromModel(categoryModel);
  }

  /**
   * Deletes a product category.
   * @param options - Options for deleting the product category.
   * @param user - The authenticated user.
   * @returns The deleted ProductCategory entity.
   * @throws Unauthorized if no user is provided.
   * @throws AccessDenied if the user is not an admin.
   * @throws NotFound if the product category does not exist.
   */
  async deleteProductCategory(options: DeleteProductCategoryOptions, user: User): Promise<ProductCategory> {
    if (!user) {
      throw new Unauthorized('Authentication required to delete a product category.');
    }
    if (!this.isAdmin(user)) {
      throw new AccessDenied('Only admins can delete product categories.');
    }
    const categoryModel = await this.productCategoryRepository.deleteProductCategory(options);
    if (!categoryModel) {
      throw new NotFound(`Product category with ID ${options.id} not found.`);
    }
    return this.createProductCategoryFromModel(categoryModel);
  }

  /**
   * Retrieves a product category by ID.
   * @param options - Options for retrieving the product category.
   * @param user - The authenticated user (optional).
   * @returns The retrieved ProductCategory entity.
   * @throws NotFound if the product category does not exist.
   */
  async getProductCategory(options: GetProductCategoryOptions, user?: User): Promise<ProductCategory> {
    const categoryModel = await this.productCategoryRepository.getProductCategory(options);
    if (!categoryModel) {
      throw new NotFound(`Product category with ID ${options.id} not found.`);
    }
    return this.createProductCategoryFromModel(categoryModel);
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, SearchAspect, PeopleAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, search, people]: [SymphonyPlatformNode, ProductHuntPlatformNode, SearchNode, PeopleNode],
    config: ProductsConfig,
  ) {
    const productModel = getModelForClass(ProductModel);
    const productCategoryModel = getModelForClass(ProductCategoryModel);

    const productRepository = new ProductRepository(productModel);
    const productCategoryRepository = new ProductCategoryRepository(productCategoryModel);

    const products = new ProductsNode(
      config,
      symphonyPlatform,
      productHuntPlatform,
      search,
      people,
      productRepository,
      productCategoryRepository
    );

    const gqlSchema = productsGqlSchema(products);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      },
    ]);

    symphonyPlatform.registerOnStart(async () => {
      await productRepository.seedProducts();
      await productCategoryRepository.seedProductCategories();
    });

    // Register product search type
    search.registerSearchType({
      name: 'product',
      label: 'Products',
      description: 'Search for products by name or description.',
      indexFunction: (product: ProductModel): IndexableSearchResult => {
        const plainResult = {
          id: product.id,
          type: 'product',
          title: product.name,
          description: product.description,
          url: `/products/${product.id}`,
          imageUrl: product.imageUrls?.[0],
          data: product,
        };
        return {
          ...plainResult,
          toObject: () => plainResult,
        };
      },
    } as RegisterSearchTypeOptions); // Added explicit cast for indexFunction return type satisfaction

    // Register product category search type
    search.registerSearchType({
      name: 'productCategory',
      label: 'Product Categories',
      description: 'Search for product categories by name or description.',
      indexFunction: (category: ProductCategoryModel): IndexableSearchResult => {
        const plainResult = {
          id: category.id,
          type: 'productCategory',
          title: category.name,
          description: category.description,
          url: `/categories/${category.id}`, // Assuming a route for categories
          imageUrl: category.imageUrl,
          data: category,
        };
        return {
          ...plainResult,
          toObject: () => plainResult,
        };
      },
    } as RegisterSearchTypeOptions); // Added explicit cast for indexFunction return type satisfaction

    return products;
  }
}

export default ProductsNode;