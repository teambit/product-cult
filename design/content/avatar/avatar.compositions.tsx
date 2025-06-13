import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Avatar } from './avatar.js';
import type { AvatarSize, AvatarShape } from './avatar.js';

const imageURLs = [
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/rocket.svg',
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/star.svg',
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/lightbulb.svg',
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/search.svg',
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/scaffolding.svg',
  'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/reflect.svg',
];

const sectionStyle: React.CSSProperties = {
  marginBottom: 'var(--spacing-large)',
  padding: 'var(--spacing-medium)',
  border: '1px solid var(--colors-border-subtle)',
  borderRadius: 'var(--borders-radius-medium)',
  backgroundColor: 'var(--colors-surface-primary)',
};

const headingStyle: React.CSSProperties = {
  fontSize: 'var(--typography-sizes-heading-h4)',
  color: 'var(--colors-text-primary)',
  marginBottom: 'var(--spacing-medium)',
  fontFamily: 'var(--typography-font-family)',
  borderBottom: '1px solid var(--colors-border-default)',
  paddingBottom: 'var(--spacing-small)',
};

const avatarContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-medium)',
  alignItems: 'flex-start', // Align items to the top for consistent label positioning
  flexWrap: 'wrap',
  marginBottom: 'var(--spacing-small)',
};

const individualAvatarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-x-small)',
  minWidth: '80px', // Ensure enough space for avatar + label
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--typography-sizes-body-x-small)',
  color: 'var(--colors-text-secondary)',
  display: 'block',
  textAlign: 'center',
  fontFamily: 'var(--typography-font-family)',
  lineHeight: 'var(--typography-line-height-condensed)',
};

export const AvatarWithImages = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Avatars with Images</h3>
          <div style={avatarContainerStyle}>
            <div style={individualAvatarStyle}>
              <Avatar src={imageURLs[0]} alt="Rocket Launch" size="small" shape="circle" />
              <span style={labelStyle}>Small Circle<br/>(Rocket)</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar src={imageURLs[1]} alt="Star Icon" size="medium" shape="square" />
              <span style={labelStyle}>Medium Square<br/>(Star)</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar src={imageURLs[2]} alt="Lightbulb Idea" size="large" shape="circle" />
              <span style={labelStyle}>Large Circle<br/>(Lightbulb)</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar src={imageURLs[3]} alt="Search Magnifier" size="xlarge" shape="square" />
              <span style={labelStyle}>XLarge Square<br/>(Search)</span>
            </div>
          </div>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const AvatarWithInitials = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Avatars with Initials (Derived and Explicit)</h3>
          <div style={avatarContainerStyle}>
            <div style={individualAvatarStyle}>
              <Avatar initials="PH" alt="Ignored Alt" size="medium" shape="circle" />
              <span style={labelStyle}>Medium Circle<br/>Initials: PH</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar alt="Frontend Developer" size="large" shape="square" />
              <span style={labelStyle}>Large Square<br/>Alt: FD</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar initials="S" size="small" shape="circle" />
              <span style={labelStyle}>Small Circle<br/>Initials: S</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar alt="Community Manager Pro" size="xlarge" shape="square" />
              <span style={labelStyle}>XLarge Square<br/>Alt: CM</span>
            </div>
             <div style={individualAvatarStyle}>
              <Avatar alt="AI" size="medium" shape="circle" />
              <span style={labelStyle}>Medium Circle<br/>Alt: AI</span>
            </div>
          </div>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const AvatarFallbacks = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Avatar Fallbacks (Image Error & Missing Info)</h3>
          <div style={avatarContainerStyle}>
            <div style={individualAvatarStyle}>
              <Avatar src="nonexistent-image.jpg" alt="User One" initials="U1" size="medium" shape="circle" />
              <span style={labelStyle}>Error, Initials: U1</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar src="broken-link.png" alt="Launch Pad" size="large" shape="square" />
              <span style={labelStyle}>Error, Alt: LP</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar src="another-fail.gif" alt="Service" size="small" shape="circle" />
              <span style={labelStyle}>Error, Alt: S</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar size="xlarge" shape="square" alt="Design" />
              <span style={labelStyle}>No Src, Alt: D</span>
            </div>
            <div style={individualAvatarStyle}>
              <Avatar size="medium" shape="circle" />
              <span style={labelStyle}>No Src/Alt/Initials<br/>(Placeholder)</span>
            </div>
          </div>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const AllAvatarShapesAndSizes = () => (
  <MemoryRouter>
    <InfinityTheme>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)' }}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Comprehensive Size & Shape Matrix</h3>
          {(['small', 'medium', 'large', 'xlarge'] as AvatarSize[]).map((size, sizeIndex) => (
            <div key={size} style={{ ...avatarContainerStyle, marginBottom: 'var(--spacing-medium)' }}>
              {(['circle', 'square'] as AvatarShape[]).map((shape, shapeIndex) => {
                const imageIndex = (sizeIndex * 2 + shapeIndex) % imageURLs.length;
                // Alternate between image and initials/alt based fallbacks
                const showImage = (sizeIndex + shapeIndex) % 3 === 0;
                const showExplicitInitials = (sizeIndex + shapeIndex) % 3 === 1;

                const altText = `${size.charAt(0).toUpperCase() + size.slice(1)} ${shape}`;
                // Construct more diverse initials
                const initials = `${size.charAt(0).toUpperCase()}${shape.charAt(0).toUpperCase()}`;

                return (
                  <div key={shape} style={individualAvatarStyle}>
                    <Avatar
                      src={showImage ? imageURLs[imageIndex] : undefined}
                      alt={altText}
                      initials={showExplicitInitials ? initials : undefined}
                      size={size}
                      shape={shape}
                    />
                    <span style={labelStyle}>
                      {altText}<br/>
                      {showImage ? `Img: ${imageURLs[imageIndex].split('/').pop()?.substring(0,10)}...` : (showExplicitInitials ? `Initials: ${initials}` : `Alt Fallback`)}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);