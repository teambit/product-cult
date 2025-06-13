import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from './logo.js';
import styles from './logo.module.scss';

describe('Logo Component', () => {
  it('should render the default logo with name', () => {
    const { container } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    const nameElement = container.querySelector(`.${styles.name}`);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent('Product Hunt');
  });

  it('should render the logo with a custom slogan', () => {
    const sloganText = 'Discover amazing products';
    const { container } = render(
      <MemoryRouter>
        <Logo slogan={sloganText} />
      </MemoryRouter>
    );
    const sloganElement = container.querySelector(`.${styles.slogan}`);
    expect(sloganElement).toBeInTheDocument();
    expect(sloganElement).toHaveTextContent(sloganText);
  });

  it('should render a custom SVG logo', () => {
    const CustomLogo = () => <svg data-testid="custom-logo" width="24" height="24"><rect width="24" height="24" fill="blue" /></svg>;
    render(
      <MemoryRouter>
        <Logo svgLogo={CustomLogo} />
      </MemoryRouter>
    );
    const customLogoElement = screen.getByTestId('custom-logo');
    expect(customLogoElement).toBeInTheDocument();
  });
});