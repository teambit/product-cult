import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { ProductCard } from './product-card.js';

// Common wrapper for consistent layout in Bit workspace
const CardsContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--spacing-large, 24px)',
      padding: 'var(--spacing-large, 24px)',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}
  >
    {children}
  </div>
);

// Product Data Instances
const product1Data: PlainProduct = {
  id: 'ph-innovatesphere-ai',
  name: 'InnovateSphere AI Assistant',
  description: 'Revolutionize your workflow with our cutting-edge AI assistant. Boost productivity and creativity seamlessly.',
  price: 49.99,
  imageUrls: ["https://images.unsplash.com/photo-1615378989441-d0e0eee9979b?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aXZlJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjU5fDA&ixlib=rb-4.1.0"],
  categoryId: 'ai-tools',
  submitterUserId: 'user-alpha',
};

const product2Data: PlainProduct = {
  id: 'ph-quantumleap-design',
  name: 'QuantumLeap Design Suite',
  description: 'QuantumLeap Design Suite is the ultimate toolkit for next-generation digital artists and designers. It features a revolutionary vector engine, AI-powered image enhancement, collaborative cloud workspaces, and an extensive library of assets. Create breathtaking visuals faster than ever before. This description is intentionally long to demonstrate how the card handles text overflow and truncation.',
  price: 129.00,
  imageUrls: ["https://images.unsplash.com/photo-1654588301119-7e23237ace60?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxpbm5vdmF0aXZlJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjU5fDA&ixlib=rb-4.1.0"],
  categoryId: 'design-software',
  submitterUserId: 'user-beta',
};

const product3Data: PlainProduct = {
  id: 'ph-novasmart-hub',
  name: 'NovaSmart Home Hub',
  description: 'Control your entire smart home ecosystem with the intuitive NovaSmart Hub. Simple setup, powerful automation, and future-proof connectivity.',
  price: 79.50,
  imageUrls: [], // This will trigger the default image in ProductCard
  categoryId: 'smart-home',
  submitterUserId: 'user-gamma',
};

const product4Data: PlainProduct = {
  id: 'ph-pixelart-studio',
  name: 'PixelArt Studio Online',
  description: 'Create stunning pixel art with this intuitive and powerful web-based design tool. Perfect for game developers and artists on the go. Features real-time collaboration and cloud saving.',
  price: 29.99,
  imageUrls: ["https://images.unsplash.com/photo-1604610728890-6f4b631ed081?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxpbm5vdmF0aXZlJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjU5fDA&ixlib=rb-4.1.0"],
  categoryId: 'design-tools',
  submitterUserId: 'user-delta',
};

const productOne = Product.from(product1Data);
const productTwo = Product.from(product2Data);
const productThree = Product.from(product3Data);
const productFour = Product.from(product4Data);


export const BasicProductDisplay = () => (
  <MockProvider>
    <CardsContainer>
      <ProductCard product={productOne} />
    </CardsContainer>
  </MockProvider>
);

export const ProductWithLongDescription = () => (
  <MockProvider>
    <CardsContainer>
      <ProductCard product={productTwo} />
    </CardsContainer>
  </MockProvider>
);

export const ProductUsingDefaultImage = () => (
  <MockProvider>
    <CardsContainer>
      <ProductCard product={productThree} />
    </CardsContainer>
  </MockProvider>
);

export const MultipleProductCards = () => (
    <MockProvider>
        <CardsContainer>
            <ProductCard product={productOne} />
            <ProductCard product={productTwo} />
            <ProductCard product={productThree} />
            <ProductCard product={productFour} />
        </CardsContainer>
    </MockProvider>
);