import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ReviewIcon } from './review-icon.js';

const CompositionSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    marginBottom: 'var(--spacing-large, 24px)',
    padding: 'var(--spacing-medium, 16px)',
    border: '1px solid var(--colors-border-subtle, #ccc)',
    borderRadius: 'var(--borders-radius-medium, 8px)',
    backgroundColor: 'var(--colors-surface-primary, #f8f8f8)'
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-medium, 16px)',
      color: 'var(--colors-text-primary, #333)',
      fontSize: 'var(--typography-sizes-heading-h5, 1.2em)',
      fontFamily: 'var(--typography-font-family, sans-serif)'
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)' }}>
      {children}
    </div>
  </div>
);

export const BasicReviewIcon = () => {
  return (
    <MockProvider>
      <CompositionSection title="Basic Review Icon">
        <ReviewIcon title="Default Review Icon" />
        <span>Default (24px, currentColor)</span>
      </CompositionSection>
    </MockProvider>
  );
};

export const SizedReviewIcons = () => {
  return (
    <MockProvider>
      <CompositionSection title="Sized Review Icons">
        <div>
          <ReviewIcon size={16} title="Small Review Icon" />
          <span>16px</span>
        </div>
        <div>
          <ReviewIcon size={32} title="Medium Review Icon" />
          <span>32px</span>
        </div>
        <div>
          <ReviewIcon size="3em" title="Large Review Icon (3em)" />
          <span>3em</span>
        </div>
        <div>
          <ReviewIcon size="var(--sizes-icon-x-large)" title="Theme XL Review Icon" />
          <span>var(--sizes-icon-x-large)</span>
        </div>
      </CompositionSection>
    </MockProvider>
  );
};

export const ColoredReviewIcons = () => {
  return (
    <MockProvider>
      <CompositionSection title="Colored Review Icons">
        <div>
          <ReviewIcon color="var(--colors-primary-default)" title="Primary Color Review" />
          <span>Primary Color</span>
        </div>
        <div>
          <ReviewIcon color="var(--colors-status-positive-default)" title="Positive Review" />
          <span>Positive Color</span>
        </div>
        <div>
          <ReviewIcon color="var(--colors-text-accent)" title="Accent Color Review" />
          <span>Accent Color</span>
        </div>
        <div>
          <ReviewIcon color="#FFC107" title="Custom Yellow Review" /> {/* Common review/star yellow */}
          <span>Custom Yellow (#FFC107)</span>
        </div>
      </CompositionSection>
    </MockProvider>
  );
};

export const ClickableAndAccessibleReviewIcon = () => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('Review icon clicked!');
  };
  return (
    <MockProvider>
      <CompositionSection title="Clickable and Accessible Review Icon">
        <div>
          <ReviewIcon
            title="Rate this product"
            onClick={handleClick}
            style={{ cursor: 'var(--interactions-cursor-pointer)' }}
            className="clickable-review-icon"
          />
          <span>Clickable with Title</span>
        </div>
        <div>
          <ReviewIcon
            title="Favorite item"
            color="var(--colors-status-warning-default)"
            size={40}
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert('Added to favorites!');
            }}
            style={{
              cursor: 'var(--interactions-cursor-pointer)',
              padding: 'var(--spacing-x-small)',
              borderRadius: 'var(--borders-radius-circle)',
            }}
            // Adding a hover effect via className would typically be done in a .module.scss file
            // For composition simplicity, we're focusing on props.
            // className="review-icon-hover-effect"
          />
          <span>Larger, Clickable, Styled</span>
        </div>
      </CompositionSection>
    </MockProvider>
  );
};