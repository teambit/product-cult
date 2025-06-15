import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UpvoteIcon } from './upvote-icon.js';
import styles from './upvote-icon.module.scss';

describe('UpvoteIcon', () => {
  it('should render the upvote icon with default props', () => {
    const { container } = render(<UpvoteIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('should toggle the active state when clicked', () => {
    const onClick = vi.fn();
    const { container } = render(<UpvoteIcon onClick={onClick} />);
    const svgElement = container.querySelector('svg') as SVGSVGElement;
    expect(svgElement).toBeInTheDocument();

    fireEvent.click(svgElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply the active class when isActive is true', () => {
    const { container } = render(<UpvoteIcon isActive={true} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveClass(styles.upvoteIcon);
    expect(svgElement).toHaveClass(styles.active);
  });
});