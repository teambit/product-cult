import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Spinner } from './spinner.js';
import type { SpinnerSize } from './spinner.js';

const CompositionContainer = ({ children, title }: { children: React.ReactNode, title: string }) => (
  <div style={{ marginBottom: 'var(--spacing-large)', padding: 'var(--spacing-medium)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-medium)', backgroundColor: 'var(--colors-surface-primary)' }}>
    <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h5)', marginBottom: 'var(--spacing-medium)', marginTop: 0 }}>
      {title}
    </h3>
    <div style={{ display: 'flex', gap: 'var(--spacing-large)', alignItems: 'center', flexWrap: 'wrap' }}>
      {children}
    </div>
  </div>
);

export const DefaultAndSizedSpinners = () => {
  const sizes: SpinnerSize[] = ['small', 'medium', 'large', 'x-large'];
  return (
    <MemoryRouter>
      <InfinityTheme initialTheme="light">
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
          <CompositionContainer title="Spinner Sizes (medium is default)">
            {sizes.map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
                <Spinner size={size} />
                <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
              </div>
            ))}
          </CompositionContainer>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const CustomColorAndThicknessSpinners = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="light">
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <CompositionContainer title="Custom Color & Thickness">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner color="var(--colors-secondary-default)" />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Color: Secondary</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner color="#E91E63" /> {/* Hot Pink */}
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Color: #E91E63</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner thickness={5} />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Thickness: 5px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner color="var(--colors-status-warning-default)" thickness={2} size="large" />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Warning, 2px, Large</span>
          </div>
        </CompositionContainer>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const SpinnersWithAdditionalAttributes = () => (
  <MemoryRouter>
    <InfinityTheme initialTheme="light">
      {/* Style tag for custom className demonstration */}
      <style>{`
        .custom-spinner-appearance {
          box-shadow: 0 0 8px var(--colors-primary-hover);
          /* Example: transform can be applied if needed but might interfere with spinner animation */
          /* transform: scale(1.1); */
        }
      `}</style>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <CompositionContainer title="Additional Attributes (ARIA, className, style)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner ariaLabel="Loading user profile..." />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>ARIA: "Loading profile..."</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner className="custom-spinner-appearance" size="large" />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Custom Class (adds shadow)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-small)'}}>
            <Spinner style={{ opacity: 0.7, borderRadius: '0px' }} thickness={4} />
            <span style={{ fontSize: 'var(--typography-sizes-body-x-small)', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)' }}>Style (opacity, square-ish)</span>
          </div>
        </CompositionContainer>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);