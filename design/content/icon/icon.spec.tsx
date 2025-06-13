import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Icon } from './icon.js';

describe('Icon Component', () => {
  it('should render the icon with default size and color', () => {
    const { container } = render(
      <MemoryRouter>
        <Icon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </Icon>
      </MemoryRouter>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
    expect(svgElement).toHaveAttribute('fill', 'currentColor');
  });

  it('should render the icon with custom size and color', () => {
    const { container } = render(
      <MemoryRouter>
        <Icon size={32} color="red">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </Icon>
      </MemoryRouter>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
    expect(svgElement).toHaveAttribute('fill', 'red');
  });

  it('should render the icon with a title for accessibility', () => {
    const { container } = render(
      <MemoryRouter>
        <Icon title="Home">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </Icon>
      </MemoryRouter>
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-label', 'Home');
    expect(svgElement).toHaveAttribute('role', 'img');
    const titleElement = svgElement?.querySelector('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Home');
  });
});