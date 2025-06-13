import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Link } from './link.js';
import styles from './link.module.scss';

describe('Link Component', () => {
  it('should render an internal link with the correct text and href', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Link href="/products">Products</Link>
      </MemoryRouter>
    );

    const linkElement = container.querySelector(`.${styles.link}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Products');
    expect(linkElement).toHaveAttribute('href', '/products');
  });

  it('should render an external link with the correct text and attributes', () => {
    const { container } = render(
      <Link href="https://www.example.com" external>
        Example Link
      </Link>
    );

    const linkElement = container.querySelector(`.${styles.link}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Example Link');
    expect(linkElement).toHaveAttribute('href', 'https://www.example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should call onClick handler when the link is clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Link href="/test" onClick={handleClick}>
          Test Link
        </Link>
      </MemoryRouter>
    );

    const linkElement = container.querySelector(`.${styles.link}`);
    fireEvent.click(linkElement as Element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});