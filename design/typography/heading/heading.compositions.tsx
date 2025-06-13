import React from 'react';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Heading } from './heading.js';

const wrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  backgroundColor: 'var(--colors-surface-background)', // Ensure background for visibility
};

export const AllHeadingLevels = () => {
  return (
    <InfinityTheme>
      <div style={wrapperStyle}>
        <Heading level={1}>Discover Tomorrow's Products, Today (H1)</Heading>
        <Heading level={2}>Latest Product Launches (H2)</Heading>
        <Heading level={3}>Top Rated Innovations (H3)</Heading>
        <Heading level={4}>Community Discussions (H4)</Heading>
        <Heading level={5}>Upcoming Tech Events (H5)</Heading>
        <Heading level={6}>Archived Newsletters (H6)</Heading>
      </div>
    </InfinityTheme>
  );
};

export const VisualLevelOverride = () => {
  return (
    <InfinityTheme>
      <div style={wrapperStyle}>
        <Heading level={1} visualLevel={3}>
          Main Section (H1 Semantics, H3 Visuals)
        </Heading>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
          This heading is semantically an H1 for SEO and accessibility, but visually styled like an H3.
          Useful for maintaining document structure while adjusting visual hierarchy.
        </p>
        <Heading level={2} visualLevel={5}>
          Product Category (H2 Semantics, H5 Visuals)
        </Heading>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
          Semantically an H2, but styled with the smaller H5 appearance for a less prominent look.
        </p>
        <Heading level={4} visualLevel={1}>
          Important Notice (H4 Semantics, H1 Visuals)
        </Heading>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
          This H4 is styled like an H1 for emphasis, perhaps for a critical announcement within a smaller section.
        </p>
      </div>
    </InfinityTheme>
  );
};

export const WithCustomStyling = () => {
  return (
    <InfinityTheme>
      <div style={wrapperStyle}>
        <Heading
          level={2}
          className="custom-heading-class"
          style={{
            color: 'var(--colors-primary-default)',
            borderBottom: '2px solid var(--colors-border-subtle)',
            paddingBottom: 'var(--spacing-x-small)',
          }}
        >
          Featured Products This Week
        </Heading>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)' }}>
          This H2 heading has a custom class for additional CSS targeting (though not visually demonstrated here without external CSS)
          and inline styles for a primary color, bottom border, and padding.
        </p>
        <Heading
          level={3}
          style={{ textTransform: 'uppercase', letterSpacing: 'var(--typography-letter-spacing-wide)' }}
        >
          Founder Interviews
        </Heading>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)' }}>
          This H3 heading uses inline styles for uppercase transformation and wider letter spacing.
        </p>
      </div>
    </InfinityTheme>
  );
};

export const HeadingsInArticleContext = () => {
  return (
    <InfinityTheme>
      <div style={{ ...wrapperStyle, maxWidth: '700px', margin: 'auto', backgroundColor: 'var(--colors-surface-primary)', borderRadius: 'var(--borders-radius-large)', boxShadow: 'var(--effects-shadows-medium)' }}>
        <header style={{ marginBottom: 'var(--spacing-large)' }}>
          <Heading level={1}>The Future of AI in Product Development</Heading>
          <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-medium)' }}>
            An in-depth look at how artificial intelligence is reshaping the product landscape.
          </p>
        </header>
        <article>
          <Heading level={2}>Understanding AI's Role</Heading>
          <p style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-body-default)', lineHeight: 'var(--typography-line-height-relaxed)' }}>
            Artificial intelligence is no longer a futuristic concept but a present-day tool revolutionizing how products are conceived,
            designed, and launched. From predictive analytics to generative design, AI offers unprecedented capabilities.
          </p>
          <img
            src="https://images.unsplash.com/photo-1660914256311-918659fae88f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBzdHJ1Y3R1cmV8ZW58MXwwfHxibGFja3wxNzQ5NTk3OTc0fDA&ixlib=rb-4.1.0"
            alt="Abstract digital structure"
            style={{ width: '100%', borderRadius: 'var(--borders-radius-medium)', margin: 'var(--spacing-medium) 0' }}
          />
          <Heading level={3}>AI-Powered Product Discovery</Heading>
          <p style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-body-default)', lineHeight: 'var(--typography-line-height-relaxed)' }}>
            Platforms are now using AI to analyze market trends and user feedback at scale, identifying unmet needs and opportunities for new products.
            This significantly reduces the guesswork in early-stage product development.
          </p>
          <Heading level={4} visualLevel={5}>Ethical Considerations</Heading>
          <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', lineHeight: 'var(--typography-line-height-base)' }}>
            While the benefits are immense, the integration of AI also brings ethical challenges that product teams must navigate carefully,
            including data privacy and algorithmic bias.
          </p>
        </article>
      </div>
    </InfinityTheme>
  );
};