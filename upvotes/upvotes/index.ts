import { UpvotesAspect } from './upvotes.aspect.js';

export type { UpvotesBrowser } from './upvotes.browser.runtime.js';
export type { UpvotesNode } from './upvotes.node.runtime.js';
export type { UpvoteButton, UpvoteButtonSlot } from './upvote-button.js';
export type { UpvoteCount, UpvoteCountSlot } from './upvote-count.js';
export type { UserUpvotedItemsList, UserUpvotedItemsListSlot } from './user-upvoted-items-list.js';
export type { CreateUpvoteOptions, DeleteUpvoteOptions, GetUpvoteOptions, ListUpvotesOptions, GetUpvoteCountOptions, GetUserUpvoteStatusOptions } from './upvote-options.js';

export default UpvotesAspect;
export { UpvotesAspect };