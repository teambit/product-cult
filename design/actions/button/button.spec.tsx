import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './button.js';
import styles from './button.module.scss';

describe('Button Component', () => {
  it('renders a button with text', () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.textContent).toBe('Click me');
  });

  it('applies the correct appearance class', () => {
    const { container } = render(<Button appearance="secondary">Click me</Button>);
    const button = container.querySelector('button');
    expect(button?.classList.contains(styles.secondary)).toBe(true);
  });

  it('handles onClick events', () => {
    const handleClick = vi.fn();
    const { container } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = container.querySelector('button');
    if (button) {
      fireEvent.click(button);
    }
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when href is provided', () => {
    const { container } = render(
      <MemoryRouter>
        <Button href="/test">Click me</Button>
      </MemoryRouter>
    );
    const link = container.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('/test');
  });

  it('applies the disabled styles when disabled is true', () => {
    const { container } = render(<Button disabled>Click me</Button>);
    const button = container.querySelector('button');
    expect(button?.classList.contains(styles.disabled)).toBe(true);
  });
});