import React from 'react';
import { render } from '@testing-library/react';
import { SearchIcon } from './search-icon.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';

describe('SearchIcon', () => {
  it('should render the search icon with default title', () => {
    const { container } = render(
      <MockProvider>
        <SearchIcon />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', 'Search');
  });

  it('should render the search icon with custom title', () => {
    const { container } = render(
      <MockProvider>
        <SearchIcon title="Find Products" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', 'Find Products');
  });

  it('should render the search icon with custom size', () => {
    const { container } = render(
      <MockProvider>
        <SearchIcon size={32} />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });
});