import React from 'react';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Paragraph } from './paragraph.js';

export const DefaultParagraph = () => (
  <InfinityTheme>
    <div style={{ padding: 'var(--spacing-medium)' }}>
      <Paragraph>
        Welcome to ProductSpotlight, your daily source for the latest and greatest
        tech innovations. Discover new products, share your feedback, and connect
        with makers from around the globe.
      </Paragraph>
      <Paragraph>
        This is another paragraph to show default spacing and typography.
        Our platform highlights trending gadgets, software, and tools that
        are shaping the future.
      </Paragraph>
    </div>
  </InfinityTheme>
);

export const ParagraphAsSpan = () => (
  <InfinityTheme>
    <div style={{ padding: 'var(--spacing-medium)' }}>
      <Paragraph element="span">
        This text is rendered as a span element.
      </Paragraph>
      {' '}This allows it to be used inline with other text,
      <Paragraph element="span" style={{ fontWeight: 'var(--typography-font-weight-bold)', marginLeft: 'var(--spacing-x-small)' }}>
        like this bolded part.
      </Paragraph>
      <Paragraph>
        Following this, a standard paragraph resumes on a new line, showcasing block vs. inline behavior.
      </Paragraph>
    </div>
  </InfinityTheme>
);

export const ParagraphWithCustomStyling = () => (
  <InfinityTheme>
    <div style={{ padding: 'var(--spacing-medium)' }}>
      <Paragraph className="custom-intro-text">
        This paragraph has a custom class 'custom-intro-text' which could be
        used for specific styling overrides if defined in a global stylesheet or
        a parent component's styles. For example, it might have a unique font size or margin.
      </Paragraph>
      <Paragraph style={{
        color: 'var(--colors-text-accent)',
        fontSize: 'var(--typography-sizes-body-large)',
        fontStyle: 'italic',
      }}>
        This paragraph uses the 'style' prop for direct inline styling. Here,
        we've changed the text color to accent, increased the font size, and made it italic.
        This is useful for highly specific, non-reusable styles.
      </Paragraph>
      <Paragraph>
        Upcoming Launch: "InnovateHub X" - A new platform for collaborative project management.
        Stay tuned for more details and early access opportunities.
      </Paragraph>
    </div>
  </InfinityTheme>
);

export const ParagraphsWithVaryingContent = () => (
  <InfinityTheme>
    <div style={{ padding: 'var(--spacing-medium)', maxWidth: '600px' }}>
      <Paragraph>
        <strong>Product Hunt Weekly Digest:</strong>
      </Paragraph>
      <Paragraph element="p">
        Discover the top 5 products launched this week, handpicked by our community.
        From AI-powered productivity tools to innovative hardware, there's something
        for everyone.
      </Paragraph>
      <Paragraph element="div">
        <em>Maker's Spotlight:</em> An interview with the creators of "CodeStream AI",
        discussing their journey and the future of AI in software development. This
        paragraph is rendered as a 'div' for semantic grouping if needed.
      </Paragraph>
      <Paragraph>
        Join our forums to discuss the latest trends, ask questions, and share your
        own product discoveries. Your next favorite app might be just a click away!
      </Paragraph>
    </div>
  </InfinityTheme>
);