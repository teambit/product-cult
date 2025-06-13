import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

/**
 * Props for the ReviewIcon component.
 * This type extends BaseIconProps from the core Icon component,
 * inheriting common icon properties such as size, color, className,
 * style, onClick, and title. These properties allow for customization
 * of the icon's appearance and behavior.
 */
export type ReviewIconProps = BaseIconProps;

const ReviewIconSvgPath = (): React.JSX.Element => (
  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
);

/**
 * ReviewIcon is a specific icon component that renders a star symbol,
 * commonly used to represent reviews, ratings, or favorites.
 * It is built upon the generic Icon component, ensuring consistency
 * in styling, sizing, and accessibility features across the application.
 *
 * The icon's visual representation is a star, suitable for contexts
 * related to user feedback, product evaluation, or highlighting items.
 *
 * @param props - The properties for the ReviewIcon component. These are derived from BaseIconProps,
 * allowing control over aspects like size (e.g., 16, 24, "2em"), color (e.g., "currentColor", "var(--colors-primary-default)"),
 * CSS class for custom styling, inline styles, click event handlers, and an accessible title.
 * If a title is provided, it enhances accessibility by describing the icon's purpose to assistive technologies.
 * If no title is provided, the icon will be treated as decorative by the base Icon component.
 */
export const ReviewIcon = (props: ReviewIconProps): React.JSX.Element => {
  return (
    <Icon {...props}>
      <ReviewIconSvgPath />
    </Icon>
  );
};