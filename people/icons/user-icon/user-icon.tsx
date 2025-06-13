import React from 'react';
import classNames from 'classnames';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';
import styles from './user-icon.module.scss';

const UserSvgPath: React.FC = () => (
  <>
    {/* Standard user icon path - head and shoulders silhouette */}
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </>
);

/**
 * Props for the UserIcon component.
 * These props are based on the BaseIconProps from the core Icon component.
 *
 * @property {number | string} [size=24] - The size (width and height) of the icon in pixels or a CSS unit string (e.g., '2em'). Defaults to 24.
 * @property {string} [color='currentColor'] - The fill color of the icon. This can be any valid CSS color string. Defaults to 'currentColor', inheriting the text color.
 * @property {string} [className] - Optional additional CSS class name(s) to apply to the root SVG element of the icon.
 * @property {React.CSSProperties} [style] - Optional inline styles to apply to the root SVG element of the icon.
 * @property {(event: React.MouseEvent<SVGSVGElement>) => void} [onClick] - Optional click event handler that fires when the icon is clicked.
 * @property {string} [title='User'] - A descriptive title for the icon, used for accessibility purposes (e.g., as an SVG <title> element). Defaults to 'User'.
 */
export type UserIconProps = BaseIconProps;

/**
 * UserIcon component renders a standard user symbol, typically used for avatars or profile indicators.
 * It is built upon the base Icon component from '@infinity/design.content.icon',
 * inheriting its core functionalities for sizing, coloring, and accessibility.
 * This component provides a visually consistent user representation across the platform.
 */
export const UserIcon: React.FC<UserIconProps> = ({
  size = 24,
  color = 'currentColor',
  className,
  title = 'User',
  ...restProps // Includes style, onClick from BaseIconProps
}) => {
  return (
    <Icon
      size={size}
      color={color}
      className={classNames(styles.userIcon, className)}
      title={title}
      viewBox="0 0 24 24" // Standard viewBox for this icon geometry
      {...restProps}
    >
      <UserSvgPath />
    </Icon>
  );
};