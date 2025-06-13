import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

/**
 * Props for the CalendarIcon component.
 * Extends BaseIconProps to inherit common icon properties,
 * and allows any other valid SVG attributes to be passed.
 */
export type CalendarIconProps = BaseIconProps &
  Omit<
    React.SVGProps<SVGSVGElement>,
    // Exclude keys already defined in BaseIconProps to prevent type conflicts
    // and keys that are handled internally by Icon or via specific props like 'size'.
    keyof BaseIconProps | 'children' | 'viewBox' | 'width' | 'height'
  >;

/**
 * CalendarIcon component.
 * Renders a standard calendar SVG icon using the base Icon component.
 * @param props - The properties for the CalendarIcon component.
 */
export function CalendarIcon({
  size = 24,
  color = 'currentColor',
  title = 'Calendar', // Default accessible title
  ...rest
}: CalendarIconProps): React.JSX.Element {
  return (
    <Icon size={size} color={color} title={title} viewBox="0 0 24 24" {...rest}>
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </Icon>
  );
}