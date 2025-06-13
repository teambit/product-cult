import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchIcon } from './search-icon.js';

// Helper for visual grouping in compositions
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
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-large, 24px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)' }}>
      {children}
    </div>
  </div>
);

// Helper for individual icon showcases
const IconShowcaseItem = ({ children, label }: { children: React.ReactNode, label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '100px' }}>
    {children}
    <p style={{
      fontSize: 'var(--typography-sizes-body-x-small, 10px)',
      color: 'var(--colors-text-secondary, #555)',
      marginTop: 'var(--spacing-x-small, 4px)',
      lineHeight: 'var(--typography-line-height-condensed, 1.2)'
    }}>
      {label}
    </p>
  </div>
);


export const BasicSearchIconDemonstration = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="Basic Search Icon">
        <IconShowcaseItem label='Default (24px, title: "Search")'>
          <SearchIcon />
        </IconShowcaseItem>
        <IconShowcaseItem label='Custom Title: "Find Products"'>
          <SearchIcon title="Find Products" />
        </IconShowcaseItem>
      </CompositionSection>
    </div>
  </MockProvider>
);

export const SizedAndColoredSearchIcons = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="Sized and Colored Search Icons">
        <IconShowcaseItem label="16px">
          <SearchIcon size={16} title="Small Search Icon" />
        </IconShowcaseItem>
        <IconShowcaseItem label="32px">
          <SearchIcon size={32} title="Medium Search Icon" />
        </IconShowcaseItem>
        <IconShowcaseItem label='2.5em (relative)'>
          <SearchIcon size="2.5em" title="Large Search Icon (2.5em)" />
        </IconShowcaseItem>
        <IconShowcaseItem label="Primary Color">
          <SearchIcon color="var(--colors-primary-default)" title="Primary Color Search Icon" />
        </IconShowcaseItem>
        <IconShowcaseItem label="Accent Color">
          <SearchIcon color="var(--colors-text-accent)" title="Accent Color Search Icon" />
        </IconShowcaseItem>
        <IconShowcaseItem label="Custom Pink (#FF69B4)">
          <SearchIcon color="#FF69B4" title="Custom Pink Search Icon" />
        </IconShowcaseItem>
      </CompositionSection>
    </div>
  </MockProvider>
);

export const InteractiveAndStyledSearchIcon = () => (
  <MockProvider>
    <style>{`
      .custom-search-icon-class {
        padding: var(--spacing-x-small, 4px);
        background-color: var(--colors-surface-secondary, #eee);
        border-radius: var(--borders-radius-circle, 50%);
        border: 1px solid var(--colors-border-default, #ccc);
        transition: all var(--interactions-transitions-duration-fast) var(--interactions-transitions-easing-ease-in-out);
      }
      .custom-search-icon-class:hover {
        background-color: var(--colors-primary-hover, #FF8C4A);
        color: var(--colors-text-inverse, #fff) !important; /* Ensure text inverse color takes precedence */
        transform: scale(1.1);
        box-shadow: var(--effects-shadows-primary);
      }
    `}</style>
    <div style={{ padding: 'var(--spacing-large, 24px)' }}>
      <CompositionSection title="Interactive and Styled Search Icon">
        <IconShowcaseItem label="Clickable">
          <SearchIcon
            onClick={() => alert('Search icon clicked!')}
            title="Clickable Search Icon"
            style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }}
          />
        </IconShowcaseItem>
        <IconShowcaseItem label="Custom Class (hover)">
          <SearchIcon
            className="custom-search-icon-class"
            title="Styled Search Icon with Custom Class"
            size={28}
            onClick={() => alert('Styled search icon tapped!')}
          />
        </IconShowcaseItem>
        <IconShowcaseItem label="Inline Styled">
          <SearchIcon
            style={{
              transform: 'rotate(15deg)',
              filter: 'drop-shadow(1px 1px 1px var(--colors-overlay, rgba(0,0,0,0.2)))',
              padding: 'var(--spacing-xx-small, 2px)',
              backgroundColor: 'var(--colors-status-info-subtle)',
              borderRadius: 'var(--borders-radius-small)'
            }}
            title="Inline Styled Search Icon"
            color="var(--colors-status-info-default)"
          />
        </IconShowcaseItem>
      </CompositionSection>
    </div>
  </MockProvider>
);