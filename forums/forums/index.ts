import { ForumsAspect } from './forums.aspect.js';

export type { ForumsBrowser } from './forums.browser.runtime.js';
export type { ForumsNode } from './forums.node.runtime.js';
export type { ForumListItem, ForumListItemSlot } from './forum-list-item.js';
export type { TopicListItem, TopicListItemSlot } from './topic-list-item.js';
export type { PostListItem, PostListItemSlot } from './post-list-item.js';
export type { ForumActions, ForumActionsSlot } from './forum-actions.js';
export type { TopicActions, TopicActionsSlot } from './topic-actions.js';
export type { ForumsConfig } from './forums-config.js';
export type {
  User,
  CreateForumOptions, GetForumOptions, UpdateForumOptions, DeleteForumOptions, ListForumsOptions, SearchForumsOptions,
  CreateTopicOptions, GetTopicOptions, UpdateTopicOptions, DeleteTopicOptions, ListTopicsOptions,
  CreatePostOptions, GetPostOptions, UpdatePostOptions, DeletePostOptions, ListPostsOptions
} from './forums-types.js';

export default ForumsAspect;
export { ForumsAspect };