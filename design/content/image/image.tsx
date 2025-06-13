import React from 'react';
import classNames from 'classnames';
import styles from './image.module.scss';

/**
 * Defines the properties for the Image component.
 */
export type ImageProps = {
  /**
   * The source URL of the image. This is a required property.
   */
  src: string;

  /**
   * The alternative text for the image, crucial for accessibility. This is a required property.
   */
  alt: string;

  /**
   * The width of the image. Can be a number (in pixels) or a string (e.g., '100px', '50%').
   * If not provided, the image will be responsive and scale to its container width.
   */
  width?: string | number;

  /**
   * The height of the image. Can be a number (in pixels) or a string (e.g., '100px', '50%').
   * If not provided, the image will maintain its aspect ratio based on its width or natural dimensions.
   */
  height?: string | number;

  /**
   * Specifies how the image should be resized to fit its container.
   * Behaves like the CSS `object-fit` property.
   * Defaults to `cover` if both width and height are specified, otherwise `undefined`.
   */
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

  /**
   * Specifies how the browser should load the image.
   * 'lazy' defers loading until the image is near the viewport.
   * 'eager' loads the image immediately.
   * Defaults to 'lazy'.
   */
  loading?: 'eager' | 'lazy';

  /**
   * Provides a hint to the browser on how to decode the image.
   * 'async' decodes the image asynchronously.
   * 'sync' decodes the image synchronously.
   * 'auto' is the default browser behavior.
   * Defaults to 'async'.
   */
  decoding?: 'sync' | 'async' | 'auto';

  /**
   * An optional CSS class name to apply to the image container element for custom styling.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the image container element.
   */
  style?: React.CSSProperties;
};

/**
 * Image component to display images responsively and with configurable loading strategies.
 * It aims to be visually appealing by default through its responsive behavior and optional styling.
 */
export function Image({
  src,
  alt,
  width,
  height,
  objectFit,
  loading = 'lazy',
  decoding = 'async',
  className,
  style: customStyle,
}: ImageProps): React.JSX.Element {
  const imageStyle: React.CSSProperties = { ...customStyle };

  if (width !== undefined) {
    imageStyle.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    imageStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (objectFit) {
    imageStyle.objectFit = objectFit;
  } else if (width !== undefined && height !== undefined) {
    imageStyle.objectFit = 'cover'; // Default to cover if specific dimensions are set
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classNames(styles.image, className)}
      style={imageStyle}
      loading={loading}
      decoding={decoding}
    />
  );
}