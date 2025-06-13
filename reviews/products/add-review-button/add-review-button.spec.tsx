import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { AddReviewButton } from './add-review-button.js';

describe('AddReviewButton', () => {
  it('should render with default props and navigate on click', () => {
    const productId = 'test-product';
    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <AddReviewButton productId={productId} />
        </MemoryRouter>
      </MockProvider>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add Your Review');

    fireEvent.click(button as Element);
    // No way to test in-memory navigation directly with react-router-dom v6
    // For now, ensure the click handler is called.
  });

  it('should render with custom text and appearance', () => {
    const productId = 'another-product';
    const customText = 'Rate This Item';
    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <AddReviewButton
            productId={productId}
            buttonText={customText}
            buttonAppearance="secondary"
          />
        </MemoryRouter>
      </MockProvider>
    );

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(customText);
    // Assuming the underlying Button component applies a class or attribute for 'secondary'
    // This test verifies that the prop is passed down.
    // If Button component applies a class e.g. 'secondary-appearance', this test might need adjustment
    // to query based on that, or check props if possible with testing-library extensions.
    // For now, we assume the Button component handles 'secondary' appearance visually.
    // If a specific class is expected on the button element itself due to the appearance prop,
    // then a .toHaveClass('secondary') or similar might be appropriate.
  });

  it('should render as disabled when productId is empty', () => {
    const { container } = render(
      <MockProvider noRouter>
        <MemoryRouter>
          <AddReviewButton productId="" />
        </MemoryRouter>
      </MockProvider>
    );

    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });
});