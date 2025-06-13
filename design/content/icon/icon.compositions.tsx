import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Icon } from './icon.js';

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
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium, 16px)', flexWrap: 'wrap', fontFamily: 'var(--typography-font-family, sans-serif)' }}>
      {children}
    </div>
  </div>
);

// SVG Path Data
const HomeIconPath = () => <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>;
const SettingsIconPath = () => <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2 3.46c.13.22-.07.49.12.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>;
const SearchIconPath = () => <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>;
const CheckIconPath = () => <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>;


export const DefaultAndSizedIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)', color: 'var(--colors-text-primary, #000)' }}>
        <CompositionSection title="Default and Sized Icons">
          <div style={{ color: 'var(--colors-text-secondary, #555)' }}>
            <Icon title="Default Home Icon"><HomeIconPath /></Icon> Default (24px, currentColor)
          </div>
          <div>
            <Icon size={16} title="Small Home Icon"><HomeIconPath /></Icon> 16px
          </div>
          <div>
            <Icon size={32} title="Large Home Icon"><HomeIconPath /></Icon> 32px
          </div>
          <div style={{ fontSize: '12px' }}> {/* Context for em unit */}
            <Icon size="3em" title="Extra Large Home Icon (3em)"><HomeIconPath /></Icon> 3em (relative to 12px font-size)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ColoredAndClickableIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)', color: 'var(--colors-text-primary, #000)' }}>
        <CompositionSection title="Colored and Clickable Icons">
          <div>
            <Icon color="var(--colors-primary-default, orange)" title="Primary Color Settings"><SettingsIconPath /></Icon> Primary Color
          </div>
          <div>
            <Icon color="var(--colors-status-positive-default, green)" title="Positive Status Settings"><SettingsIconPath /></Icon> Positive Color
          </div>
          <div>
            <Icon color="#8E44AD" title="Custom Purple Settings"><SettingsIconPath /></Icon> Custom Hex Color
          </div>
          <div>
            <Icon 
              onClick={() => alert('Settings icon clicked!')} 
              title="Clickable Settings Icon" 
              style={{ cursor: 'var(--interactions-cursor-pointer, pointer)' }}
            >
              <SettingsIconPath />
            </Icon> Clickable
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const AccessibleStyledAndCustomSvgIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <style>{`.custom-icon-class-example { border-radius: var(--borders-radius-circle, 50%); background-color: var(--colors-surface-secondary, #eee); padding: var(--spacing-x-small, 4px); }`}</style>
      <div style={{ padding: 'var(--spacing-large, 24px)', backgroundColor: 'var(--colors-surface-background, #fff)', color: 'var(--colors-text-primary, #000)' }}>
        <CompositionSection title="Accessible, Styled, and Custom SVG Attribute Icons">
          <div>
            <Icon title="Search For Products"><SearchIconPath /></Icon> With Title (Accessibility)
          </div>
          <div>
            <Icon className="custom-icon-class-example" title="Styled Check Icon"><CheckIconPath /></Icon> Custom Class
          </div>
          <div>
            <Icon style={{ transform: 'rotate(15deg)', filter: 'drop-shadow(2px 2px 2px var(--colors-overlay, rgba(0,0,0,0.2)))' }} title="Rotated Check Icon"><CheckIconPath /></Icon> Inline Styled
          </div>
          <div>
            <Icon 
              stroke="var(--colors-secondary-default, blue)" 
              strokeWidth={1.5} 
              fill="none" 
              title="Outlined Search Icon"
              viewBox="0 0 24 24" // Ensure viewBox is appropriate for stroke
            >
              <SearchIconPath />
            </Icon> Custom SVG Attributes (Stroke)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);