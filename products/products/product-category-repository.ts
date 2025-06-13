import { ReturnModelType } from '@typegoose/typegoose';
import { ProductCategoryModel, mockProductCategories } from './product-category.model.js';
import {
  CreateProductCategoryOptions,
  UpdateProductCategoryOptions,
  DeleteProductCategoryOptions,
  GetProductCategoryOptions,
  ListProductCategoriesOptions,
} from './product-options.js';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';

/**
 * Repository for managing product category data in the database.
 */
export class ProductCategoryRepository {
  constructor(private productCategoryModel: ReturnModelType<typeof ProductCategoryModel>) {}

  /**
   * Creates a new product category in the database.
   * @param options - Options for creating the product category.
   * @returns The created product category model.
   */
  async createProductCategory(options: CreateProductCategoryOptions): Promise<ProductCategoryModel> {
    const res = await this.productCategoryModel.create(options);
    return res.toObject();
  }

  /**
   * Lists product categories based on provided options.
   * @param options - Options for listing product categories.
   * @returns An array of product category models.
   */
  async listProductCategories(options?: ListProductCategoriesOptions): Promise<ProductCategoryModel[]> {
    const categories = await this.productCategoryModel
      .find(options?.filter || {})
      .skip(options?.offset || 0)
      .limit(options?.limit || 0)
      .sort({ createdAt: -1 });
    return categories.map((category) => category.toObject());
  }

  /**
   * Retrieves a single product category by its ID.
   * @param options - Options containing the category ID.
   * @returns The retrieved product category model.
   * @throws NotFound if the category does not exist.
   */
  async getProductCategory(options: GetProductCategoryOptions): Promise<ProductCategoryModel> {
    const category = await this.productCategoryModel.findOne({ id: options.id });
    if (!category) {
      throw new NotFound(`Product category with ID ${options.id} not found.`);
    }
    return category.toObject();
  }

  /**
   * Updates an existing product category.
   * @param options - Options for updating the product category.
   * @returns The updated product category model.
   * @throws NotFound if the category does not exist.
   */
  async updateProductCategory(options: UpdateProductCategoryOptions): Promise<ProductCategoryModel> {
    const { id, ...updateData } = options;
    const category = await this.productCategoryModel.findOneAndUpdate({ id }, { $set: updateData }, {
      new: true,
    });
    if (!category) {
      throw new NotFound(`Product category with ID ${id} not found.`);
    }
    return category.toObject();
  }

  /**
   * Deletes a product category by its ID.
   * @param options - Options containing the category ID to delete.
   * @returns The deleted product category model.
   * @throws NotFound if the category does not exist.
   */
  async deleteProductCategory(options: DeleteProductCategoryOptions): Promise<ProductCategoryModel> {
    const category = await this.productCategoryModel.findOneAndDelete({ id: options.id });
    if (!category) {
      throw new NotFound(`Product category with ID ${options.id} not found.`);
    }
    return category.toObject();
  }

  /**
   * Seeds the product category collection with mock data if it's empty.
   */
  async seedProductCategories() {
    const existingCategories = await this.productCategoryModel.countDocuments();
    if (existingCategories === 0) {
      await this.productCategoryModel.insertMany(mockProductCategories);
      console.log('Product category collection seeded with mock data.');
    }
  }
}