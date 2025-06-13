import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { Forum } from '@infinity/forums.entities.forum';

/**
 * Props for a component rendering a single forum list item.
 */
export interface ForumListItemProps {
  /**
   * The forum data to be displayed by the list item.
   */
  forum: Forum;
}

/**
 * Defines a component that can render a forum list item.
 */
export interface ForumListItem {
  /**
   * A unique name for the forum list item component.
   */
  name: string;
  /**
   * The React component to render a forum list item.
   */
  component: React.ComponentType<ForumListItemProps>;
}

export type ForumListItemSlot = SlotRegistry<ForumListItem[]>;