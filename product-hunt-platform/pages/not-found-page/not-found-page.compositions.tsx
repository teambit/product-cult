import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { NotFoundPage } from './not-found-page.js';

export const BasicNotFoundPage = () => {
  return (
    <MockProvider>
      <NotFoundPage />
    </MockProvider>
  );
};

export const CustomizedProductHuntNotFoundPage = () => {
  return (
    <MockProvider>
      <NotFoundPage
        titleText="Oops! Product Gone Hunting?"
        messageText="It seems the product you were looking for is on an adventure of its own, or perhaps it was never launched. Don't worry, there are plenty of other amazing products to discover!"
        linkText="Discover New Products"
        homePageRoute="/discover"
        imageUrl="https://images.unsplash.com/photo-1504702920311-0871190084cb?auto=format&fit=crop&w=800&q=80" // A different, thematic image (e.g., telescope, map)
        imageAltText="A compass and map, symbolizing searching for something lost."
      />
    </MockProvider>
  );
};

export const NotFoundPageWithCustomStyling = () => {
  return (
    <MockProvider>
      <NotFoundPage
        titleText="404: Resource Missing"
        messageText="We couldn't find what you were looking for. Maybe try checking our latest discussions?"
        linkText="Go to Forums"
        homePageRoute="/forums"
        className="custom-not-found-override"
        style={{ border: '2px dashed var(--colors-primary-default)', backgroundColor: 'var(--colors-surface-secondary)' }}
      />
      {/* Example CSS for the custom class, typically would be in a global stylesheet or injected for demo */}
      <style>{`
        .custom-not-found-override .contentWrapper {
          box-shadow: var(--effects-shadows-primary);
        }
        .custom-not-found-override .errorTitle {
          color: var(--colors-primary-default);
        }
      `}</style>
    </MockProvider>
  );
};