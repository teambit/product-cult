import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductIcon } from './product-icon.js';
import styles from './product-icon.module.scss';

describe('ProductIcon', () => {
  it('should render the ProductIcon with default props', () => {
    const { container } = render(
      <MockProvider>
        <ProductIcon />
      </MockProvider>
    );

    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('viewBox', '0 0 24 24');
    expect(iconElement).toHaveClass(styles.productIcon);
    // Default title is "Product Icon"
    const titleElement = iconElement?.querySelector('title');
    expect(titleElement).toHaveTextContent('Product Icon');
  });

  it('should render the ProductIcon with a custom size', () => {
    const customSize = 32;
    const { container } = render(
      <MockProvider>
        <ProductIcon size={customSize} />
      </MockProvider>
    );

    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveAttribute('width', customSize.toString());
    expect(iconElement).toHaveAttribute('height', customSize.toString());
  });

  it('should render the ProductIcon with a custom color', () => {
    const customColor = 'red';
    const { container } = render(
      <MockProvider>
        <ProductIcon color={customColor} />
      </MockProvider>
    );

    const iconElement = container.querySelector('svg');
    expect(iconElement).toHaveAttribute('fill', customColor);
  });

  it('should render the ProductIcon with a custom title for accessibility', () => {
    const customTitle = 'My Custom Product Icon';
    const { container } = render(
      <MockProvider>
        <ProductIcon title={customTitle} />
      </MockProvider>
    );
    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    const titleElement = iconElement?.querySelector('title');
    expect(titleElement).toBeInTheDocument();
  });

  it('should render as decorative if no title is provided but default title is used', () => {
    const { container } = render(
      <MockProvider>
        {/* ProductIcon applies a default title, so it will have a title element */}
        <ProductIcon />
      </MockProvider>
    );
    const iconElement = container.querySelector('svg');
    expect(iconElement).toBeInTheDocument();
    const titleElement = iconElement?.querySelector('title');
    expect(titleElement).toBeInTheDocument(); // Default title is present
    expect(titleElement).toHaveTextContent('Product Icon');
  });
});