import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

/**
 * Props for the ForumIcon component.
 * Extends BaseIconProps to include common icon properties such as size, color, className, style, and onClick.
 * @property {string} [title] - A descriptive title for the icon, used for accessibility. Defaults to 'Forum'.
 */
export type ForumIconProps = BaseIconProps;

/**
 * ForumIcon component displays a standard icon representing a forum or community.
 * It utilizes the base Icon component for consistent styling, sizing, and accessibility features.
 * The icon visually depicts a group of users, commonly associated with forums.
 * @param props The properties for the ForumIcon component, adhering to ForumIconProps.
 */
export const ForumIcon: React.FC<ForumIconProps> = (props) => {
  const { title = `Forum`, ...rest } = props;

  return (
    <Icon viewBox="0 0 24 24" title={title} {...rest}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </Icon>
  );
};