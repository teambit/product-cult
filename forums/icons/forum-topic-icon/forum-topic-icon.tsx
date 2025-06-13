import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

/**
 * Props for the ForumTopicIcon component.
 * Extends BaseIconProps to include common icon properties.
 */
export type ForumTopicIconProps = BaseIconProps;

const ForumTopicSvgPath: React.FC = () => (
  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm-2-5H6V5h10v2z" />
);

/**
 * ForumTopicIcon component displays a standard icon representing a forum topic.
 * It utilizes the base Icon component for consistent styling and accessibility.
 * @param props The properties for the ForumTopicIcon component.
 */
export const ForumTopicIcon: React.FC<ForumTopicIconProps> = ({
  size = 24,
  color = 'currentColor',
  title = 'Forum Topic', // Default accessible title
  className,
  style,
  onClick,
  ...rest
}: ForumTopicIconProps) => {
  return (
    <Icon
      size={size}
      color={color}
      title={title}
      className={className}
      style={style}
      onClick={onClick}
      viewBox="0 0 24 24" // Specific viewBox for this icon's path
      {...rest}
    >
      <ForumTopicSvgPath />
    </Icon>
  );
};