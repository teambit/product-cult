import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './image.js';
import styles from './image.module.scss';

describe('Image Component', () => {
  it('should render an image with the provided src and alt attributes', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Image';
    render(<Image src={src} alt={alt} />);
    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toBeInTheDocument();
    expect((imageElement as HTMLImageElement).src).toContain(src);
  });

  it('should apply the responsive image class by default', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Image';
    render(<Image src={src} alt={alt} />);
    const imageElement = screen.getByAltText(alt);
    expect(imageElement).toHaveClass(styles.image);
  });

  it('should apply custom width and height styles when provided', () => {
    const src = 'test-image.jpg';
    const alt = 'Test Image';
    const width = '200px';
    const height = 150;
    render(<Image src={src} alt={alt} width={width} height={height} />);
    const imageElement = screen.getByAltText(alt) as HTMLImageElement;
    expect(imageElement.style.width).toBe(width);
    expect(imageElement.style.height).toBe(`${height}px`);
  });
});