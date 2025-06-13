import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Badge } from './badge.js';
import type { BadgeColor, BadgeSize, BadgeVariant } from './badge.js';

// Helper Icon Components
const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em'}}>
    <path d="M13.5211 2.30298C13.0998 1.35911 12.5003 0.818165 12.0003 0.818165C11.5003 0.818165 10.9008 1.35911 10.4796 2.30298L9.00027 5.81817H5.18213C4.41427 5.81817 3.57169 6.31062 3.18169 6.92935L2.00027 9L6.00027 10.1818L6.90938 13.5917C7.20688 14.7321 7.78519 15.448 8.45482 15.8152C8.38737 16.2809 8.18213 17.2703 8.18213 18C8.18213 19.1818 9 20 10.1821 20H13.8185C15.0003 20 15.8185 19.1818 15.8185 18C15.8185 17.2703 15.6132 16.2809 15.5458 15.8152C16.2154 15.448 16.7937 14.7321 17.0912 13.5917L18.0003 10.1818L22.0003 9L20.8185 6.92935C20.4285 6.31062 19.5859 5.81817 18.818 5.81817H15.0003L13.5211 2.30298Z" />
    <path d="M8.18164 20V23.1818C8.18164 23.6337 8.54792 24 8.99983 24H10.9998C11.4517 24 11.818 23.6337 11.818 23.1818V20H8.18164Z" />
    <path d="M12.1816 20V23.1818C12.1816 23.6337 12.5479 24 12.9998 24H14.9998C15.4517 24 15.818 23.6337 15.818 23.1818V20H12.1816Z" />
  </svg>
);

const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em'}}>
    <path d="M21.41,11.58l-9-9C12.05,2.22,11.55,2,11,2H4C2.9,2,2,2.9,2,4v7c0,0.55,0.22,1.05,0.59,1.42l9,9 C11.95,21.78,12.45,22,13,22s1.05-0.22,1.41-0.59l7-7C22.22,13.62,22.22,12.38,21.41,11.58z M13,20l-9-9V4h7l9,9L13,20z"/>
    <circle cx="6.5" cy="6.5" r="1.5"/>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em'}}>
    <path d="M12,17.27L18.18,21L17,14.64L22,9.73L14.81,8.63L12,2L9.19,8.63L2,9.73L7,14.64L5.82,21L12,17.27Z"/>
  </svg>
);

// Helper for layout in compositions
const CompositionSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div style={{ 
      marginBottom: 'var(--spacing-x-large)', 
      padding: 'var(--spacing-medium)', 
      backgroundColor: 'var(--colors-surface-primary)', 
      borderRadius: 'var(--borders-radius-medium)',
      boxShadow: 'var(--effects-shadows-small)' 
    }}>
    <h3 style={{ 
        color: 'var(--colors-text-primary)', 
        fontSize: 'var(--typography-sizes-heading-h4)', 
        marginBottom: 'var(--spacing-medium)',
        fontFamily: 'var(--typography-font-family)',
        borderBottom: '1px solid var(--colors-border-subtle)',
        paddingBottom: 'var(--spacing-small)'
    }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-medium)', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export const BadgeColorShowcase = () => {
  const colors: BadgeColor[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'neutral'];
  const labels: Record<BadgeColor, string> = {
    primary: "New Product",
    secondary: "Hot Launch",
    success: "Successful Exit",
    warning: "Warning: Beta",
    danger: "Update Failed",
    info: "Dev Tool",
    neutral: "Community Pick"
  };

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
          <CompositionSection title="Filled Badges - Color Showcase (Medium Size)">
            {colors.map((color) => (
              <Badge key={color} label={labels[color]} variant="filled" color={color} size="medium" />
            ))}
          </CompositionSection>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const BadgeVariantAndSizeShowcase = () => {
  const variants: BadgeVariant[] = ['filled', 'outlined', 'ghost'];
  const sizes: BadgeSize[] = ['small', 'medium', 'large'];
  const representativeColors: BadgeColor[] = ['primary', 'neutral'];

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
          {representativeColors.map(color => (
            <CompositionSection key={color} title={`${color.charAt(0).toUpperCase() + color.slice(1)} Badges - Variants & Sizes`}>
              {variants.map((variant) =>
                sizes.map((size) => (
                  <Badge
                    key={`${variant}-${size}-${color}`}
                    label={`${variant} ${size}`}
                    variant={variant}
                    size={size}
                    color={color}
                  />
                ))
              )}
            </CompositionSection>
          ))}
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const BadgesWithIconsShowcase = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
          <CompositionSection title="Badges with Icons">
            <Badge label="Rocket Launch" variant="filled" color="primary" size="large" icon={RocketIcon} />
            <Badge label="Featured Tool" variant="outlined" color="success" size="medium" icon={StarIcon} />
            <Badge label="New Category" variant="ghost" color="info" size="small" icon={TagIcon} />
            <Badge label="SaaS Product" variant="filled" color="secondary" size="medium" icon={RocketIcon} />
            <Badge label="Trending" variant="outlined" color="warning" size="large" icon={StarIcon} />
            <Badge label="Archived" variant="ghost" color="neutral" size="small" />
            <Badge label="No Icon" variant="filled" color="danger" size="medium" />
          </CompositionSection>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};