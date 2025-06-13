import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Spinner } from './spinner.js';
import styles from './spinner.module.scss';

describe('Spinner', () => {
  it('should render with default props', () => {
    const { container } = render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>
    );
    const spinnerElement = container.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveAttribute('aria-label', 'Loading...');
  });

  it('should render with custom size', () => {
    const { container } = render(
      <MemoryRouter>
        <Spinner size="large" />
      </MemoryRouter>
    );
    const spinnerElement = container.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass(styles.large);
  });

  it('should render with custom aria-label', () => {
    const { container } = render(
      <MemoryRouter>
        <Spinner ariaLabel="Custom loading message" />
      </MemoryRouter>
    );
    const spinnerElement = container.querySelector(`.${styles.spinner}`);
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveAttribute('aria-label', 'Custom loading message');
  });
});