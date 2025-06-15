import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DownvoteIcon } from './downvote-icon.js';
import styles from './downvote-icon.module.scss';

describe('DownvoteIcon', () => {
  it('should render the downvote icon with default props', () => {
    const { container } = render(
      <MemoryRouter>
        <DownvoteIcon />
      </MemoryRouter>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svgElement).toHaveClass(styles.downvoteIcon);
  });

  it('should render the downvote icon in active state', () => {
    const { container } = render(
      <MemoryRouter>
        <DownvoteIcon isActive />
      </MemoryRouter>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });
});
