import React from 'react';
import classNames from 'classnames';
import { Icon } from '@infinity/design.content.icon';
import styles from './downvote-icon.module.scss';

// Component for the SVG Path data of the downvote icon
const DownvoteIconPath = (): React.JSX.Element => (
  // This path creates a filled triangle pointing downwards.
  // Coordinates are (centerX, bottomY), (leftX, topY), (rightX, topY)
  // For a 24x24 viewBox: (12,18) is the bottom point. Base is from (4,10) to (20,10).
  <path d="M12 18L4 10h16L12 18z" />
);

/**
 * Props for the DownvoteIcon component.
 */
export type DownvoteIconProps = {
  /**
   * Determines if the icon is in an active (downvoted) state.
   * This will change the icon's color using theme variables.
   * When true, color is `var(--colors-status-negative-default)`.
   * When false, color is `var(--colors-text-secondary)`.
   * @default false
   */
  isActive?: boolean;
  /**
   * The size (width and height) of the icon in pixels.
   * Can be a number (e.g., 24) or a string (e.g., '2em').
   * @default 24
   */
  size?: number | string;
  /**
   * Additional CSS class name(s) to apply to the root SVG element of the icon.
   * This allows for custom styling or layout adjustments.
   */
  className?: string;
  /**
   * Inline styles to apply to the root SVG element of the icon.
   * Use sparingly; prefer `className` for styling.
   * If `onClick` is provided, `cursor: var(--interactions-cursor-pointer)` will be automatically added.
   */
  style?: React.CSSProperties;
  /**
   * Optional click event handler for the icon.
   * When provided, the icon's style will include `cursor: var(--interactions-cursor-pointer)`.
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /**
   * A descriptive title for the icon, used for accessibility (e.g., via an SVG <title> element).
   * If not provided, the icon might be treated as decorative depending on the underlying Icon component's behavior.
   * @default 'Downvote'
   */
  title?: string;
};

/**
 * DownvoteIcon component renders an SVG icon representing a "downvote" action.
 * It uses the generic Icon component from `@infinity/design.content.icon`.
 * The icon's color changes based on the `isActive` prop, utilizing theme variables
 * for active (`--colors-status-negative-default`) and inactive (`--colors-text-secondary`) states.
 */
export const DownvoteIcon = ({
  isActive = false,
  size = 24,
  className,
  style,
  onClick,
  title = 'Downvote',
}: DownvoteIconProps): React.JSX.Element => {
  const iconColor = isActive
    ? 'var(--colors-status-negative-default)'
    : 'var(--colors-text-secondary)';

  const resolvedStyle: React.CSSProperties = { ...style };
  if (onClick) {
    resolvedStyle.cursor = 'var(--interactions-cursor-pointer)';
  }

  return (
    <Icon
      size={size}
      color={iconColor}
      onClick={onClick}
      className={classNames(styles.downvoteIcon, className)}
      style={resolvedStyle}
      title={title}
      viewBox="0 0 24 24" // Standard viewBox for the DownvoteIconPath
    >
      <DownvoteIconPath />
    </Icon>
  );
};