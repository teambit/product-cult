import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { ProductList } from './product-list.js';
import { Flex } from '@infinity/design.layouts.flex';

// Mock Product Data
const mockPlainProducts: PlainProduct[] = [
  {
    id: 'tech-airpods-001',
    name: 'Minimalist Airpods',
    description:
      'Sleek white Apple Airpods with charging case. The epitome of minimalist tech for your daily audio needs.',
    price: 199.99,
    imageUrls: [
      'https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdGVjaCUyMHByb2R1Y3R8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDAzNXww&ixlib=rb-4.1.0',
    ],
    categoryId: 'audio-devices',
    submitterUserId: 'user-123',
  },
  {
    id: 'tech-poco-002',
    name: 'Vibrant Pocophone M3',
    description:
      'Eye-catching yellow Pocophone M3, combining style with performance. Shown in a flatlay with coffee beans.',
    price: 249.0,
    imageUrls: [
      'https://images.unsplash.com/photo-1615215271299-608ada121f72?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwdGVjaCUyMHByb2R1Y3R8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDAzNXww&ixlib=rb-4.1.0',
    ],
    categoryId: 'smartphones',
    submitterUserId: 'user-456',
  },
  {
    id: 'tech-gameboy-003',
    name: 'Retro Yellow Gameboy',
    description:
      'A classic Nintendo Game Boy Color in vibrant yellow. Pure retro gaming nostalgia for enthusiasts.',
    price: 99.5,
    imageUrls: [
      'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0JTIwdGVjaCUyMHByb2R1Y3R8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDAzNXww&ixlib=rb-4.1.0',
    ],
    categoryId: 'gaming-consoles',
    submitterUserId: 'user-789',
  },
  {
    id: 'tech-vw-004',
    name: 'Classic VW Beetle Model',
    description:
      'A charming white Volkswagen Beetle coupe scale model. Perfect for collectors and automotive fans.',
    price: 45.0,
    imageUrls: [
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxtaW5pbWFsaXN0JTIwdGVjaCUyMHByb2R1Y3R8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDAzNXww&ixlib=rb-4.1.0',
    ],
    categoryId: 'collectibles',
    submitterUserId: 'user-101',
  },
];

const mockProducts: Product[] = mockPlainProducts.map((p) => Product.from(p));

const CompositionWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div style={{ margin: 'var(--spacing-large)', padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-primary)', borderRadius: 'var(--borders-radius-large)' }}>
    <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>{title}</h3>
    {children}
  </div>
);


export const PopulatedProductList = () => {
  return (
    <MockProvider>
      <CompositionWrapper title="Populated Product List">
        <ProductList initialProducts={mockProducts} categoryId="all-tech" />
      </CompositionWrapper>
    </MockProvider>
  );
};

export const EmptyProductListWithCustomMessage = () => {
  const CustomEmptyState = () => (
    <Flex direction="column" alignItems="center" style={{ padding: 'var(--spacing-xlarge)', textAlign: 'center' }}>
      <img 
        src="https://images.unsplash.com/photo-1707332474972-d09ac7231426?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxtaW5pbWFsaXN0JTIwdGVjaCUyMHByb2R1Y3R8ZW58MXwyfHxvcmFuZ2V8MTc0OTYwMDAzNXww&ixlib=rb-4.1.0" 
        alt="Empty box" 
        style={{ width: '150px', height: '150px', opacity: 0.6, marginBottom: 'var(--spacing-medium)' }} 
      />
      <h4 style={{ color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)'}}>
        No Shiny Gadgets Here!
      </h4>
      <p style={{ color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)'}}>
        It seems this category is a bit lonely. Try searching for something else!
      </p>
    </Flex>
  );

  return (
    <MockProvider>
      <CompositionWrapper title="Empty Product List with Custom Message">
        <ProductList initialProducts={[]} categoryId="rare-items" emptyState={<CustomEmptyState />} />
      </CompositionWrapper>
    </MockProvider>
  );
};


export const ProductListWithCustomLoadingState = () => {
  const CustomLoadingState = () => (
     <Flex direction="column" alignItems="center" justifyContent="center" style={{ padding: 'var(--spacing-xlarge)', minHeight: '300px' }}>
      <svg width="80" height="80" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="var(--colors-primary-default)" style={{marginBottom: 'var(--spacing-medium)'}}>
          <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                  <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite"/>
                  </path>
              </g>
          </g>
      </svg>
      <p style={{ color: 'var(--colors-text-accent)', fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-large)'}}>
        Fetching the coolest new products...
      </p>
    </Flex>
  );

  return (
    <MockProvider>
       <CompositionWrapper title="Product List with Custom Loading State (Simulated)">
        {/* 
          By not providing 'initialProducts', the useListProducts hook will initially be in a loading state.
          The MockProvider includes an Apollo MockedProvider, but without specific query mocks,
          it will remain loading or might error. This is sufficient to display the loadingState prop.
        */}
        <ProductList categoryId="newly-launched" loadingState={<CustomLoadingState />} />
      </CompositionWrapper>
    </MockProvider>
  );
};