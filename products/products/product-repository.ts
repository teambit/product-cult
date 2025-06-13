import { ReturnModelType } from '@typegoose/typegoose';
import { ProductModel, mockProducts } from './product.model.js';
import {
  CreateProductOptions,
  UpdateProductOptions,
  DeleteProductOptions,
  GetProductOptions,
  ListProductsOptions,
} from './product-options.js';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';

/**
 * Repository for managing product data in the database.
 */
export class ProductRepository {
  constructor(private productModel: ReturnModelType<typeof ProductModel>) {}

  /**
   * Creates a new product in the database.
   * @param options - Options for creating the product.
   * @returns The created product model.
   */
  async createProduct(options: CreateProductOptions): Promise<ProductModel> {
    const res = await this.productModel.create({
      ...options,
      // variants are already PlainProductVariant[] from options
    });
    return res.toObject();
  }

  /**
   * Lists products based on provided options.
   * @param options - Options for listing products.
   * @returns An array of product models.
   */
  async listProducts(options?: ListProductsOptions): Promise<ProductModel[]> {
    const query: any = {};
    if (options?.categoryId) {
      query.categoryId = options.categoryId;
    }
    if (options?.search) {
      query.$or = [
        { name: { $regex: options.search, $options: 'i' } },
        { description: { $regex: options.search, $options: 'i' } },
      ];
    }

    const products = await this.productModel
      .find(query)
      .skip(options?.offset || 0)
      .limit(options?.limit || 0)
      .sort({ createdAt: -1 });
    return products.map((product) => product.toObject());
  }

  /**
   * Retrieves a single product by its ID.
   * @param options - Options containing the product ID.
   * @returns The retrieved product model.
   * @throws NotFound if the product does not exist.
   */
  async getProduct(options: GetProductOptions): Promise<ProductModel> {
    const product = await this.productModel.findOne({ id: options.id });
    if (!product) {
      throw new NotFound(`Product with ID ${options.id} not found.`);
    }
    return product.toObject();
  }

  /**
   * Updates an existing product.
   * @param options - Options for updating the product.
   * @returns The updated product model.
   * @throws NotFound if the product does not exist.
   */
  async updateProduct(options: UpdateProductOptions): Promise<ProductModel> {
    const { id, ...updateData } = options;
    const product = await this.productModel.findOneAndUpdate({ id }, { $set: updateData }, {
      new: true,
    });
    if (!product) {
      throw new NotFound(`Product with ID ${id} not found.`);
    }
    return product.toObject();
  }

  /**
   * Deletes a product by its ID.
   * @param options - Options containing the product ID to delete.
   * @returns The deleted product model.
   * @throws NotFound if the product does not exist.
   */
  async deleteProduct(options: DeleteProductOptions): Promise<ProductModel> {
    const product = await this.productModel.findOneAndDelete({ id: options.id });
    if (!product) {
      throw new NotFound(`Product with ID ${options.id} not found.`);
    }
    return product.toObject();
  }

  /**
   * Seeds the product collection with mock data if it's empty.
   */
  async seedProducts() {
    const existingProducts = await this.productModel.countDocuments();
    if (existingProducts === 0) {
      await this.productModel.insertMany(mockProducts);
      console.log('Product collection seeded with mock data.');
    }
  }
}