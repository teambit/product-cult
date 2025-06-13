import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { ForumTopic } from '@infinity/forums.entities.forum-topic';

/**
 * Props for a component providing actions related to a topic.
 */
export interface TopicActionsProps {
  /**
   * The forum topic entity for which actions are being provided.
   */
  topic: ForumTopic;
}

/**
 * Defines a component that provides actions for a topic.
 */
export interface TopicActions {
  /**
   * A unique name for the topic actions component.
   */
  name: string;
  /**
   * The React component that provides actions for a topic.
   */
  component: React.ComponentType<TopicActionsProps>;
}

export type TopicActionsSlot = SlotRegistry<TopicActions[]>;