import React, { useState } from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UpvoteIcon } from './upvote-icon.js';

const CompositionContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    padding: 'var(--spacing-medium, 16px)',
    border: '1px solid var(--colors-border-subtle, #ccc)',
    borderRadius: 'var(--borders-radius-medium, 8px)',
    marginBottom: 'var(--spacing-large, 24px)',
    backgroundColor: 'var(--colors-surface-primary, #f8f8f8)',
    fontFamily: 'var(--typography-font-family, sans-serif)'
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-medium, 16px)',
      color: 'var(--colors-text-primary, #333)',
      fontSize: 'var(--typography-sizes-heading-h5, 1.2em)'
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-large, 24px)', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const DefaultAndActiveStates = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionContainer title="Default and Active States">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon />
            <span>Inactive (Default)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon isActive={true} />
            <span>Active</span>
          </div>
        </CompositionContainer>
      </div>
    </MockProvider>
  );
};

export const SizedUpvoteIcons = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionContainer title="Different Sizes">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon size={16} />
            <span>16px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon size={24} isActive={true} />
            <span>24px (Active)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon size={32} />
            <span>32px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon size="3em" isActive={true} />
            <span>3em (Active)</span>
          </div>
        </CompositionContainer>
      </div>
    </MockProvider>
  );
};

export const InteractiveUpvoteIcon = () => {
  const [isVoted, setIsVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(42);

  const handleUpvoteClick = () => {
    setIsVoted(!isVoted);
    setVoteCount(prevCount => isVoted ? prevCount - 1 : prevCount + 1);
    // In a real application, you would call an API here.
    console.log(`Upvote toggled. New state: ${!isVoted ? 'Upvoted' : 'Not Upvoted'}`);
  };

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionContainer title="Interactive Upvote">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small, 12px)', padding: 'var(--spacing-medium, 16px)', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)' }}>
            <UpvoteIcon isActive={isVoted} onClick={handleUpvoteClick} size={28} title={isVoted ? `Remove your upvote. Current upvotes: ${voteCount}` : `Upvote this item. Current upvotes: ${voteCount}`} />
            <span style={{ fontSize: 'var(--typography-sizes-body-large, 18px)', fontWeight: 'var(--typography-font-weight-medium, 500)', color: 'var(--colors-text-primary, #333)' }}>
              {voteCount}
            </span>
          </div>
          <div style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
            Click the icon to toggle upvote status.
          </div>
        </CompositionContainer>
      </div>
    </MockProvider>
  );
};

export const CustomStyledUpvoteIcon = () => {
  return (
    <MockProvider>
      <style>
        {`
          .custom-upvote-class {
            padding: var(--spacing-x-small);
            background-color: var(--colors-surface-secondary);
            border-radius: var(--borders-radius-circle);
            box-shadow: var(--effects-shadows-small);
          }
          .custom-upvote-class:hover {
            transform: scale(1.1);
            transition: transform var(--interactions-transitions-duration-fast) var(--interactions-transitions-easing-ease-in-out);
          }
        `}
      </style>
      <div style={{ padding: 'var(--spacing-large, 24px)' }}>
        <CompositionContainer title="Custom Styling via className and style prop">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon className="custom-upvote-class" size={30} />
            <span>With className</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-x-small, 8px)' }}>
            <UpvoteIcon isActive={true} style={{ border: `2px solid var(--colors-primary-hover)`, borderRadius: 'var(--borders-radius-small)', padding: 'var(--spacing-xx-small)' }} size={30} />
            <span>With inline style (Active)</span>
          </div>
        </CompositionContainer>
      </div>
    </MockProvider>
  );
};