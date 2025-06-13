import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme, useInfinityThemeController } from '@infinity/design.infinity-theme';
import { ThemeToggler } from './theme-toggler.js';
import type { IconProps } from './icon-props-type.js';

// Helper component to display some content that reacts to theme changes
const DemoContent: React.FC<{ title: string }> = ({ title }) => {
  const themeController = useInfinityThemeController();
  if (!themeController) return <p>Error: Theme context not found.</p>;
  const { themeMode } = themeController;

  return (
    <div
      style={{
        backgroundColor: 'var(--colors-surface-primary)',
        color: 'var(--colors-text-primary)',
        padding: 'var(--spacing-medium)',
        borderRadius: 'var(--borders-radius-medium)',
        fontFamily: 'var(--typography-font-family)',
        margin: 'var(--spacing-medium) 0',
      }}
    >
      <h3 style={{ marginTop: 0, color: 'var(--colors-text-accent)', fontSize: 'var(--typography-sizes-heading-h5)' }}>{title}</h3>
      <p style={{ fontSize: 'var(--typography-sizes-body-default)'}}>
        Current theme: <strong>{themeMode}</strong>. This section showcases a newly launched product.
        Imagine discovering the next big thing in tech right here!
      </p>
      <button
        style={{
          backgroundColor: 'var(--colors-primary-default)',
          color: 'var(--colors-text-inverse)',
          border: 'none',
          padding: 'var(--spacing-small) var(--spacing-medium)',
          borderRadius: 'var(--borders-radius-small)',
          cursor: 'var(--interactions-cursor-pointer)',
          fontSize: 'var(--typography-sizes-button-medium)',
        }}
      >
        Upvote Product
      </button>
    </div>
  );
};

export const BasicThemeToggler = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="light">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '200px' }}>
        <p style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)'}}>
          Welcome to the Product Discovery Platform! Click the icon to switch themes.
        </p>
        <ThemeToggler />
        <DemoContent title="Latest Gadget Launch" />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ThemeTogglerInitializedDark = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="dark">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '200px' }}>
         <p style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)'}}>
          Platform initialized in dark mode. Toggle to see the light!
        </p>
        <ThemeToggler />
        <DemoContent title="Night Owl's Favorite App" />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

// Custom Star icon for sun replacement
const CustomStarIcon: React.FC<IconProps> = ({ size = 24, className, stroke = "currentColor", strokeWidth = "1.5", fill = "currentColor", ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Custom Heart icon for moon replacement
const CustomHeartIcon: React.FC<IconProps> = ({ size = 24, className, stroke = "currentColor", strokeWidth = "1.5", fill="currentColor", ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} {...rest}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const ThemeTogglerWithCustomIcons = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="light">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '200px' }}>
        <p style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)'}}>
          This toggler uses custom icons (Star for light, Heart for dark).
        </p>
        <ThemeToggler sunIcon={CustomStarIcon} moonIcon={CustomHeartIcon} />
        <DemoContent title="Community Favorite Idea" />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ThemeTogglerWithCustomSize = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="light">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '200px' }}>
        <p style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)'}}>
          This toggler has a larger icon size.
        </p>
        <ThemeToggler iconSize={32} />
        <DemoContent title="Big News in Startups" />
        <p style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)', marginTop: 'var(--spacing-medium)'}}>
          And this one is smaller.
        </p>
        <ThemeToggler iconSize={16} />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);