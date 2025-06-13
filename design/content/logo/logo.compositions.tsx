import React, { type SVGProps } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Logo } from './logo.js';
import { DefaultLogo } from './default-logo.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-large)',
  alignItems: 'flex-start',
  backgroundColor: 'var(--colors-surface-background)', // Ensure background for theme context
};

export const BasicLogo = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const LogoWithSlogan = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo slogan="Discover your next favorite thing." />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const MinimalLogo = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo minimal={true} />
        <Logo minimal={true} name="Minimal With Name (for ARIA)" logoSize={50} />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const CustomSizeLogo = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo logoSize={60} slogan="Big ideas, bigger logo!" />
        <Logo logoSize={24} name="TinyBrand" slogan="Small but mighty" />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

const CustomCatLogo: React.FC<SVGProps<SVGSVGElement>> = ({ width, height, className, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...rest}
  >
    <rect width="100" height="100" rx="20" fill="#3498db" />
    <circle cx="30" cy="30" r="10" fill="white" />
    <circle cx="70" cy="30" r="10" fill="white" />
    <path d="M30 70 Q50 90 70 70 Q50 80 30 70 Z" fill="white" />
    <rect x="45" y="50" width="10" height="20" fill="#2c3e50" />
  </svg>
);

export const CustomSvgAndBrandingLogo = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo
          svgLogo={CustomCatLogo}
          name="Cat Ventures"
          slogan="Innovating with nine lives."
          logoSize={50}
          href="/cats"
        />
        <Logo
          svgLogo={CustomCatLogo}
          name="Cat Ventures Minimal"
          minimal
          logoSize={30}
          href="/cats/minimal"
        />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const LogoWithDifferentHref = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={containerStyle}>
        <Logo
          href="/launches"
          name="Product Launches"
          slogan="See what's new!"
        />
         <Logo
          href="https://example.com" // External link, Link component handles this
          name="External Site"
          slogan="Visit our partners"
        />
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const MultipleLogosForAlignment = () => (
    <MemoryRouter>
        <InfinityTheme>
            <div style={{ ...containerStyle, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Logo name="Brand A" slogan="Slogan A" logoSize={40} />
                <Logo svgLogo={DefaultLogo} name="Brand B" logoSize={50} />
                <Logo minimal={true} logoSize={30} />
                <Logo name="Brand C Only Name" logoSize={40} />
                <Logo slogan="Only Slogan & Logo" logoSize={35} />
            </div>
        </InfinityTheme>
    </MemoryRouter>
);