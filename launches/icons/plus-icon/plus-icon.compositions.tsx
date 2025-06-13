import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { PlusIcon } from './plus-icon.js';

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)', color: 'var(--colors-text-primary, #333)' }}>
      {children}
    </div>
  </div>
);

export const DefaultAndSizedPlusIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)'}}>
        <CompositionSection title="Default and Sized Plus Icons">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon /> Default (24px, currentColor, title: "Plus Icon")
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon size={16} /> 16px
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon size={32} /> 32px
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)', fontSize: '12px' }}>
            <PlusIcon size="3em" /> 3em (relative to 12px font-size)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ColoredAndInteractivePlusIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)' }}>
        <CompositionSection title="Colored and Interactive Plus Icons">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon color="var(--colors-primary-default, orange)" /> Primary Color
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon color="var(--colors-status-positive-default, green)" /> Positive Color
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon color="#8E44AD" /> Custom Hex Color (#8E44AD)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon
              onClick={() => alert('Plus icon clicked!')}
              style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }}
              title="Clickable Add Action"
            /> Clickable (custom title: "Clickable Add Action")
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const StyledAndAccessiblePlusIcon = () => (
  <MemoryRouter>
    <InfinityTheme>
      <style>{`
        .custom-plus-icon-style {
          background-color: var(--colors-surface-secondary, #eee);
          border-radius: var(--borders-radius-circle, 50%);
          padding: var(--spacing-x-small, 4px);
          border: 1px solid var(--colors-border-default, #ccc);
          transition: background-color var(--interactions-transitions-duration-fast, 0.2s) ease;
        }
        .custom-plus-icon-style:hover {
          background-color: var(--colors-primary-hover, lightcoral);
        }
      `}</style>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)' }}>
        <CompositionSection title="Styled and Accessible Plus Icon">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon title="Add New Item" /> Custom Title ("Add New Item")
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon className="custom-plus-icon-style" title="Styled Add Button" /> Custom Class
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small, 4px)' }}>
            <PlusIcon
              style={{ transform: 'rotate(45deg)', transition: 'transform var(--interactions-transitions-duration-medium) ease' }}
              title="Rotated Plus"
              color="var(--colors-secondary-default, blue)"
            /> Inline Styled (rotated, secondary color)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);