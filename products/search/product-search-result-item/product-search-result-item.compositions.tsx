import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchResult } from '@infinity/search.entities.search-result';
import { ProductSearchResultItem } from './product-search-result-item.js';

// Image URLs from the provided list
const imageUrl1 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkJTIwdWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
const imageUrl2 = "https://images.unsplash.com/photo-1617289746955-a58c1799a6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3QlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
const imageUrl3 = "https://images.unsplash.com/photo-1660914256311-918659fae88f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBzdHJ1Y3R1cmV8ZW58MXwwfHxibGFja3wxNzQ5NTk3OTc0fDA&ixlib=rb-4.1.0";

// Helper component to wrap each composition for consistent styling and layout in Bit's workspace.
// This wrapper is for composition display purposes only and not part of the component itself.
const CompositionViewer = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div style={{ 
    marginBlockEnd: 'var(--spacing-large, 24px)', 
    fontFamily: 'var(--typography-font-family, sans-serif)', // Ensure theme fonts are hinted if MockProvider isn't applying body styles early enough
    color: 'var(--colors-text-primary, #000)' // Ensure text color for title if needed
  }}>
    <h3 style={{
      fontSize: 'var(--typography-sizes-heading-h5)',
      color: 'inherit', // Inherit from above
      marginBottom: 'var(--spacing-medium)',
      borderBottom: '1px solid var(--colors-border-subtle)',
      paddingBottom: 'var(--spacing-small)',
    }}>{title}</h3>
    <div style={{
      maxWidth: '600px', // Constrain width for realistic search result item display
      margin: '0 auto', // Center the item container
      // backgroundColor: 'var(--colors-surface-background)', // MockProvider should handle this
      // padding: 'var(--spacing-medium)', // Item itself has padding
    }}>
      {children}
    </div>
  </div>
);


export const BasicProductItem = () => {
  const searchResult = new SearchResult(
    "prod-app-1",
    "AI Powered Code Assistant Pro",
    "Revolutionize your development workflow with our AI-powered code assistant. Get intelligent suggestions, auto-completions, and bug fixes in real-time, boosting your productivity significantly.",
    "product",
    { id: "ai-code-assist-pro-001", category: "Developer Tools", price: "29.99/month" },
    imageUrl1
  );
  return (
    <MockProvider>
      <CompositionViewer title="Basic Product Item with Image">
        <ProductSearchResultItem searchResult={searchResult} />
      </CompositionViewer>
    </MockProvider>
  );
};

export const ProductItemWithoutImage = () => {
  const searchResult = new SearchResult(
    "prod-gadget-2",
    "Stealth Mode Smart Ring v2",
    "The next generation sleek smart ring that tracks your activity, sleep, and notifications discreetly. Perfect for the minimalist tech enthusiast seeking advanced features.",
    "product",
    { id: "smart-ring-stealth-v2-789", category: "Wearables", releaseDate: "Q1 2025" },
    undefined // No image URL
  );
  return (
    <MockProvider>
      <CompositionViewer title="Product Item Without Image">
        <ProductSearchResultItem searchResult={searchResult} />
      </CompositionViewer>
    </MockProvider>
  );
};

export const ProductItemWithLongTextAndTruncation = () => {
  const searchResult = new SearchResult(
    "prod-platform-3",
    "The Ultimate Next-Generation Collaborative Productivity Platform for Modern Distributed Teams: Enhancing Workflow Efficiency and Streamlining Global Communication Across All Enterprise Verticals Using Advanced AI and Secure Cloud Technologies",
    "This cutting-edge, fully-featured platform offers a comprehensive and intuitive suite of tools meticulously designed to foster seamless collaboration, agile project management, and crystal-clear real-time communication for distributed teams of any size, anywhere in the world. It seamlessly integrates with your existing enterprise workflows and provides deep, actionable analytics to consistently optimize team performance and project outcomes. Discover the future of remote work and achieve unparalleled global team synergy with this all-in-one, highly scalable solution that dynamically adapts to your organization's unique operational needs and scales effortlessly as your business grows, supporting up to 100,000 active users concurrently.",
    "product",
    { id: "collab-suite-ultra-XYZ", category: "Productivity Software", targetAudience: "Global Enterprises & SMBs" },
    imageUrl2
  );
  return (
    <MockProvider>
      <CompositionViewer title="Product Item With Long Text (Testing Truncation)">
        <ProductSearchResultItem searchResult={searchResult} />
      </CompositionViewer>
    </MockProvider>
  );
};

export const ProductItemWithMissingLinkData = () => {
  const searchResult = new SearchResult(
    "prod-service-4",
    "Secure Cloud Storage - Basic Tier (Example: Link Unavailable)",
    "A reliable and secure cloud storage solution for your personal documents, files, and photos. Easy to use and accessible from anywhere on any device. Note: This item demonstrates behavior when a specific product ID for direct linking is not available in the search data.",
    "product",
    { category: "Cloud Services", storageCapacity: "50GB Free Tier" }, // 'id' field, which maps to productId, is missing
    imageUrl3
  );
  return (
    <MockProvider>
      <CompositionViewer title="Product Item With Missing Product ID for Link">
        <ProductSearchResultItem searchResult={searchResult} />
      </CompositionViewer>
    </MockProvider>
  );
};