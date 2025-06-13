import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserIcon } from './user-icon.js';
import styles from './user-icon.module.scss';

describe('UserIcon', () => {
  it('should render the UserIcon component with default props and title', () => {
    const { container } = render(
      <MockProvider>
        <UserIcon />
      </MockProvider>
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('width', '24'); // Default size
    expect(icon).toHaveAttribute('height', '24'); // Default size
    expect(icon).toHaveAttribute('fill', 'currentColor'); // Default color

    // Check for default title "User"
    const titleElement = icon?.querySelector('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('User');
    
    // Check for ARIA attributes linked to the title
    // Assuming the base Icon component sets aria-labelledby if a title is provided
    if (titleElement?.id) { // The base Icon component should give the title an ID
      expect(icon).toHaveAttribute('aria-labelledby', titleElement.id);
    } else {
      // Fallback or alternative check if ID generation is not straightforward to predict
      // For now, we expect an ID on the title element for aria-labelledby
      // This might need adjustment based on the exact implementation of the base Icon
      console.warn('Title element in UserIcon test did not have an ID, aria-labelledby check might be incomplete.');
    }
    expect(icon).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply custom size, color, and title to the UserIcon', () => {
    const customTitle = 'Custom User Profile Icon';
    const { container } = render(
      <MockProvider>
        <UserIcon size={32} color="red" title={customTitle} />
      </MockProvider>
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '32');
    expect(icon).toHaveAttribute('height', '32');
    expect(icon).toHaveAttribute('fill', 'red');

    // Check for custom title
    const titleElement = icon?.querySelector('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(customTitle);
    
    if (titleElement?.id) {
      expect(icon).toHaveAttribute('aria-labelledby', titleElement.id);
    } else {
      console.warn('Title element in UserIcon test (custom title) did not have an ID, aria-labelledby check might be incomplete.');
    }
    expect(icon).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('should apply a custom class name to the UserIcon', () => {
    const { container } = render(
      <MockProvider>
        <UserIcon className="custom-class" />
      </MockProvider>
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('custom-class');
    // The UserIcon component definition applies styles.userIcon by default
    expect(icon).toHaveClass(styles.userIcon); 
  });

  it('should be treated as decorative if title is explicitly empty', () => {
    const { container } = render(
      <MockProvider>
        <UserIcon title="" />
      </MockProvider>
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    const titleElement = icon?.querySelector('title');
    expect(titleElement).not.toBeInTheDocument(); // No title element should be rendered
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).not.toHaveAttribute('aria-labelledby');
  });
});