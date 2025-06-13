import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useTheme } from './infinity-theme-provider.js';
import { InfinityTheme } from './infinity-theme.js';
import { TokenViewer } from '@bitdesign/sparks.sparks-theme';
import { useInfinityThemeController } from './infinity-theme-controller.js';
import type { InfinityThemeSchema } from './infinity-theme-tokens.js';
import type { DeepPartial } from '@bitdesign/sparks.sparks-theme';

// Private helper component to display all theme tokens
function ViewTokens() {
  const theme = useTheme();
  return <TokenViewer theme={theme} />;
}

// Private helper component to render sample UI elements
const SampleUiContent = ({ title }: { title: string }) => (
  <div style={{
    padding: 'var(--spacing-medium)',
    fontFamily: 'var(--typography-font-family)',
    border: `1px solid var(--colors-border-default)`,
    borderRadius: 'var(--borders-radius-large)',
    marginBottom: 'var(--spacing-large)',
    backgroundColor: 'var(--colors-surface-secondary)'
  }}>
    <h2 style={{
      fontSize: 'var(--typography-sizes-heading-h2)',
      color: 'var(--colors-text-primary)',
      marginBottom: 'var(--spacing-small)',
      fontFamily: 'inherit'
    }}>{title}</h2>
    <p style={{
      fontSize: 'var(--typography-sizes-body-default)',
      color: 'var(--colors-text-secondary)',
      lineHeight: 'var(--typography-line-height-base)',
      marginBottom: 'var(--spacing-medium)',
      fontFamily: 'inherit'
    }}>
      Welcome to "Product Spotlight"! Discover innovative products and launches daily.
      This content area dynamically uses the theme's typography, spacing, and color tokens.
    </p>
    <button style={{
      backgroundColor: 'var(--colors-primary-default)',
      color: 'var(--colors-text-inverse)',
      padding: 'var(--spacing-small) var(--spacing-medium)',
      border: 'none',
      borderRadius: 'var(--borders-radius-medium)',
      cursor: 'var(--interactions-cursor-pointer)',
      fontSize: 'var(--typography-sizes-button-medium)',
      fontWeight: 'var(--typography-font-weight-semiBold)',
      fontFamily: 'inherit',
      transition: 'background-color var(--interactions-transitions-duration-fast) var(--interactions-transitions-easing-easeInOut)'
    }}>
      Explore Products
    </button>

    <div style={{
        backgroundColor: 'var(--colors-surface-primary)',
        padding: 'var(--spacing-medium)',
        borderRadius: 'var(--borders-radius-medium)',
        boxShadow: 'var(--effects-shadows-medium)',
        marginTop: 'var(--spacing-large)',
        maxWidth: '400px',
        border: `1px solid var(--colors-border-subtle)`
    }}>
        <h4 style={{
            fontSize: 'var(--typography-sizes-heading-h4)',
            color: 'var(--colors-text-primary)',
            margin: '0 0 var(--spacing-small) 0',
            fontFamily: 'inherit'
        }}>
            Featured Launch
        </h4>
        <p style={{
            fontSize: 'var(--typography-sizes-body-small)',
            color: 'var(--colors-text-secondary)',
            margin: '0 0 var(--spacing-medium) 0',
            fontFamily: 'inherit'
        }}>
            Check out the latest AI-powered productivity tool that's changing the game!
        </p>
        <a href="#" style={{
            color: 'var(--colors-text-accent)',
            textDecoration: 'none',
            fontWeight: 'var(--typography-font-weight-medium)',
            fontFamily: 'inherit',
            fontSize: 'var(--typography-sizes-body-small)'
        }}>
            View Details &rarr;
        </a>
    </div>
  </div>
);

