import React from 'react';
import { render } from '@testing-library/react';
import { PlusIcon } from './plus-icon.js';

describe('PlusIcon', () => {
  it('should render the PlusIcon with default title', () => {
    const { container } = render(<PlusIcon />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', 'Plus Icon');
  });

  it('should render the PlusIcon with custom title', () => {
    const customTitle = 'Add New Item';
    const { container } = render(<PlusIcon title={customTitle} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', customTitle);
  });

  it('should render the PlusIcon with custom size', () => {
    const customSize = 32;
    const { container } = render(<PlusIcon size={customSize} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', customSize.toString());
    expect(svgElement).toHaveAttribute('height', customSize.toString());
  });
});