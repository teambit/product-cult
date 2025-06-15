import type { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { ProductsNode } from './products.node.runtime.js';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

export function productsGqlSchema(productsNode: ProductsNode): GqlSchema {
  return {
    typeDefs: gql`
      type Query {
        """
        Lists products based on provided options.
        """
        listProducts(options: ListProductsOptionsInput): [Product]
        """
        Retrieves a product by ID.
        """
        getProduct(options: GetProductOptionsInput!): Product
        """
        Lists product categories based on provided options.
        """
        listProductCategories(options: ListProductCategoriesOptionsInput): [ProductCategory]
        """
        Retrieves a product category by ID.
        """
        getProductCategory(options: GetProductCategoryOptionsInput!): ProductCategory
      }

      type Mutation {
        """
        Creates a new product.
        """
        createProduct(options: CreateProductOptionsInput!): Product
        """
        Updates an existing product.
        """
        updateProduct(options: UpdateProductOptionsInput!): Product
        """
        Deletes a product.
        """
        deleteProduct(options: DeleteProductOptionsInput!): Product
        """
        Creates a new product category.
        """
        createProductCategory(options: CreateProductCategoryOptionsInput!): ProductCategory
        """
        Updates an existing product category.
        """
        updateProductCategory(options: UpdateProductCategoryOptionsInput!): ProductCategory
        """
        Deletes a product category.
        """
        deleteProductCategory(options: DeleteProductCategoryOptionsInput!): ProductCategory
      }

      type Product {
        id: String!
        name: String!
        description: String!
        price: Float!
        imageUrls: [String]
        videoUrls: [String]
        categoryId: String!
        variants: [ProductVariant]
        submitterUserId: String! # Added to reflect the model and entity
      }

      type ProductVariant {
        name: String!
        sku: String!
        price: Float!
        imageUrls: [String]
      }

      type ProductCategory {
        id: String!
        name: String!
        description: String!
        imageUrl: String
      }

      input ListProductsOptionsInput {
        limit: Int
        offset: Int
        categoryId: String
        search: String
        userId: String
      }

      input CreateProductOptionsInput {
        name: String!
        description: String!
        price: Float!
        imageUrls: [String]
        videoUrls: [String]
        categoryId: String!
        variants: [ProductVariantInput]
        # submitterUserId is handled by the resolver context (logged-in user)
      }

      input UpdateProductOptionsInput {
        id: String!
        name: String
        description: String
        price: Float
        imageUrls: [String]
        videoUrls: [String]
        categoryId: String
        variants: [ProductVariantInput]
      }

      input DeleteProductOptionsInput {
        id: String!
      }

      input GetProductOptionsInput {
        id: String!
      }

      input ListProductCategoriesOptionsInput {
        limit: Int
        offset: Int
        # filter: Add if needed, for now simple list
      }

      input CreateProductCategoryOptionsInput {
        name: String!
        description: String!
        imageUrl: String
      }

      input UpdateProductCategoryOptionsInput {
        id: String!
        name: String
        description: String
        imageUrl: String
      }

      input GetProductCategoryOptionsInput {
        id: String!
      }

      input DeleteProductCategoryOptionsInput {
        id: String!
      }

      input ProductVariantInput {
        name: String!
        sku: String!
        price: Float!
        imageUrls: [String]
      }
    `,
    resolvers: {
      Query: {
        listProducts: async (obj, { options }, context) => {
          return productsNode.listProducts(options, context.session?.user);
        },
        getProduct: async (obj, { options }, context) => {
          return productsNode.getProduct(options, context.session?.user);
        },
        listProductCategories: async (obj, { options }, context) => {
          return productsNode.listProductCategories(options, context.session?.user);
        },
        getProductCategory: async (obj, { options }, context) => {
          return productsNode.getProductCategory(options, context.session?.user);
        },
      },
      Mutation: {
        createProduct: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to create a product.');
          return productsNode.createProduct(options, user);
        },
        updateProduct: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to update a product.');
          return productsNode.updateProduct(options, user);
        },
        deleteProduct: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to delete a product.');
          return productsNode.deleteProduct(options, user);
        },
        createProductCategory: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to create a product category.');
          return productsNode.createProductCategory(options, user);
        },
        updateProductCategory: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to update a product category.');
          return productsNode.updateProductCategory(options, user);
        },
        deleteProductCategory: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('User must be logged in to delete a product category.');
          return productsNode.deleteProductCategory(options, user);
        },
      },
      // Resolver for Product.submitterUserId if needed, but it's a direct mapping from the entity
      // Product: {
      //   submitterUserId: (productEntity) => productEntity.submitterUserId,
      // },
    },
  };
}