export const LightThemeShowcase = () => {
  return (
    <MemoryRouter>
      <InfinityTheme initialTheme="light">
        <div style={{ padding: 'var(--spacing-large)' }}>
          <SampleUiContent title="Light Theme in Action" />
          <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h3)', marginBottom: 'var(--spacing-medium)' }}>Light Theme Tokens:</h3>
          <ViewTokens />
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const DarkThemeShowcase = () => {
  return (
    <MemoryRouter>
      <InfinityTheme initialTheme="dark">
        <div style={{ padding: 'var(--spacing-large)' }}>
          <SampleUiContent title="Dark Theme in Action" />
          <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h3)', marginBottom: 'var(--spacing-medium)' }}>Dark Theme Tokens:</h3>
          <ViewTokens />
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const InteractiveThemeAndOverrides = () => {
  // Example overrides for this specific theme instance
  const customInstanceOverrides: DeepPartial<InfinityThemeSchema> = {
    colors: {
      primary: {
        default: '#8E44AD', // A custom purple
        hover: '#7D3C98',
      },
      text: {
        accent: '#1ABC9C', // A custom teal for accent text
      }
    },
    typography: {
      fontFamily: "'Georgia', serif", // Change base font family for this instance
      sizes: {
        body: {
          default: '17px' // Slightly larger default body text
        }
      }
    },
    spacing: {
      medium: '20px' // Slightly larger medium spacing
    },
    borders: {
        radius: {
            medium: '12px' // More rounded medium elements
        }
    }
  };

  // Inner component to demonstrate theme controller usage
  const ThemeControllerDemoComponent = () => {
    const { themeMode, toggleTheme, setThemeMode } = useInfinityThemeController();
    return (
      <div style={{
        marginBottom: 'var(--spacing-medium)',
        padding: 'var(--spacing-medium)',
        border: `2px dashed var(--colors-primary-default)`, // Use the overridden primary color for border
        borderRadius: 'var(--borders-radius-large)',
        backgroundColor: 'var(--colors-surface-primary)'
      }}>
        <h3 style={{color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h5)', fontFamily: 'inherit', marginTop: 0}}>Theme Controls</h3>
        <p style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', fontFamily: 'inherit'}}>
            Current Mode: <strong>{themeMode}</strong>. This section demonstrates runtime theme switching.
            Notice how elements below (including this box's border) might use overridden tokens.
        </p>
        <button onClick={toggleTheme} style={{ marginRight: 'var(--spacing-small)', padding: 'var(--spacing-xSmall) var(--spacing-small)', backgroundColor: 'var(--colors-secondary-default)', color: 'var(--colors-text-primary)', border: `1px solid var(--colors-border-default)`, borderRadius: 'var(--borders-radius-small)', fontFamily: 'inherit' }}>Toggle Theme</button>
        <button onClick={() => setThemeMode('light')} style={{ marginRight: 'var(--spacing-small)', padding: 'var(--spacing-xSmall) var(--spacing-small)', backgroundColor: 'var(--colors-surface-secondary)', color: 'var(--colors-text-primary)', border: `1px solid var(--colors-border-default)`, borderRadius: 'var(--borders-radius-small)', fontFamily: 'inherit' }}>Set Light</button>
        <button onClick={() => setThemeMode('dark')} style={{ padding: 'var(--spacing-xSmall) var(--spacing-small)', backgroundColor: 'var(--colors-surface-secondary)', color: 'var(--colors-text-primary)', border: `1px solid var(--colors-border-default)`, borderRadius: 'var(--borders-radius-small)', fontFamily: 'inherit' }}>Set Dark</button>
      </div>
    );
  }

  return (
    <MemoryRouter>
      <InfinityTheme initialTheme="light" overrides={customInstanceOverrides}>
        <div style={{ padding: 'var(--spacing-large)' }}>
          <ThemeControllerDemoComponent />
          <SampleUiContent title="Interactive Demo with Overrides" />
          <div style={{marginTop: 'var(--spacing-large)', padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-primary)', borderRadius: 'var(--borders-radius-medium)'}}>
              <p style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-body-default)', fontFamily: 'var(--typography-font-family)'}}>
                  This paragraph uses the overridden base font family ('Georgia, serif') and body text size ('17px').
                  The button in "SampleUiContent" above uses the overridden primary color (purple) and border radius.
                  This <strong style={{color: 'var(--colors-text-accent)', fontFamily: 'inherit'}}>accented text</strong> should use the overridden accent color (teal).
              </p>
          </div>
          <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h3)', margin: 'var(--spacing-large) 0 var(--spacing-medium) 0' }}>Tokens (with Overrides Applied):</h3>
          <ViewTokens />
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};