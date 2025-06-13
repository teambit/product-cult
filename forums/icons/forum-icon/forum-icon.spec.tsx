import React from 'react';
import { render } from '@testing-library/react';
import { ForumIcon } from './forum-icon.js';

describe('ForumIcon', () => {
  it('should render the ForumIcon with default title', () => {
    const { container } = render(<ForumIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('aria-label')).toBe('Forum');
  });

  it('should render the ForumIcon with custom title', () => {
    const customTitle = 'Community Discussions';
    const { container } = render(<ForumIcon title={customTitle} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('aria-label')).toBe(customTitle);
  });

  it('should render the ForumIcon with a specific size', () => {
    const size = 32;
    const { container } = render(<ForumIcon size={size} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe(String(size));
    expect(svgElement?.getAttribute('height')).toBe(String(size));
  });
});