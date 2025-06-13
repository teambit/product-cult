import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { ProductDetailPage } from './product-detail-page.js';

const mockPlainProduct1: PlainProduct = {
  id: 'prod-123',
  name: 'InnovateAI Platform',
  description:
    'A cutting-edge platform leveraging AI to streamline product development cycles, from ideation to launch. Features include predictive analytics, automated user feedback analysis, and AI-assisted design tools. Discover how InnovateAI can transform your workflow and help you build better products faster.',
  price: 299.99,
  imageUrls: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkJTIwdWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  ],
  videoUrls: [],
  categoryId: 'ai-software',
  submitterUserId: 'user-jane-doe',
  variants: [
    { name: 'Basic Tier', sku: 'INNOAI-BASIC', price: 299.99, imageUrls: [] },
    { 
      name: 'Pro Tier', 
      sku: 'INNOAI-PRO', 
      price: 599.99, 
      imageUrls: ['https://images.unsplash.com/photo-1617289746955-a58c1799a6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3QlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60']
    },
  ],
};
const mockProduct1 = Product.from(mockPlainProduct1);

const mockPlainProduct2: PlainProduct = {
  id: 'prod-789-long',
  name: 'QuantumLeap CRM Suite - Enterprise Edition with Extended Features and Support',
  description:
    'QuantumLeap CRM Suite redefines customer relationship management for large-scale enterprises. This edition offers an extensive array of features including advanced sales automation, multi-channel marketing campaign management, AI-driven customer insights, customizable reporting dashboards, and seamless integration with hundreds of third-party applications. Built for scalability and security, QuantumLeap ensures your business can manage complex customer interactions efficiently while providing personalized experiences. Our dedicated enterprise support team provides 24/7 assistance and onboarding services to ensure a smooth transition and optimal utilization of the platform. Experience the future of CRM with QuantumLeap and empower your teams to build lasting customer relationships and drive unprecedented growth. Additional modules for project management and HR are also available.',
  price: 1999.00,
  imageUrls: [
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  ],
  videoUrls: [],
  categoryId: 'crm-enterprise',
  submitterUserId: 'user-crm-expert',
  variants: [],
};
const mockProductLongDescription = Product.from(mockPlainProduct2);


export const DisplaysProductSuccessfully = () => {
  return (
    <MockProvider>
      <ProductDetailPage productId="prod-123" mockProductData={mockProduct1} />
    </MockProvider>
  );
};

export const DisplaysProductWithLongDescription = () => {
  return (
    <MockProvider>
      <ProductDetailPage productId="prod-789-long" mockProductData={mockProductLongDescription} />
    </MockProvider>
  );
};


export const DisplaysProductNotFound = () => {
  // Assuming that if mockProductData is undefined, the hook will return product as undefined
  // and the component will show its "Product not found" UI.
  return (
    <MockProvider>
      <ProductDetailPage productId="non-existent-id" mockProductData={undefined} />
    </MockProvider>
  );
};

export const DisplaysLoadingOrErrorState = () => {
  // This composition does NOT pass mockProductData.
  // If ProductDetailPage.tsx has `{ mockData: mockProductData }`, then the hook gets `mockData: undefined`.
  // The hook will then attempt to fetch.
  // Inside MockProvider, the Apollo MockedProvider (if not configured with specific mocks for 'prod-real-fetch')
  // will likely cause the hook to remain in a loading state or return an error.
  // The ProductDetailPage component has UI for both loading and error states.
  // Typically, an unmocked query in Apollo's MockedProvider leads to an error.
  return (
    <MockProvider>
      <ProductDetailPage productId="prod-real-fetch" />
    </MockProvider>
  );
};