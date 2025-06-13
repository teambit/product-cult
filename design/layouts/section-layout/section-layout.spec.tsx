import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SectionLayout } from './section-layout.js';
import styles from './section-layout.module.scss';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';

describe('SectionLayout', () => {
  it('should render children within the content container', () => {
    const { container } = render(
      <MemoryRouter>
        <SectionLayout>
          <Paragraph>Test Content</Paragraph>
        </SectionLayout>
      </MemoryRouter>
    );
    const contentContainer = container.querySelector(`.${styles.contentContainer}`);
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveTextContent('Test Content');
  });

  it('should render title and subtitle when provided as strings', () => {
    render(
      <MemoryRouter>
        <SectionLayout title="Test Title" subtitle="Test Subtitle">
          <Paragraph>Test Content</Paragraph>
        </SectionLayout>
      </MemoryRouter>
    );

    const titleHeadingElement = screen.getByRole('heading', { name: /Test Title/i, level: 2 });
    expect(titleHeadingElement).toBeInTheDocument();
    expect(titleHeadingElement).toHaveClass(styles.title);
    expect(titleHeadingElement.textContent).toBe('Test Title');

    const subtitleParagraphElement = screen.getByText('Test Subtitle');
    expect(subtitleParagraphElement).toBeInTheDocument();
    expect(subtitleParagraphElement.tagName.toLowerCase()).toBe('p');
    expect(subtitleParagraphElement).toHaveClass(styles.subtitle);
    expect(subtitleParagraphElement.textContent).toBe('Test Subtitle');
  });

  it('should render custom title and subtitle nodes', () => {
    const customTitleText = 'Custom Title';
    const customSubtitleText = 'Custom Subtitle';
    const customTitle = <Heading level={3}>{customTitleText}</Heading>;
    const customSubtitle = <Paragraph>{customSubtitleText}</Paragraph>;

    const { container } = render(
      <MemoryRouter>
        <SectionLayout title={customTitle} subtitle={customSubtitle}>
          <Paragraph>Test Content</Paragraph>
        </SectionLayout>
      </MemoryRouter>
    );

    // When custom nodes are passed, SectionLayout does not add styles.title/styles.subtitle.
    const titleElementByClass = container.querySelector(`.${styles.title}`);
    const subtitleElementByClass = container.querySelector(`.${styles.subtitle}`);

    expect(titleElementByClass).toBeNull();
    expect(subtitleElementByClass).toBeNull();

    // Verify the custom nodes are rendered by their content and role/tag.
    const renderedCustomTitle = screen.getByRole('heading', { name: customTitleText, level: 3 });
    expect(renderedCustomTitle).toBeInTheDocument();

    const renderedCustomSubtitle = screen.getByText(customSubtitleText);
    expect(renderedCustomSubtitle).toBeInTheDocument();
    expect(renderedCustomSubtitle.tagName.toLowerCase()).toBe('p');
  });
});