import React, { type ComponentType, type CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './badge.module.scss';

/**
 * Defines the visual style of the badge.
 * 'filled': Solid background color.
 * 'outlined': Transparent background with a colored border.
 * 'ghost': Transparent background, colored text, subtle hover effect.
 */
export type BadgeVariant = 'filled' | 'outlined' | 'ghost';

/**
 * Defines the size of the badge, affecting padding, font size, and icon size.
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Defines the color palette of the badge.
 * Determines background, text, and border colors based on the variant.
 */
export type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type BadgeProps = {
  /**
   * The text content to be displayed inside the badge.
   */
  label: string;

  /**
   * Optional icon component to be displayed before the label.
   * The icon component should accept a className prop for styling.
   */
  icon?: ComponentType<{ className?: string }>;

  /**
   * The visual style of the badge.
   * 'filled' results in a badge with a solid background color.
   * 'outlined' results in a badge with a transparent background and a colored border.
   * 'ghost' results in a badge with a transparent background, colored text, and a subtle hover effect.
   * Defaults to 'filled'.
   */
  variant?: BadgeVariant;

  /**
   * The size of the badge, affecting padding, font size, and icon size.
   * Defaults to 'medium'.
   */
  size?: BadgeSize;

  /**
   * The color palette of the badge.
   * This determines the background, text, and border colors based on the selected variant.
   * Defaults to 'neutral'.
   */
  color?: BadgeColor;

  /**
   * Optional custom CSS class name to apply to the badge root element.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the badge root element.
   * Use sparingly; prefer variants, sizes, and color props for styling.
   */
  style?: CSSProperties;
};

/**
 * Badge component for displaying statuses, labels, or categories with customizable appearance.
 * It supports different variants, sizes, colors, and an optional icon.
 */
export function Badge({
  label,
  icon: IconComponent,
  variant = 'filled',
  size = 'medium',
  color = 'neutral',
  className,
  style,
}: BadgeProps): React.JSX.Element {
  const badgeClasses = classNames(
    styles.badge,
    styles[variant],
    styles[size],
    styles[color],
    className
  );

  return (
    <span className={badgeClasses} style={style}>
      {IconComponent ? <IconComponent className={styles.icon} /> : null}
      <span className={styles.label}>{label}</span>
    </span>
  );
}