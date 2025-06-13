import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ForumTopic } from '@infinity/forums.entities.forum-topic';

/**
 * Props for a component rendering a single topic list item.
 */
export interface TopicListItemProps {
  /**
   * The forum topic data to be displayed by the list item.
   */
  topic: ForumTopic;
}

/**
 * Defines a component that can render a topic list item.
 */
export interface TopicListItem {
  /**
   * A unique name for the topic list item component.
   */
  name: string;
  /**
   * The React component to render a topic list item.
   */
  component: React.ComponentType<TopicListItemProps>;
}

export type TopicListItemSlot = SlotRegistry<TopicListItem[]>;