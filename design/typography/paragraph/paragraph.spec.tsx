import React from 'react';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './paragraph.js';
import styles from './paragraph.module.scss';

describe('Paragraph Component', () => {
  it('should render a paragraph with default props', () => {
    render(<Paragraph>Hello, world!</Paragraph>);
    const paragraphElement = screen.getByText('Hello, world!');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.tagName).toBe('P');
    expect(paragraphElement.className).toContain(styles.paragraph);
  });

  it('should render a paragraph with a custom element', () => {
    render(<Paragraph element="span">This is a span.</Paragraph>);
    const spanElement = screen.getByText('This is a span.');
    expect(spanElement).toBeInTheDocument();
    expect(spanElement.tagName).toBe('SPAN');
    expect(spanElement.className).toContain(styles.paragraph);
  });

  it('should apply custom class names to the paragraph', () => {
    render(<Paragraph className="custom-class">Custom styled paragraph</Paragraph>);
    const paragraphElement = screen.getByText('Custom styled paragraph');
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement.className).toContain(styles.paragraph);
    expect(paragraphElement.className).toContain('custom-class');
  });
});