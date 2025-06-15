import React, { useState } from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { DownvoteIcon } from './downvote-icon.js';

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

const IconDisplay = ({ children, label }: { children: React.ReactNode, label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)', color: 'var(--colors-text-secondary, #555)' }}>
    {children}
    <span style={{ fontSize: 'var(--typography-sizes-body-small, 0.875em)' }}>{label}</span>
  </div>
);

export const BasicDownvoteStates = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Basic Downvote Icon States">
          <IconDisplay label="Inactive (Default)">
            <DownvoteIcon />
          </IconDisplay>
          <IconDisplay label="Active">
            <DownvoteIcon isActive={true} />
          </IconDisplay>
          <IconDisplay label="Inactive (Explicit)">
            <DownvoteIcon isActive={false} />
          </IconDisplay>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const SizedDownvoteIcons = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Downvote Icon Sizes">
          <IconDisplay label="Small (16px)">
            <DownvoteIcon size={16} />
          </IconDisplay>
          <IconDisplay label="Default (24px)">
            <DownvoteIcon />
          </IconDisplay>
          <IconDisplay label="Large (32px)">
            <DownvoteIcon size={32} />
          </IconDisplay>
          <IconDisplay label="Extra Large (48px)">
            <DownvoteIcon size="48" />
          </IconDisplay>
           <IconDisplay label="Relative Size (2em)">
            <div style={{ fontSize: '12px' }}> {/* Context for em unit */}
              <DownvoteIcon size="2em" />
            </div>
          </IconDisplay>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const InteractiveDownvoteIcon = () => {
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleDownvoteClick = () => {
    setIsDownvoted(!isDownvoted);
    setClickCount(prev => prev + 1);
  };

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Interactive Downvote Icon">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-small, 12px)' }}>
            <IconDisplay label={isDownvoted ? "Click to remove downvote" : "Click to downvote"}>
              <DownvoteIcon
                isActive={isDownvoted}
                onClick={handleDownvoteClick}
                size={30}
                title={isDownvoted ? "Remove Downvote" : "Submit Downvote"}
              />
            </IconDisplay>
            <p style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-body-default)' }}>
              Current status: <strong>{isDownvoted ? 'Downvoted' : 'Not Downvoted'}</strong>
            </p>
            <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
              Clicked {clickCount} times.
            </p>
          </div>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};

export const CustomStyledDownvoteIcon = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionSection title="Custom Styled Downvote Icon">
          <IconDisplay label="Custom Class & Style">
            <DownvoteIcon
              isActive={true}
              size={36}
              className="custom-downvote-class" // Assuming a global CSS or another mechanism might target this
              style={{ border: '2px dashed var(--colors-primary-default)', borderRadius: 'var(--borders-radius-small)', padding: 'var(--spacing-x-small)' }}
              title="Specially Styled Downvote"
            />
          </IconDisplay>
           <IconDisplay label="Different Title">
            <DownvoteIcon
              title="Mark as not helpful"
            />
          </IconDisplay>
        </CompositionSection>
      </div>
    </MockProvider>
  );
};