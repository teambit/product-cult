import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserIcon } from './user-icon.js';

// Helper for visual grouping in compositions
const CompositionSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    marginBottom: 'var(--spacing-large, 24px)',
    padding: 'var(--spacing-medium, 16px)',
    border: '1px solid var(--colors-border-subtle, #e0e0e0)',
    borderRadius: 'var(--borders-radius-medium, 8px)',
    backgroundColor: 'var(--colors-surface-primary, #f9f9f9)'
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-medium, 16px)',
      color: 'var(--colors-text-primary, #333)',
      fontSize: 'var(--typography-sizes-heading-h5, 1.2em)',
      fontFamily: 'var(--typography-font-family, sans-serif)'
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary)' }}>
      {children}
    </div>
  </div>
);

export const BasicUserIcons = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="User Icon Sizes">
        <div>
          <UserIcon />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Default (24px)</span>
        </div>
        <div>
          <UserIcon size={16} />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>16px</span>
        </div>
        <div>
          <UserIcon size={32} />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>32px</span>
        </div>
        <div>
          <UserIcon size="3em" />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>3em (relative to parent font-size)</span>
        </div>
      </CompositionSection>
    </div>
  </MockProvider>
);

export const ColoredUserIcons = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="User Icon Colors">
        <div>
          <UserIcon color="var(--colors-primary-default)" />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Primary Theme Color</span>
        </div>
        <div>
          <UserIcon color="var(--colors-status-positive-default)" />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Positive Status Color</span>
        </div>
        <div>
          <UserIcon color="#FF69B4" /> {/* Custom hex - Hot Pink */}
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Custom Hex (#FF69B4)</span>
        </div>
        <div style={{ color: 'var(--colors-secondary-default)' }}>
          <UserIcon /> {/* Inherits color from parent div via currentColor */}
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Inherited (currentColor)</span>
        </div>
      </CompositionSection>
    </div>
  </MockProvider>
);

export const InteractiveAndAccessibleUserIcons = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="Interactive & Accessible User Icons">
        <div>
          <UserIcon
            onClick={() => alert('User profile icon clicked!')}
            title="View User Profile"
            style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }}
          />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Clickable & Custom Title</span>
        </div>
        <div>
          <UserIcon title="Registered User" />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Specific Title for Accessibility</span>
        </div>
        <div>
          {/* Default title "User" will be used here */}
          <UserIcon />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>Default Title ("User")</span>
        </div>
        <div>
          <UserIcon className="custom-user-icon-highlight" />
          <span style={{ marginLeft: 'var(--spacing-small, 8px)'}}>With Custom Class</span>
        </div>
      </CompositionSection>
      <style>{`
        .custom-user-icon-highlight {
          background-color: var(--colors-primary-hover, #ff9a63);
          border-radius: var(--borders-radius-circle, 50%);
          padding: var(--spacing-xx-small, 4px);
          color: var(--colors-text-inverse, white) !important; /* Ensure icon color contrasts with background */
        }
      `}</style>
    </div>
  </MockProvider>
);