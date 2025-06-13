import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

/**
 * Props for the PlusIcon component.
 * These props are inherited from the BaseIconProps of the generic Icon component,
 * allowing control over size, color, click events, custom styling, and accessibility attributes.
 */
export type PlusIconProps = BaseIconProps;

/**
 * PlusIcon component displays a 'plus' symbol.
 * This icon is typically used to indicate an action of adding, creating, or expanding.
 * It leverages the base Icon component from '@infinity/design.content.icon'
 * for consistent appearance, behavior, and accessibility.
 *
 * @param {PlusIconProps} props - The properties for the PlusIcon component.
 * @param {string} [props.title='Plus Icon'] - Accessible title for the icon. Defaults to 'Plus Icon'.
 *                                            This title is important for screen readers.
 * @param {string | number} [props.size] - The size of the icon (width and height). Defaults to the base Icon's default (e.g., 24).
 * @param {string} [props.color] - The color of the icon. Defaults to 'currentColor'.
 * @param {function} [props.onClick] - Optional click event handler.
 * @param {string} [props.className] - Optional CSS class name(s) to apply to the icon.
 * @param {React.CSSProperties} [props.style] - Optional inline styles to apply to the icon.
 * All other SVG-specific props are passed down to the underlying SVG element via the base Icon component.
 */
export const PlusIcon: React.FC<PlusIconProps> = ({
  title = 'Plus Icon',
  ...rest
}) => {
  return (
    <Icon title={title} {...rest}>
      {/* SVG path for a standard plus symbol. Designed to work well with fill. */}
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </Icon>
  );
};