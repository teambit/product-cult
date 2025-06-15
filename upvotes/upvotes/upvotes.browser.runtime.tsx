import React from 'react';
import { UpvoteButton } from '@infinity/upvotes.ui.upvote-button';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { LaunchesAspect, LaunchesBrowser } from '@infinity/launches.launches';
import { ProductsAspect, ProductsBrowser } from '@infinity/products.products';
import { ProductHuntPlatformAspect, type ProductHuntPlatformBrowser } from '@infinity/product-hunt-platform.product-hunt-platform';
import type { UpvotesConfig } from './upvotes-config.js';
import { type UpvoteButtonSlot } from './upvote-button.js';
import { type UpvoteCount, type UpvoteCountSlot } from './upvote-count.js';
import { type UserUpvotedItemsList, type UserUpvotedItemsListSlot } from './user-upvoted-items-list.js';

// New component imports
import { UserUpvotesPage } from '@infinity/upvotes.pages.user-upvotes-page';
import { UpvotesDashboardPanel } from '@infinity/upvotes.dashboard-panel.upvotes-dashboard-panel';

export class UpvotesBrowser {
  constructor(
    private upvotesConfig: UpvotesConfig,
    private upvoteButtonSlot: UpvoteButtonSlot,
    private upvoteCountSlot: UpvoteCountSlot,
    private userUpvotedItemsListSlot: UserUpvotedItemsListSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
  ) {}

  /**
   * register a list of upvote count.
   */
  registerUpvoteCount(upvoteCounts: UpvoteCount[]) {
    this.upvoteCountSlot.register(upvoteCounts);
    return this;
  }

  /**
   * list all upvote count.
   */
  listUpvoteCounts() {
    return this.upvoteCountSlot.flatValues();
  }

  /**
   * register a list of user upvoted-items-list.
   */
  registerUserUpvotedItemsList(userUpvotedItemsLists: UserUpvotedItemsList[]) {
    this.userUpvotedItemsListSlot.register(userUpvotedItemsLists);
    return this;
  }

  /**
   * list all user upvoted-items-list.
   */
  listUserUpvotedItemsLists() {
    return this.userUpvotedItemsListSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, LaunchesAspect, ProductsAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, launches, products]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser, LaunchesBrowser, ProductsBrowser],
    config: UpvotesConfig,
    [upvoteButtonSlot, upvoteCountSlot, userUpvotedItemsListSlot]: [UpvoteButtonSlot, UpvoteCountSlot, UserUpvotedItemsListSlot]
  ) {
    const upvotes = new UpvotesBrowser(config, upvoteButtonSlot, upvoteCountSlot, userUpvotedItemsListSlot, symphonyPlatform, productHuntPlatform);

    symphonyPlatform.registerRoute([
      {
        path: '/upvotes',
        component: () => {
          return <UserUpvotesPage />;
        }
      }
    ]);

    productHuntPlatform.registerUserBarMenuItem([
      {
        name: 'my-upvotes-user-bar-item',
        label: 'My Upvotes',
        href: '/upvotes',
        weight: 100
      }
    ]);

    productHuntPlatform.registerHomepageSection([
      {
        name: 'upvotes-dashboard-panel',
        component: () => (
          <UpvotesDashboardPanel
            itemId="featured-product-today"
            itemType="product"
            title="Featured Upvote Insights"
          />
        ),
        weight: 50
      }
    ]);

    launches.registerLaunchAction([
      {
        name: 'launch-upvote',
        component: ({ launch }) => {
          return <UpvoteButton itemId={launch.id} itemType='launch' />;
        }
      }
    ]);

    products.registerProductAction([
      {
        name: 'product-upvote',
        component: ({ productId }) => {
          return <UpvoteButton itemId={productId} itemType='product' />;
        }
      }
    ])

    return upvotes;
  }
}

export default UpvotesBrowser;
