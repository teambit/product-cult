import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './avatar.module.scss';

/**
 * Defines the possible sizes for an Avatar.
 * 'small', 'medium', 'large', 'xlarge'.
 */
export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

/**
 * Defines the possible shapes for an Avatar.
 * 'circle', 'square'.
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Props for the Avatar component.
 */
export type AvatarProps = {
  /**
   * The source URL of the image to display in the avatar.
   * If not provided, initials or a placeholder will be shown.
   */
  src?: string;

  /**
   * Alternative text for the image. This is crucial for accessibility.
   * It is also used to derive initials if the 'initials' prop is not set and 'src' is missing or fails to load.
   * Defaults to an empty string.
   */
  alt?: string;

  /**
   * Explicit initials to display if an image 'src' is not provided or fails to load.
   * Takes precedence over initials derived from the 'alt' prop. Max 2 characters.
   */
  initials?: string;

  /**
   * The size of the avatar.
   * Determines the width and height of the avatar.
   * Defaults to 'medium'.
   */
  size?: AvatarSize;

  /**
   * The shape of the avatar.
   * Can be 'circle' or 'square'.
   * Defaults to 'circle'.
   */
  shape?: AvatarShape;

  /**
   * Optional CSS class name to apply to the avatar's root element.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the avatar's root element.
   * It is recommended to use 'className' for styling purposes.
   */
  style?: React.CSSProperties;
};

const getDisplayInitials = (initialsProp?: string, altProp?: string): string | undefined => {
  if (initialsProp && initialsProp.trim().length > 0) {
    return initialsProp.trim().substring(0, 2).toUpperCase();
  }
  if (altProp && altProp.trim().length > 0) {
    const words = altProp.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return undefined;
    if (words.length === 1) {
      // Use up to 2 chars from a single word if it's long enough, otherwise 1.
      return words[0].substring(0, Math.min(2, words[0].length)).toUpperCase();
    }
    // For 2 or more words, take first letter of first two words
    return (words[0].substring(0, 1) + words[1].substring(0, 1)).toUpperCase();
  }
  return undefined;
};

/**
 * Avatar component to display user profile pictures or initials.
 * It supports different sizes, shapes, and fallbacks for images.
 */
export function Avatar({
  src,
  alt = '',
  initials,
  size = 'medium',
  shape = 'circle',
  className,
  style,
}: AvatarProps): React.JSX.Element {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (src) {
      setImageError(false);
    }
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
  };

  const showImage = src && !imageError;
  const displayInitials = getDisplayInitials(initials, alt);
  const accessibleLabel = !showImage ? (displayInitials ? `Avatar: ${displayInitials}` : (alt || 'User avatar placeholder')) : undefined;


  return (
    <div
      className={classNames(
        styles.avatar,
        styles[size],
        styles[shape],
        className
      )}
      style={style}
      aria-label={accessibleLabel}
      role={!showImage ? 'img' : undefined} // Assign role="img" when it's acting as an image (e.g. showing initials)
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || 'User avatar'}
          className={styles.image}
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <span className={styles.initials} aria-hidden={!displayInitials && !!accessibleLabel}>
          {displayInitials}
        </span>
      )}
    </div>
  );
}