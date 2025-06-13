import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { CalendarIcon } from './calendar-icon.js';

// Helper for visual grouping in compositions
const CompositionSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div
    style={{
      marginBottom: 'var(--spacing-large)',
      padding: 'var(--spacing-medium)',
      border: `var(--borders-default-width) var(--borders-default-style) var(--colors-border-subtle)`,
      borderRadius: 'var(--borders-radius-medium)',
      backgroundColor: 'var(--colors-surface-primary)',
      fontFamily: 'var(--typography-font-family)',
    }}
  >
    <h3
      style={{
        marginTop: 0,
        marginBottom: 'var(--spacing-medium)',
        color: 'var(--colors-text-primary)',
        fontSize: 'var(--typography-sizes-heading-h5)',
        fontFamily: 'inherit',
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-medium)',
        flexWrap: 'wrap',
        fontFamily: 'inherit',
        color: 'var(--colors-text-secondary)',
      }}
    >
      {children}
    </div>
  </div>
);

export const BasicCalendarIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <CompositionSection title="Calendar Icon: Basic Usage & Sizing">
          <div>
            <CalendarIcon title="Default Calendar Icon" /> Default (24px)
          </div>
          <div>
            <CalendarIcon size={16} title="Small Calendar Icon" /> 16px
          </div>
          <div>
            <CalendarIcon size={32} title="Medium Calendar Icon" /> 32px
          </div>
          <div>
            <CalendarIcon size="48" title="Large Calendar Icon" /> 48px (string)
          </div>
          <div>
            <CalendarIcon size="3em" title="Extra Large Calendar Icon (3em)" /> 3em (relative to font-size)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ColoredCalendarIcons = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <CompositionSection title="Calendar Icon: Color Variations">
          <div style={{ color: 'var(--colors-text-primary)' /* For currentColor context */ }}>
            <CalendarIcon title="Default Color Calendar Icon" /> CurrentColor (inherits text color)
          </div>
          <div>
            <CalendarIcon color="var(--colors-primary-default)" title="Primary Color Calendar Icon" /> Theme Primary Color
          </div>
          <div>
            <CalendarIcon color="var(--colors-status-positive-default)" title="Positive Status Calendar Icon" /> Theme Positive Color
          </div>
          <div>
            <CalendarIcon color="#8A2BE2" title="Custom Color Calendar Icon (BlueViolet)" /> Custom Hex (#8A2BE2)
          </div>
          <div style={{ color: 'var(--colors-text-accent)' }}>
            <CalendarIcon color="currentColor" title="Accent Color Calendar Icon" /> Accent Color (via inherited currentColor)
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const InteractiveAndStyledCalendarIcon = () => (
  <MemoryRouter>
    <InfinityTheme>
      <style>{`
        .custom-calendar-icon-class {
          background-color: var(--colors-surface-secondary);
          padding: var(--spacing-x-small);
          border-radius: var(--borders-radius-small);
          box-shadow: var(--effects-shadows-xs);
        }
        .custom-calendar-icon-class:hover {
          transform: scale(1.1);
          transition: transform var(--interactions-transitions-duration-fast) var(--interactions-transitions-easing-ease-out);
        }
      `}</style>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <CompositionSection title="Calendar Icon: Interactive & Styled">
          <div>
            <CalendarIcon
              onClick={() => alert('Calendar icon clicked!')}
              title="Clickable Calendar Icon"
              style={{ cursor: 'var(--interactions-cursor-pointer)' }}
            />{' '}
            Clickable
          </div>
          <div>
            <CalendarIcon
              className="custom-calendar-icon-class"
              title="Styled Calendar Icon with Custom Class"
              size={28}
              color="var(--colors-secondary-default)"
            />{' '}
            Custom Class & Hover
          </div>
          <div>
            <CalendarIcon
              style={{
                transform: 'rotate(-15deg)',
                filter: 'drop-shadow(1px 1px 1px var(--colors-overlay))',
                cursor: 'var(--interactions-cursor-grab)',
              }}
              title="Inline Styled Calendar Icon"
              color="var(--colors-status-warning-default)"
              size={30}
            />{' '}
            Inline Styles (Rotate, Shadow)
          </div>
           <div>
            <CalendarIcon
              title="Calendar Icon with Additional ARIA"
              aria-label="Open event schedule"
              role="button"
              tabIndex={0}
              onClick={() => console.log('Calendar icon activated via keyboard or click')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') console.log('Calendar icon activated via keyboard'); }}
              style={{ cursor: 'var(--interactions-cursor-pointer)', outlineColor: 'var(--colors-border-focus)' }}
            />{' '}
            ARIA Attributes & Keyboard Focus
          </div>
        </CompositionSection>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);