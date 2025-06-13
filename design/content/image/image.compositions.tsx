import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Image } from './image.js';

// Helper component to wrap each composition for consistent styling and layout
const CompositionWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div style={{
    marginBlockEnd: 'var(--spacing-large, 24px)',
    padding: 'var(--spacing-medium, 16px)',
    backgroundColor: 'var(--colors-surface-secondary, #f8f9fa)', // Fallback color
    borderRadius: 'var(--borders-radius-large, 8px)',
    border: '1px solid var(--colors-border-default, #dee2e6)', // Fallback color
    maxWidth: '600px', // Max width for better readability in compositions
    marginInline: 'auto', // Center the wrapper
  }}>
    <h3 style={{
        color: 'var(--colors-text-primary, #212529)', // Fallback color
        fontFamily: 'var(--typography-font-family, sans-serif)',
        fontSize: 'var(--typography-sizes-heading-h5, 1.25rem)', // Using theme typography sizes
        marginBottom: 'var(--spacing-medium, 16px)',
        borderBottom: '1px solid var(--colors-border-subtle, #e9ecef)', // Fallback color
        paddingBottom: 'var(--spacing-small, 8px)',
    }}>{title}</h3>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export const ResponsiveProductUIImage = () => (
  <MemoryRouter>
    <InfinityTheme>
      <CompositionWrapper title="Responsive Product UI Image">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkJTIwdWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Dashboard UI screenshot for a new analytics application"
        />
      </CompositionWrapper>
    </InfinityTheme>
  </MemoryRouter>
);

export const FixedSizeGadgetImageWithCover = () => (
  <MemoryRouter>
    <InfinityTheme>
      <CompositionWrapper title="Fixed Size Gadget Image (Cover)">
        <Image
          src="https://images.unsplash.com/photo-1617289746955-a58c1799a6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3QlMjBsYXVuY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="A modern drone gadget showcased"
          width="300px"
          height={200} // Pixel value as number
          objectFit="cover"
        />
      </CompositionWrapper>
    </InfinityTheme>
  </MemoryRouter>
);

export const ContainedLogoImageWithClassName = () => (
  <MemoryRouter>
    <InfinityTheme>
      <CompositionWrapper title="Contained Logo Image (Contain) with Custom Class">
        <Image
          src="https://images.unsplash.com/photo-1611162616805-637491638011?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
          alt="Abstract colorful logo for a startup"
          width="150px"
          height="150px"
          objectFit="contain"
          className="custom-logo-image-style" // This class can be targeted by external CSS for additional styling
        />
      </CompositionWrapper>
    </InfinityTheme>
  </MemoryRouter>
);

export const ImageWithSpecificDimensionsAndFit = () => (
  <MemoryRouter>
    <InfinityTheme>
      <CompositionWrapper title="Image with Scale-Down Object Fit">
        {/* This image is larger than its container, objectFit='scale-down' will behave like 'contain' */}
        <div style={{ width: '200px', height: '150px', border: '1px dashed var(--colors-border-subtle)', overflow: 'hidden'}}>
          <Image
            src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="A cosmetic product bottle"
            width="400px" // Natural width is larger than container
            height="300px" // Natural height is larger than container
            objectFit="scale-down" // Will scale down to fit within 200x150
          />
        </div>
      </CompositionWrapper>
    </InfinityTheme>
  </MemoryRouter>
);