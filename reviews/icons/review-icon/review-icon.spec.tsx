import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ReviewIcon } from './review-icon.js';

describe('ReviewIcon', () => {
  it('should render the ReviewIcon with a default size and color', () => {
    const { container } = render(
      <MockProvider>
        <ReviewIcon title="Test Review Icon" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('24');
    expect(svgElement?.getAttribute('height')).toBe('24');
  });

  it('should render the ReviewIcon with a specified size', () => {
    const { container } = render(
      <MockProvider>
        <ReviewIcon size={32} title="Test Review Icon" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('width')).toBe('32');
    expect(svgElement?.getAttribute('height')).toBe('32');
  });

  it('should render the ReviewIcon with a specified color', () => {
    const { container } = render(
      <MockProvider>
        <ReviewIcon color="var(--colors-primary-default)" title="Test Review Icon" />
      </MockProvider>
    );
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.getAttribute('fill')).toBe('var(--colors-primary-default)');
  });
});