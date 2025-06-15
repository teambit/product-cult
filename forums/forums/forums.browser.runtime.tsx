import React from 'react';
import { useParams } from 'react-router-dom';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';

import { ProductHuntPlatformAspect, type ProductHuntPlatformBrowser, type UserBarMenuItem } from '@infinity/product-hunt-platform.product-hunt-platform';
import { SearchAspect, type SearchBrowser, type SearchResultItemProps } from '@infinity/search.search';
import { SearchResult } from '@infinity/search.entities.search-result';


import { ForumIcon } from '@infinity/forums.icons.forum-icon';
import { ForumTopicIcon } from '@infinity/forums.icons.forum-topic-icon';
import { ForumSearchComponent } from '@infinity/forums.composites.search.forum-search-component';
import { ForumTopicSearchResultItem } from '@infinity/forums.composites.search.forum-topic-search-result-item';
import { ForumsPage } from '@infinity/forums.pages.forums-page';
import { ForumTopicPage } from '@infinity/forums.pages.forum-topic-page';
import { CreateForumTopicPage } from '@infinity/forums.pages.create-forum-topic-page';
import { ForumTopicList } from '@infinity/forums.ui.forum-topic-list';

import type { ForumsConfig } from './forums-config.js';
import type { ForumListItem, ForumListItemSlot } from './forum-list-item.js';
import type { TopicListItem, TopicListItemSlot } from './topic-list-item.js';
import type { PostListItem, PostListItemSlot } from './post-list-item.js';
import type { ForumActions, ForumActionsSlot } from './forum-actions.js';
import type { TopicActions, TopicActionsSlot } from './topic-actions.js';

const ForumTopicSearchResultItemWrapper: React.FC<SearchResultItemProps> = (props) => {
  const { data: plainSearchResult } = props;
  // Assuming PlainSearchResult has id, title, description, type, and an optional inner 'data' field.
  // The SearchResult constructor is (id, title, description, type, data?: Record<string, any>)
  // plainSearchResult.data should be the Record<string, any> if it exists.
  const searchResultInstance = new SearchResult(
    plainSearchResult.id,
    plainSearchResult.title,
    plainSearchResult.description,
    plainSearchResult.type,
    plainSearchResult.data // This 'data' is the Record<string,any> from SearchResult constructor, if present on PlainSearchResult
  );
  // Pass through other props like className, style if ForumTopicSearchResultItem supports them
  // and if they were part of SearchResultItemProps (they are not by default in the provided API for SearchResultItemProps)
  // However, ForumTopicSearchResultItem itself might accept className/style.
  // If props contains className/style, they could be passed:
  // return <ForumTopicSearchResultItem searchResult={searchResultInstance} className={props.className} style={props.style} />;
  // For now, sticking to the defined props.
  return <ForumTopicSearchResultItem searchResult={searchResultInstance} />;
};

export class ForumsBrowser {
  constructor(
    private forumsConfig: ForumsConfig,
    private forumListItemSlot: ForumListItemSlot,
    private topicListItemSlot: TopicListItemSlot,
    private postListItemSlot: PostListItemSlot,
    private forumActionsSlot: ForumActionsSlot,
    private topicActionsSlot: TopicActionsSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
    private search: SearchBrowser,
  ) {}

  /**
   * register a list of forum list-item.
   */
  registerForumListItem(forumListItems: ForumListItem[]) {
    this.forumListItemSlot.register(forumListItems);
    return this;
  }

  /**
   * list all forum list-item.
   */
  listForumListItems() {
    return this.forumListItemSlot.flatValues();
  }

  /**
   * register a list of topic list-item.
   */
  registerTopicListItem(topicListItems: TopicListItem[]) {
    this.topicListItemSlot.register(topicListItems);
    return this;
  }

  /**
   * list all topic list-item.
   */
  listTopicListItems() {
    return this.topicListItemSlot.flatValues();
  }

  /**
   * register a list of post list-item.
   */
  registerPostListItem(postListItems: PostListItem[]) {
    this.postListItemSlot.register(postListItems);
    return this;
  }

  /**
   * list all post list-item.
   */
  listPostListItems() {
    return this.postListItemSlot.flatValues();
  }

  /**
   * register a list of forum actions.
   */
  registerForumActions(actions: ForumActions[]) {
    this.forumActionsSlot.register(actions);
    return this;
  }

  /**
   * list all forum actions.
   */
  listForumActions() {
    return this.forumActionsSlot.flatValues();
  }

  /**
   * register a list of topic actions.
   */
  registerTopicActions(actions: TopicActions[]) {
    this.topicActionsSlot.register(actions);
    return this;
  }

  /**
   * list all topic actions.
   */
  listTopicActions() {
    return this.topicActionsSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, SearchAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, search]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser, SearchBrowser],
    config: ForumsConfig,
    [forumListItemSlot, topicListItemSlot, postListItemSlot, forumActionsSlot, topicActionsSlot]: [ForumListItemSlot, TopicListItemSlot, PostListItemSlot, ForumActionsSlot, TopicActionsSlot]
  ) {
    const forums = new ForumsBrowser(config, forumListItemSlot, topicListItemSlot, postListItemSlot, forumActionsSlot, topicActionsSlot, symphonyPlatform, productHuntPlatform, search);

    symphonyPlatform.registerRoute([
      {
        path: '/forums',
        component: () => <ForumsPage />,
      },
      {
        path: '/forums/topic/:topicId', // Corrected path to match typical usage for topic pages
        component: () => {
          const { topicId } = useParams<{ topicId: string }>();
          if (!topicId) return null; // Or a NotFound component
          return <ForumTopicPage topicId={topicId} />;
        },
      },
      {
        path: '/forums/:forumId', // Corrected path to match typical usage for topic pages
        component: () => {
          const { forumId } = useParams<{ forumId: string }>();
          if (!forumId) return null; // Or a NotFound component
          return <ForumTopicList forumId={forumId} />;
        },
      },
      {
        path: '/forums/create',
        component: () => <CreateForumTopicPage />,
      },
    ]);

    productHuntPlatform.registerNavigationItem([
      {
        name: 'forums-nav-item',
        label: 'Forums',
        href: '/forums',
        icon: ForumIcon,
        weight: 50,
      },
    ]);

    // productHuntPlatform.registerHeaderLink([
    //   {
    //     name: 'create-topic-header-link',
    //     label: 'New Topic',
    //     href: '/forums/create',
    //     icon: ForumTopicIcon,
    //     authenticated: true, // HeaderLink supports authenticated
    //     weight: 20,
    //   },
    // ]);

    // productHuntPlatform.registerHomepageSection([
    //   {
    //     name: 'recent-forum-topics',
    //     component: () => <ForumTopicList forumId="general-discussion" limit={5} />, // Example, 'general-discussion' might need to be a valid existing forumId
    //     weight: 30,
    //   },
    // ]);

    const userBarMenuItem: UserBarMenuItem = {
      name: 'create-new-topic-user-bar',
      label: 'New Forum Topic',
      href: '/forums/create',
      icon: ForumTopicIcon,
      // authenticated: true, // UserBarMenuItem does not have 'authenticated' prop. Use allowedRoles if needed.
      weight: 10,
    };
    productHuntPlatform.registerUserBarMenuItem([userBarMenuItem]);

    search.registerSearchTypeComponent([
      {
        name: 'forums',
        component: ForumSearchComponent,
      },
    ]);

    search.registerSearchResultItem([
      {
        name: 'forum-topic-result-item',
        type: 'forum-topic',
        component: ForumTopicSearchResultItemWrapper,
      },
    ]);

    return forums;
  }
}

export default ForumsBrowser;