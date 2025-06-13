import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { AddReviewButton } from './add-review-button.js';

const commonCompositionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium, 16px)',
  padding: 'var(--spacing-large, 24px)',
  alignItems: 'center',
  border: '1px dashed var(--colors-border-subtle, #ccc)',
  borderRadius: 'var(--borders-radius-medium, 8px)',
  margin: 'var(--spacing-medium, 16px)',
  backgroundColor: 'var(--colors-surface-primary, #f9f9f9)',
  fontFamily: 'var(--typography-font-family, sans-serif)',
  color: 'var(--colors-text-primary, #333)',
  textAlign: 'center',
};

const descriptionStyle: React.CSSProperties = {
  color: 'var(--colors-text-secondary, #555)',
  fontSize: 'var(--typography-sizes-body-small, 0.875rem)',
  marginBottom: 'var(--spacing-small, 8px)',
};

export const BasicAddReviewButton = () => {
  return (
    <MockProvider>
      <div style={commonCompositionStyle}>
        <p style={descriptionStyle}>
          This is the default "Add Review" button. It uses the 'primary' appearance.
          <br />
          Clicking navigates to the review page for Product ID: "innovate-ai-101".
        </p>
        <AddReviewButton productId="innovate-ai-101" />
      </div>
    </MockProvider>
  );
};

export const SecondaryAddReviewButtonWithCustomText = () => {
  return (
    <MockProvider>
      <div style={commonCompositionStyle}>
        <p style={descriptionStyle}>
          This button uses the 'secondary' appearance and custom text "Rate This Gadget".
          <br />
          Product ID: "gadget-pro-x".
        </p>
        <AddReviewButton
          productId="gadget-pro-x"
          buttonText="Rate This Gadget"
          buttonAppearance="secondary"
        />
      </div>
    </MockProvider>
  );
};

export const TertiaryAddReviewButton = () => {
  return (
    <MockProvider>
      <div style={commonCompositionStyle}>
        <p style={descriptionStyle}>
          This button features the 'tertiary' appearance for a more subtle call to action.
          <br />
          Product ID: "eco-friendly-bottle-007".
        </p>
        <AddReviewButton
          productId="eco-friendly-bottle-007"
          buttonText="Share Your Thoughts"
          buttonAppearance="tertiary"
        />
      </div>
    </MockProvider>
  );
};

export const AddReviewButtonDisabledState = () => {
  return (
    <MockProvider>
      <div style={commonCompositionStyle}>
        <p style={descriptionStyle}>
          The button is automatically disabled if `productId` is not provided (e.g., an empty string).
          <br />
          This demonstrates the disabled state.
        </p>
        {/* Passing an empty string for productId to trigger the disabled state */}
        <AddReviewButton productId="" buttonText="Review Unavailable" />
      </div>
    </MockProvider>
  );
};