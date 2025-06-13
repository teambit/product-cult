import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { UserProductsTab } from './user-products-tab.js';

// Mock Product Data
const allMockPlainProducts: PlainProduct[] = [
  {
    id: 'prod-ai-manager-u123',
    name: 'AI Task Organizer Pro',
    description: 'Intelligent task management powered by advanced AI. Organizes your complex projects and daily life effortlessly and efficiently.',
    price: 49.99,
    imageUrls: ['https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&w=600&h=400&fit=crop'],
    categoryId: 'productivity-tools',
    submitterUserId: 'user-123',
  },
  {
    id: 'prod-cloud-storage-u123',
    name: 'Secure Infinite Cloud Drive',
    description: 'Unlimited secure cloud storage with cutting-edge sharing features, real-time collaboration, and robust version history.',
    price: 19.99,
    imageUrls: ['https://images.unsplash.com/photo-1585247220041-3910109804f7?ixlib=rb-4.0.3&w=600&h=400&fit=crop'],
    categoryId: 'cloud-software',
    submitterUserId: 'user-123',
  },
  {
    id: 'prod-vr-headset-u123',
    name: 'Immersive VR Headset Nova',
    description: 'Next-generation VR headset for hyper-realistic gaming and breathtaking virtual experiences. Features a crystal clear 4K display per eye.',
    price: 399.00,
    imageUrls: ['https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&w=600&h=400&fit=crop'],
    categoryId: 'gaming-hardware',
    submitterUserId: 'user-123',
  },
  { // This product is for a different user, won't show up for user-123
    id: 'prod-smart-watch-u456',
    name: 'Fitness Smart Watch Elite',
    description: 'Track all your fitness goals and health metrics with this advanced smart watch. Includes ECG, SpO2, GPS, and sleep tracking.',
    price: 249.50,
    imageUrls: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&w=600&h=400&fit=crop'],
    categoryId: 'wearable-tech',
    submitterUserId: 'user-456',
  },
];

const allMockProducts: Product[] = allMockPlainProducts.map(p => Product.from(p));
const productsForUser123: Product[] = allMockProducts.filter(p => p.submitterUserId === 'user-123');

// Wrapper for consistent styling of compositions
const CompositionWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div style={{ 
    margin: 'var(--spacing-large, 24px)', 
    padding: 'var(--spacing-large, 24px)', 
    backgroundColor: 'var(--colors-surface-primary, #f8f9fa)', 
    borderRadius: 'var(--borders-radius-large, 12px)',
    boxShadow: 'var(--effects-shadows-medium, 0 4px 6px rgba(0,0,0,0.1))'
  }}>
    <h3 style={{ 
      fontFamily: 'var(--typography-font-family, sans-serif)', 
      color: 'var(--colors-text-primary, #212529)', 
      marginBottom: 'var(--spacing-medium, 16px)',
      fontSize: 'var(--typography-sizes-heading-h3, 1.75rem)',
      borderBottom: '1px solid var(--colors-border-subtle, #dee2e6)',
      paddingBottom: 'var(--spacing-small, 8px)'
    }}>
      {title}
    </h3>
    {children}
  </div>
);

/**
 * Composition demonstrating the UserProductsTab displaying a list of products
 * submitted by a specific user.
 */
export const BasicUserProductsTab = () => (
  <MockProvider>
    <CompositionWrapper title="User 'user-123' Submitted Products">
      <UserProductsTab userId="user-123" mockProducts={productsForUser123} />
    </CompositionWrapper>
  </MockProvider>
);

/**
 * Composition demonstrating the UserProductsTab with a custom empty state message
 * when the user has not submitted any products.
 */
export const EmptyUserProductsTab = () => (
  <MockProvider>
    <CompositionWrapper title="User 'user-789' - No Products Submitted">
      <UserProductsTab
        userId="user-789" // A user ID that presumably has no products
        mockProducts={[]} // Explicitly pass empty array for mockProducts
        customProductListEmptyState={
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xlarge, 32px)' }}>
            <h4 style={{ 
              color: 'var(--colors-text-primary, #343a40)', 
              fontFamily: 'var(--typography-font-family, sans-serif)',
              fontSize: 'var(--typography-sizes-heading-h4, 1.5rem)',
              marginBottom: 'var(--spacing-small, 8px)'
            }}>
              Nothing to See Here!
            </h4>
            <p style={{ 
              color: 'var(--colors-text-secondary, #6c757d)', 
              fontFamily: 'var(--typography-font-family, sans-serif)',
              fontSize: 'var(--typography-sizes-body-default, 1rem)'
            }}>
              This user hasn't shared any products with the community yet.
            </p>
          </div>
        }
      />
    </CompositionWrapper>
  </MockProvider>
);

/**
 * Composition demonstrating the UserProductsTab with a custom loading message.
 * This relies on MockProvider not having a specific mock for the listProducts query,
 * causing the useListProducts hook to remain in a loading state.
 */
export const LoadingUserProductsTab = () => (
  <MockProvider>
    <CompositionWrapper title="Simulating Loading State for User Products">
      <UserProductsTab
        userId="user-loading-state" // Unique ID to ensure it doesn't hit a cache
        // No mockProducts prop provided, so useListProducts will attempt to fetch.
        loadingMessage={
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xlarge, 32px)' }}>
            <p style={{
              fontFamily: 'var(--typography-font-family, sans-serif)',
              fontSize: 'var(--typography-sizes-body-large, 1.25rem)',
              color: 'var(--colors-text-accent, #007bff)',
              fontWeight: 'var(--typography-font-weight-medium, 500)'
            }}>
              Fetching awesome products, please hang tight...
            </p>
            {/* A simple SVG spinner could be added here for better visual feedback */}
          </div>
        }
      />
    </CompositionWrapper>
  </MockProvider>
);

/**
 * Composition demonstrating the UserProductsTab with a custom error message.
 * This relies on MockProvider not having a specific mock that resolves successfully
 * for the listProducts query, potentially leading to an error state from useListProducts.
 */
export const ErrorStateUserProductsTab = () => (
  <MockProvider>
    <CompositionWrapper title="Simulating Error State for User Products">
      <UserProductsTab
        userId="user-error-state" // Unique ID
        // No mockProducts prop provided.
        errorMessage={
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--spacing-large, 24px)', 
            border: `2px solid var(--colors-status-negative-default, #dc3545)`, 
            borderRadius: 'var(--borders-radius-medium, 8px)',
            backgroundColor: 'var(--colors-status-negative-subtle, #f8d7da)'
          }}>
            <h4 style={{ 
              color: 'var(--colors-status-negative-default, #721c24)', 
              fontFamily: 'var(--typography-font-family, sans-serif)',
              fontSize: 'var(--typography-sizes-heading-h4, 1.5rem)',
              marginBottom: 'var(--spacing-small, 8px)'
            }}>
              Oops! Something Went Wrong.
            </h4>
            <p style={{ 
              color: 'var(--colors-text-secondary, #6c757d)', 
              fontFamily: 'var(--typography-font-family, sans-serif)',
              fontSize: 'var(--typography-sizes-body-default, 1rem)'
            }}>
              We encountered an issue while trying to fetch products for this user. Please try again later or contact support.
            </p>
          </div>
        }
      />
    </CompositionWrapper>
  </MockProvider>
);