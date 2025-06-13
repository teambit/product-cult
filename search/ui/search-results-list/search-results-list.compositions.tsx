import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import type { PlainSearchResult } from '@infinity/search.entities.search-result';
import { SearchResultsList } from './search-results-list.js';

const mockResults: PlainSearchResult[] = [
  {
    id: 'prod-001',
    title: 'Innovative AI Headphones',
    description:
      'Experience crystal clear audio with AI-powered noise cancellation and personalized sound profiles. Long-lasting battery and sleek design for the modern audiophile.',
    imageUrl:
      'https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk4NjE5fDA&ixlib=rb-4.1.0',
    type: 'product',
    data: { upvotes: 1200, category: 'Audio Tech', url: '/products/prod-001' },
  },
  {
    id: 'launch-002',
    title: 'Project Phoenix: New SaaS Platform',
    description:
      'A revolutionary SaaS platform designed to streamline project management for remote teams. Launching next month with early bird discounts and exciting new features.',
    type: 'launch',
    data: { launchDate: '2024-08-15', website: 'https://example.com/phoenix', url: '/launches/launch-002' },
  },
  {
    id: 'news-003',
    title: 'The Future of Sustainable Tech Packaging',
    description:
      'Exploring how companies are innovating with eco-friendly packaging solutions for tech products, reducing waste and environmental impact significantly.',
    imageUrl:
      'https://images.unsplash.com/photo-1583312605516-4d11f1acbdd0?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk4NjE5fDA&ixlib=rb-4.1.0',
    type: 'news',
    data: { source: 'TechCrunch Daily', url: '/news/news-003' },
  },
  {
    id: 'forum-004',
    title: 'Discussion: Best Productivity Gadgets for 2024',
    description:
      'Share your thoughts and experiences on the latest productivity gadgets. What are your must-haves for staying focused and efficient in your daily workflow?',
    type: 'forum_topic',
    data: { replies: 42, views: 1500, url: '/forums/forum-004' },
  },
];

const mockResultsWithAllImages: PlainSearchResult[] = [
  {
    id: 'prod-img-001',
    title: 'Ergonomic Smart Desk',
    description:
      'A smart desk that adjusts to your posture and reminds you to take breaks. Features wireless charging and integrated cable management.',
    imageUrl:
      'https://images.unsplash.com/photo-1550259114-ad7188f0a967?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk4NjE5fDA&ixlib=rb-4.1.0',
    type: 'product',
    data: { category: 'Office Furniture', url: '/products/prod-img-001' },
  },
  {
    id: 'review-img-002',
    title: "Review: 'Aura Smartwatch' - Style Meets Function",
    description:
      'An in-depth look at the Aura Smartwatch, focusing on its design, health tracking accuracy, and battery life. Is it the best Android smartwatch?',
    imageUrl:
      'https://images.unsplash.com/photo-1548973862-91b7a794c719?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxwcm9kdWN0JTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk4NjE5fDA&ixlib=rb-4.1.0',
    type: 'review',
    data: { productId: 'prod-aura-watch', rating: 4.8, url: '/reviews/review-img-002' },
  },
  {
    id: 'launch-img-003',
    title: 'Nova Earbuds: Immersive Sound Experience',
    description:
      'Introducing the Nova Earbuds, featuring spatial audio and adaptive noise cancellation. Pre-order yours today for an exclusive discount.',
    imageUrl:
      'https://images.unsplash.com/photo-1584458683678-c6e4bfb9f043?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxwcm9kdWN0JTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk4NjE5fDA&ixlib=rb-4.1.0',
    type: 'launch',
    data: { expectedRelease: '2024-09-01', url: '/launches/launch-img-003' },
  },
];

export const BasicSearchResultsList = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <SearchResultsList results={mockResults} />
    </div>
  </MockProvider>
);

export const EmptySearchResultsList = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <SearchResultsList results={[]} />
    </div>
  </MockProvider>
);

export const SearchResultsListWithAllImages = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <SearchResultsList results={mockResultsWithAllImages} />
    </div>
  </MockProvider>
);

export const SearchResultsListWithItemClickCallback = () => {
  const handleItemClick = (result: PlainSearchResult) => {
    // eslint-disable-next-line no-alert
    alert(
      `Item clicked!\nID: ${result.id}\nTitle: ${result.title}\nType: ${result.type}`
    );
  };

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)' }}>
        <SearchResultsList
          results={mockResults.slice(0, 2)}
          onItemLinkClick={handleItemClick}
        />
      </div>
    </MockProvider>
  );
};