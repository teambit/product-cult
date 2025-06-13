import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductIcon } from './product-icon.js';

// Helper for visual grouping in compositions
const CompositionSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    marginBottom: 'var(--spacing-large, 24px)',
    padding: 'var(--spacing-medium, 16px)',
    border: '1px solid var(--colors-border-subtle, #ccc)',
    borderRadius: 'var(--borders-radius-medium, 8px)',
    backgroundColor: 'var(--colors-surface-primary, #f8f8f8)',
    fontFamily: 'var(--typography-font-family, sans-serif)'
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-medium, 16px)',
      color: 'var(--colors-text-primary, #333)',
      fontSize: 'var(--typography-sizes-heading-h5, 1.2em)',
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

const CenteredText = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)', color: 'var(--colors-text-secondary, #555)', fontSize: 'var(--typography-sizes-body-small, 0.875em)' }}>
    {children}
  </div>
);

export const BasicProductIcon = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Default Product Icon">
          <CenteredText>
            <ProductIcon />
            Default (24px)
          </CenteredText>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const SizedProductIcons = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Sized Product Icons">
          <CenteredText>
            <ProductIcon size={16} title="Small Product Icon" />
            16px
          </CenteredText>
          <CenteredText>
            <ProductIcon size={32} title="Medium Product Icon" />
            32px
          </CenteredText>
          <CenteredText>
            <ProductIcon size={48} title="Large Product Icon" />
            48px
          </CenteredText>
          <CenteredText>
            <ProductIcon size="4em" title="Extra Large Product Icon (4em)" />
            4em
          </CenteredText>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const ColoredProductIcons = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Colored Product Icons">
          <CenteredText>
            <ProductIcon color="var(--colors-primary-default)" title="Primary Color Product Icon" />
            Primary Theme Color
          </CenteredText>
          <CenteredText>
            <ProductIcon color="var(--colors-status-positive-default)" title="Success Color Product Icon" />
            Positive Status Color
          </CenteredText>
          <CenteredText>
            <ProductIcon color="#BF55EC" title="Custom Purple Product Icon" />
            Custom Hex (#BF55EC)
          </CenteredText>
          <CenteredText>
            <ProductIcon color="var(--colors-text-accent)" title="Accent Text Product Icon" />
            Accent Text Color
          </CenteredText>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const InteractiveAndCustomizedProductIcon = () => {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('Product Icon Clicked!');
  };

  return (
    <MockProvider>
      <style>
        {`
          .custom-product-icon-class {
            background-color: var(--colors-surface-secondary);
            border-radius: var(--borders-radius-small);
            padding: var(--spacing-x-small);
            box-shadow: var(--effects-shadows-xs);
          }
        `}
      </style>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Interactive and Customized Product Icon">
          <CenteredText>
            <ProductIcon
              onClick={handleClick}
              title="Clickable Product Icon"
              style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }}
            />
            Clickable
          </CenteredText>
          <CenteredText>
            <ProductIcon
              className="custom-product-icon-class"
              title="Styled Product Icon with Class"
              size={30}
              color="var(--colors-secondary-default)"
            />
            Custom Class & Style
          </CenteredText>
          <CenteredText>
            <ProductIcon
              title="Custom Title for Accessibility"
              size={28}
              color="var(--colors-text-primary)"
              style={{ transform: 'rotate(10deg)' }}
            />
            Custom Title & Inline Style
          </CenteredText>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};