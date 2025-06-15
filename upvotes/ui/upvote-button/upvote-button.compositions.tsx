import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UpvoteButton } from './upvote-button.js';

// Helper for layout and styling of compositions
const CompositionContainer = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    padding: 'var(--spacing-large, 24px)',
    fontFamily: 'var(--typography-font-family, sans-serif)',
    color: 'var(--colors-text-primary, #333)',
    backgroundColor: 'var(--colors-surface-background, #fdfdfd)',
    borderBottom: '1px solid var(--colors-border-subtle, #eee)',
    marginBottom: 'var(--spacing-medium, 16px)',
  }}>
    <h3 style={{
      fontSize: 'var(--typography-sizes-heading-h4, 1.25rem)',
      color: 'var(--colors-text-primary, #333)',
      marginBottom: 'var(--spacing-medium, 16px)',
      paddingBottom: 'var(--spacing-small, 8px)',
    }}>{title}</h3>
    <div style={{ display: 'flex', gap: 'var(--spacing-medium, 16px)', alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const DefaultStateUpvoteButton = () => (
  <MockProvider>
    <CompositionContainer title="Default State (Not Upvoted)">
      <UpvoteButton itemId="product-101" itemType="product" initialCount={25} />
      <UpvoteButton itemId="launch-alpha" itemType="launch" initialCount={0} />
      <UpvoteButton itemId="product-102" itemType="product" /> {/* No initial count, defaults to 0 */}
    </CompositionContainer>
  </MockProvider>
);

export const InitiallyUpvotedState = () => (
  <MockProvider>
    <CompositionContainer title="Initially Upvoted State">
      <UpvoteButton
        itemId="product-201"
        itemType="product"
        initialCount={150}
        initialHasUpvoted={true}
      />
      <UpvoteButton
        itemId="launch-beta"
        itemType="launch"
        initialCount={5}
        initialHasUpvoted={true}
        size={24} // Larger icon
      />
    </CompositionContainer>
  </MockProvider>
);

export const VariousIconSizesAndCounts = () => (
  <MockProvider>
    <CompositionContainer title="Various Icon Sizes and Vote Counts">
      <UpvoteButton itemId="product-301" itemType="product" initialCount={9} size={16} />
      <UpvoteButton itemId="product-302" itemType="product" initialCount={99} size={20} initialHasUpvoted={true} />
      <UpvoteButton itemId="launch-gamma" itemType="launch" initialCount={999} size={28} />
      <UpvoteButton itemId="product-303" itemType="product" initialCount={12000} size="1.8em" initialHasUpvoted={true} />
    </CompositionContainer>
  </MockProvider>
);

export const InteractiveUpvoteAction = () => {
  // This composition demonstrates the click interaction.
  // The useUpvote hook within UpvoteButton will attempt to make GraphQL calls.
  // MockProvider includes Apollo's MockedProvider. Optimistic UI updates from useUpvote should be visible.
  // Actual backend call success depends on MockProvider's Apollo setup for these specific operations.
  return (
    <MockProvider>
      <CompositionContainer title="Interactive Upvote/Downvote Actions">
        <div>
          <p style={{ fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-small)'}}>
            Click buttons to toggle upvote status and see optimistic count updates.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-medium, 16px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <UpvoteButton
              itemId="interactive-product-1"
              itemType="product"
              initialCount={42}
              initialHasUpvoted={false}
            />
            <UpvoteButton
              itemId="interactive-launch-1"
              itemType="launch"
              initialCount={107}
              initialHasUpvoted={true}
              size={22}
            />
             <UpvoteButton
              itemId="interactive-product-2"
              itemType="product"
              initialCount={0} 
              initialHasUpvoted={false}
              size={18}
            />
          </div>
        </div>
      </CompositionContainer>
    </MockProvider>
  );
};

export const CustomStyledUpvoteButton = () => (
  <MockProvider>
     <style>{`
      .custom-product-upvote {
        border-radius: var(--borders-radius-pill); /* Make it a pill shape */
        box-shadow: var(--effects-shadows-primary); /* Add a primary color shadow */
        border-width: 2px; /* Thicker border */
      }
      .custom-launch-upvote.active-vote { /* Example: only when active */
        background-image: var(--effects-gradients-primary);
        border-color: transparent;
      }
      .custom-launch-upvote.active-vote .count { /* Target internal count class */
        color: var(--colors-text-inverse) !important; 
        font-weight: var(--typography-font-weight-bold);
      }
    `}</style>
    <CompositionContainer title="Custom Styling via className and style prop">
      <UpvoteButton
        itemId="style-product-1"
        itemType="product"
        initialCount={77}
        className="custom-product-upvote"
      />
      <UpvoteButton
        itemId="style-launch-1"
        itemType="launch"
        initialCount={33}
        initialHasUpvoted={true}
        // Example of adding a class that might be conditionally applied based on active state in a real app
        className={`custom-launch-upvote ${true ? 'active-vote' : ''}`} 
      />
      <UpvoteButton
        itemId="style-product-2"
        itemType="product"
        initialCount={22}
        style={{ filter: 'hue-rotate(180deg)' }} // Apply a distinct visual style prop
      />
    </CompositionContainer>
  </MockProvider>
);