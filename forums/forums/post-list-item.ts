import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ForumPost } from '@infinity/forums.entities.forum-post';

/**
 * Props for a component rendering a single post list item.
 */
export interface PostListItemProps {
  /**
   * The forum post data to be displayed by the list item.
   */
  post: ForumPost;
}

/**
 * Defines a component that can render a post list item.
 */
export interface PostListItem {
  /**
   * A unique name for the post list item component.
   */
  name: string;
  /**
   * The React component to render a post list item.
   */
  component: React.ComponentType<PostListItemProps>;
}

export type PostListItemSlot = SlotRegistry<PostListItem[]>;