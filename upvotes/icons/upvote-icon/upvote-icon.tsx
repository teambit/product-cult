import React from 'react';
import { Icon } from '@infinity/design.content.icon';
import styles from './upvote-icon.module.scss';

// SVG Path for the upvote arrow icon
const UpvoteArrowPath = (): React.JSX.Element => <path d="M12 5l-7 7h14l-7-7z" />;

export type UpvoteIconProps = {
  /**
   * Determines if the icon is in an active (upvoted) state.
   * When true, the icon uses the primary theme color; otherwise, it uses a secondary text color.
   * @default false
   */
  isActive?: boolean;
  /**
   * The size (width and height) of the icon.
   * Can be a number (pixels) or a string (e.g., '2em').
   * @default 24
   */
  size?: number | string;
  /**
   * Optional click event handler for the icon.
   * Triggered when the icon is clicked.
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /**
   * Additional CSS class name(s) to apply to the root SVG element of the icon.
   * Useful for custom styling.
   */
  className?: string;
  /**
   * Inline styles to apply to the root SVG element of the icon.
   * Prefer using `className` for styling where possible.
   */
  style?: React.CSSProperties;
  /**
   * A descriptive title for the icon, used for accessibility purposes (e.g., via an SVG <title> element).
   * If not provided, a default title ('Upvote' or 'Remove upvote') will be automatically assigned based on the `isActive` state.
   */
  title?: string;
};

/**
 * UpvoteIcon displays a directional arrow icon, typically used to represent an "upvote" action.
 * Its visual appearance, primarily color, changes based on the `isActive` prop, leveraging theme variables
 * for a consistent look and feel.
 */
export function UpvoteIcon({
  isActive = false,
  size = 24,
  onClick,
  className,
  style,
  title,
}: UpvoteIconProps): React.JSX.Element {
  const iconColor = isActive ? 'var(--colors-primary-default)' : 'var(--colors-text-secondary)';
  const defaultTitle = isActive ? 'Remove upvote' : 'Upvote';
  // Use the provided title if available, otherwise fall back to the default based on active state.
  // This allows an explicit empty string title if desired by the consumer.
  const effectiveTitle = title !== undefined ? title : defaultTitle;

  const combinedClassName = [
    styles.upvoteIcon,
    className,
    isActive && styles.active
  ].filter(Boolean).join(' ');

  return (
    <Icon
      size={size}
      color={iconColor}
      onClick={onClick}
      className={combinedClassName}
      style={style}
      title={effectiveTitle}
      viewBox="0 0 24 24" // The viewBox is fixed as the SVG path is internal and designed for this.
    >
      <UpvoteArrowPath />
    </Icon>
  );
}