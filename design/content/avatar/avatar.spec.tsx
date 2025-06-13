import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Avatar } from './avatar.js';

describe('Avatar', () => {
  it('should render with initials when src is not provided', () => {
    render(
      <MemoryRouter>
        <Avatar initials="AB" alt="Test User" />
      </MemoryRouter>
    );
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toHaveTextContent('AB');
  });

  it('should render with alt initials when src and initials are not provided', () => {
    render(
      <MemoryRouter>
        <Avatar alt="Test User" />
      </MemoryRouter>
    );
    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toHaveTextContent('TU');
  });

  it('should render an image when src is provided', () => {
    const src = 'https://example.com/image.jpg';
    render(
      <MemoryRouter>
        <Avatar src={src} alt="Test User" />
      </MemoryRouter>
    );
    const imageElement = screen.getByAltText('Test User');
    expect((imageElement as HTMLImageElement).src).toBe(src);
  });
});