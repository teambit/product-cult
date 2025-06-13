import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfinityTheme } from './infinity-theme.js';
import styles from './infinity-theme.module.scss';
import { MemoryRouter } from 'react-router-dom';

describe('InfinityTheme', () => {
  it('renders with the correct children', () => {
    render(
      <MemoryRouter>
        <InfinityTheme>Hello world!</InfinityTheme>
      </MemoryRouter>
    );
    const rendered = screen.getByText('Hello world!');
    expect(rendered).toBeTruthy();
  });

  it('applies the infinityTheme class', () => {
    const { container } = render(
      <MemoryRouter>
        <InfinityTheme>Content</InfinityTheme>
      </MemoryRouter>
    );
    const themeContainer = container.querySelector(`.${styles.infinityTheme}`);
    expect(themeContainer).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClassName = 'custom-theme';
    const { container } = render(
      <MemoryRouter>
        <InfinityTheme className={customClassName}>Content</InfinityTheme>
      </MemoryRouter>
    );
    const themeContainer = container.querySelector(`.${customClassName}`);
    expect(themeContainer).toBeInTheDocument();
  });
});