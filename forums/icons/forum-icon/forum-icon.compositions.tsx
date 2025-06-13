import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { ForumIcon } from './forum-icon.js';

// Helper for visual grouping in compositions
const CompositionSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{
    marginBottom: 'var(--spacing-large)',
    padding: 'var(--spacing-medium)',
    border: '1px solid var(--colors-border-subtle)',
    borderRadius: 'var(--borders-radius-medium)',
    backgroundColor: 'var(--colors-surface-primary)'
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-medium)',
      color: 'var(--colors-text-primary)',
      fontSize: 'var(--typography-sizes-heading-h5)',
      fontFamily: 'var(--typography-font-family)'
    }}>{title}</h3>
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family)' }}>
      {children}
    </div>
  </div>
);

export const BasicForumIconDisplay = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <CompositionSection title="Basic Forum Icons">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon />
            <span>Default ("Forum" title, 24px)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon title="Community Discussions" />
            <span>Custom Title</span>
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const SizedForumIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <CompositionSection title="Sized Forum Icons">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon size={16} />
            <span>16px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon size="var(--sizes-icon-medium)" />
            <span>var(--sizes-icon-medium)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon size={32} />
            <span>32px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)', fontSize: '10px' }}>
            <ForumIcon size="3em" />
            <span>3em (relative to 10px font-size)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon size={48} />
            <span>48px</span>
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const StyledAndInteractiveForumIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <style>{`
        .custom-forum-icon-class {
          background-color: var(--colors-surface-secondary);
          padding: var(--spacing-x-small);
          border-radius: var(--borders-radius-small);
          border: 1px solid var(--colors-border-default);
        }
      `}</style>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <CompositionSection title="Styled and Interactive Forum Icons">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon color="var(--colors-primary-default)" title="Primary Color Forum Icon" />
            <span>Primary Color</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon color="var(--colors-status-positive-default)" title="Positive Color Forum Icon" />
            <span>Positive Color (Green)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon
              title="Clickable Forum Icon"
              onClick={() => alert('Forum icon clicked!')}
              style={{ cursor: 'var(--interactions-cursor-pointer)' }}
            />
            <span>Clickable</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon title="Styled Forum Icon" className="custom-forum-icon-class" />
            <span>With Custom Class</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-small)' }}>
            <ForumIcon
              title="Inline Styled Forum Icon"
              style={{ transform: 'rotate(-10deg)', filter: 'drop-shadow(1px 1px 1px var(--colors-overlay))' }}
            />
            <span>Inline Styled (rotated)</span>
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);