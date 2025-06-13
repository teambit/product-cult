import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { Forum } from '@infinity/forums.entities.forum';

/**
 * Props for a component providing actions related to a forum.
 */
export interface ForumActionsProps {
  /**
   * The forum entity for which actions are being provided.
   */
  forum: Forum;
}

/**
 * Defines a component that provides actions for a forum.
 */
export interface ForumActions {
  /**
   * A unique name for the forum actions component.
   */
  name: string;
  /**
   * The React component that provides actions for a forum.
   */
  component: React.ComponentType<ForumActionsProps>;
}

export type ForumActionsSlot = SlotRegistry<ForumActions[]>;