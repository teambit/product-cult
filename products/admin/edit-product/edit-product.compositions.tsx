import React from 'react';
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { EditProduct } from './edit-product.js';
import { type PlainProduct } from '@infinity/products.entities.product';
import { type PlainProductCategory } from '@infinity/products.entities.product-category';

// ---- IMPORTANT ASSUMPTIONS FOR MOCKING ----
// 1. `MockProvider` accepts an `apolloMocks` prop which is passed to an internal Apollo `MockedProvider`.
//    This prop is not explicitly in the provided API snippet for `MockProvider`, but is essential for mocking GraphQL hooks.
// 2. The GraphQL documents (queries/mutations) used by the hooks (`useGetProduct`, `useListProductCategories`, `useUpdateProduct`)
//    are assumed to be exported by their respective packages. If not, these mocks would need to match based on operation names
//    or another mechanism if `MockedProvider` is configured to support it.
//    For this composition, we'll use placeholder objects for these GQL documents, assuming the hooks are identifiable by them.
//    In a real scenario, you'd import the actual gql documents.

// ---- Mock Data ----
export const mockPlainCategories: PlainProductCategory[] = [
  { id: 'cat-ai', name: 'AI Innovations', description: 'Cutting-edge AI tools and platforms.' },
  { id: 'cat-dev', name: 'Developer Productivity', description: 'Tools to boost developer workflows.' },
  { id: 'cat-design', name: 'Design Resources', description: 'Assets and software for designers.' },
];

export const mockExistingPlainProduct: PlainProduct = {
  id: 'prod-alpha-123',
  name: 'AI Workflow Automator',
  description: 'Automate complex workflows using our intuitive AI-powered platform. Boost productivity and reduce manual effort significantly.',
  price: 79.99,
  categoryId: 'cat-ai',
  imageUrls: [
    'https://images.unsplash.com/photo-1649767662275-b1c8ff96cc28?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMG1hbmFnZW1lbnR8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2Mnww&ixlib=rb-4.1.0',
    'https://images.unsplash.com/photo-1649767428212-7590dbf20116?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwcHJvZHVjdCUyMG1hbmFnZW1lbnR8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2Mnww&ixlib=rb-4.1.0'
  ],
  videoUrls: ['https://www.youtube.com/watch?v=examplevideo'],
  submitterUserId: 'admin-user-001',
  variants: [
    { name: 'Basic Plan', sku: 'AIWA-BASIC', price: 79.99, imageUrls: [] },
    { name: 'Pro Plan', sku: 'AIWA-PRO', price: 149.99, imageUrls: [] },
  ],
};

export const mockUpdatedPlainProduct: PlainProduct = {
  ...mockExistingPlainProduct,
  name: 'AI Workflow Automator Pro',
  description: 'Enhanced automation for enterprise workflows. Now with more integrations!',
  price: 89.99,
  imageUrls: [
    ...(mockExistingPlainProduct.imageUrls || []),
    'https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwcHJvZHVjdCUyMG1hbmFnZW1lbnR8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2Mnww&ixlib=rb-4.1.0'
  ],
};

const EditProductPageWrapper: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return <div>Product ID is missing in route.</div>;
  return <EditProduct />;
};

export const BasicEditProductForm = () => {
  const productId = mockExistingPlainProduct.id;
  // const apolloMocks = [
  //   {
  //     request: { query: GET_PRODUCT_QUERY, variables: { id: productId } },
  //     result: { data: { getProduct: mockExistingPlainProduct } },
  //   },
  //   {
  //     request: { query: LIST_PRODUCT_CATEGORIES_QUERY, variables: {} },
  //     result: { data: { listProductCategories: mockPlainCategories } },
  //   },
  //   {
  //     request: {
  //       query: UPDATE_PRODUCT_MUTATION,
  //       variables: {
  //         id: productId,
  //         name: mockUpdatedPlainProduct.name,
  //         description: mockUpdatedPlainProduct.description,
  //         price: mockUpdatedPlainProduct.price,
  //         categoryId: mockUpdatedPlainProduct.categoryId,
  //         imageUrls: mockUpdatedPlainProduct.imageUrls,
  //         videoUrls: mockUpdatedPlainProduct.videoUrls,
  //         // variants are not part of UpdateProductOptions in the provided API, so omitting
  //       },
  //     },
  //     result: { data: { updateProduct: mockUpdatedPlainProduct } },
  //   },
  // ];

  return (
    <MockProvider>
      <InfinityTheme>
        <MemoryRouter initialEntries={[`/edit-product/${productId}`]}>
          <Routes>
            <Route path="/edit-product/:productId" element={<EditProductPageWrapper />} />
          </Routes>
        </MemoryRouter>
      </InfinityTheme>
    </MockProvider>
  );
};

export const EditProductLoadingState = () => {
  const productId = 'loading-prod-id';
  // const apolloMocks = [
  //   {
  //     request: { query: GET_PRODUCT_QUERY, variables: { id: productId } },
  //     result: { data: { getProduct: mockExistingPlainProduct } },
  //     delay: 100000, // Simulate a long delay for loading state
  //   },
  //   {
  //     request: { query: LIST_PRODUCT_CATEGORIES_QUERY, variables: {} },
  //     result: { data: { listProductCategories: mockPlainCategories } },
  //     delay: 100000,
  //   },
  // ];

  return (
    <MockProvider>
      <InfinityTheme>
        <MemoryRouter initialEntries={[`/edit-product/${productId}`]}>
          <Routes>
            <Route path="/edit-product/:productId" element={<EditProductPageWrapper />} />
          </Routes>
        </MemoryRouter>
      </InfinityTheme>
    </MockProvider>
  );
};

export const EditProductLoadErrorState = () => {
  const productId = 'error-prod-id';
  // const apolloMocks = [
  //   {
  //     request: { query: GET_PRODUCT_QUERY, variables: { id: productId } },
  //     error: new Error('Failed to fetch product details (Network Error)'),
  //   },
  //   {
  //     request: { query: LIST_PRODUCT_CATEGORIES_QUERY, variables: {} },
  //     result: { data: { listProductCategories: mockPlainCategories } },
  //   },
  // ];

  return (
    <MockProvider>
      <InfinityTheme>
        <MemoryRouter initialEntries={[`/edit-product/${productId}`]}>
          <Routes>
            <Route path="/edit-product/:productId" element={<EditProductPageWrapper />} />
          </Routes>
        </MemoryRouter>
      </InfinityTheme>
    </MockProvider>
  );
};

export const EditProductNotFoundState = () => {
  const productId = 'not-found-prod-id';
  // const apolloMocks = [
  //   {
  //     request: { query: GET_PRODUCT_QUERY, variables: { id: productId } },
  //     result: { data: { getProduct: null } }, // Product not found
  //   },
  //   {
  //     request: { query: LIST_PRODUCT_CATEGORIES_QUERY, variables: {} },
  //     result: { data: { listProductCategories: mockPlainCategories } },
  //   },
  // ];

  return (
    <MockProvider>
      <InfinityTheme>
        <MemoryRouter initialEntries={[`/edit-product/${productId}`]}>
          <Routes>
            <Route path="/edit-product/:productId" element={<EditProductPageWrapper />} />
          </Routes>
        </MemoryRouter>
      </InfinityTheme>
    </MockProvider>
  );
};