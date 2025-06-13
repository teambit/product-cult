import React from 'react';
import { useParams } from 'react-router-dom';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { ProductHuntPlatformAspect, type ProductHuntPlatformBrowser } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect, type PeopleBrowser } from '@infinity/people.people';
import { ProductsAspect, type ProductsBrowser } from '@infinity/products.products';
import type { ReviewsConfig } from './reviews-config.js';
import { ProductDetailsReviewSection, ProductDetailsReviewSectionSlot } from './product-details-review-section.js';
import { ReviewAction, ReviewActionSlot } from './review-action.js';
import { ReviewListItem, ReviewListItemSlot } from './review-list-item.js';
import { UserProfileReviewsTab, UserProfileReviewsTabSlot } from './user-profile-reviews-tab.js';

import { ReviewsPage } from '@infinity/reviews.pages.reviews-page';
import { ProductReviewsPage } from '@infinity/reviews.pages.product-reviews-page';
import { EditReviewPage } from '@infinity/reviews.pages.edit-review-page';
import { ManageReviewsPage } from '@infinity/reviews.admin.manage-reviews';
import { AddReviewButton } from '@infinity/reviews.products.add-review-button';
import { ProductReviewsTab } from '@infinity/reviews.products.product-reviews-tab';
import { ManageReviewsLink } from '@infinity/reviews.people.manage-reviews-link';
import { UserReviewsTab } from '@infinity/reviews.people.user-reviews-tab';
import { ReviewIcon } from '@infinity/reviews.icons.review-icon';

export class ReviewsBrowser {
  constructor(
    private reviewsConfig: ReviewsConfig,
    private productDetailsReviewSectionSlot: ProductDetailsReviewSectionSlot,
    private reviewActionSlot: ReviewActionSlot,
    private reviewListItemSlot: ReviewListItemSlot,
    private userProfileReviewsTabSlot: UserProfileReviewsTabSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
    private products: ProductsBrowser,
    private people: PeopleBrowser,
  ) {}

  /**
   * register a list of product details-review-section.
   */
  registerProductDetailsReviewSection(productDetailsReviewSections: ProductDetailsReviewSection[]) {
    this.productDetailsReviewSectionSlot.register(productDetailsReviewSections);
    return this;
  }

  /**
   * list all product details-review-section.
   */
  listProductDetailsReviewSections() {
    return this.productDetailsReviewSectionSlot.flatValues();
  }

  /**
   * register a list of review action.
   */
  registerReviewAction(reviewActions: ReviewAction[]) {
    this.reviewActionSlot.register(reviewActions);
    return this;
  }

  /**
   * list all review action.
   */
  listReviewActions() {
    return this.reviewActionSlot.flatValues();
  }

  /**
   * register a list of review list-item.
   */
  registerReviewListItem(reviewListItems: ReviewListItem[]) {
    this.reviewListItemSlot.register(reviewListItems);
    return this;
  }

  /**
   * list all review list-item.
   */
  listReviewListItems() {
    return this.reviewListItemSlot.flatValues();
  }

  /**
   * register a list of user profile-reviews-tab.
   */
  registerUserProfileReviewsTab(userProfileReviewsTabs: UserProfileReviewsTab[]) {
    this.userProfileReviewsTabSlot.register(userProfileReviewsTabs);
    return this;
  }

  /**
   * list all user profile-reviews-tab.
   */
  listUserProfileReviewsTabs() {
    return this.userProfileReviewsTabSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, ProductsAspect, PeopleAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, products, people]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser, ProductsBrowser, PeopleBrowser],
    config: ReviewsConfig,
    [productDetailsReviewSectionSlot, reviewActionSlot, reviewListItemSlot, userProfileReviewsTabSlot]: [ProductDetailsReviewSectionSlot, ReviewActionSlot, ReviewListItemSlot, UserProfileReviewsTabSlot]
  ) {
    const reviews = new ReviewsBrowser(config, productDetailsReviewSectionSlot, reviewActionSlot, reviewListItemSlot, userProfileReviewsTabSlot, symphonyPlatform, productHuntPlatform, products, people);

    symphonyPlatform.registerRoute([
      {
        path: '/reviews',
        component: () => <ReviewsPage />,
      },
      {
        path: '/products/:productId/reviews',
        component: () => {
          const { productId } = useParams();
          return <ProductReviewsPage productId={productId || ''} />;
        },
      },
      {
        path: '/reviews/:reviewId/edit',
        component: () => {
          // EditReviewPage uses useParams internally to get reviewId
          return <EditReviewPage />;
        },
      },
      {
        path: '/admin/reviews',
        component: () => <ManageReviewsPage />,
      },
    ]);

    // Integrate with Products aspect
    products?.registerProductDetailsTab([
      {
        name: 'product-reviews-tab',
        label: 'Reviews',
        component: ({ productId }) => <ProductReviewsTab productId={productId} />,
      },
    ]);

    products?.registerProductAction([
      {
        name: 'add-review-button',
        component: ({ productId }) => <AddReviewButton productId={productId} buttonText="Add Your Review" />,
      },
    ]);

    // Integrate with People aspect
    people.registerUserProfileTab([
      {
        name: 'user-reviews-tab',
        label: 'Reviews',
        icon: ReviewIcon,
        component: ({ userId }) => <UserReviewsTab userId={userId} />,
      },
    ]);

    people.registerUserProfileAction([
      {
        name: 'manage-reviews-link',
        component: () => <ManageReviewsLink href="/admin/reviews">Manage Reviews</ManageReviewsLink>,
      },
    ]);

    // Integrate with ProductHuntPlatform aspect
    productHuntPlatform.registerNavigationItem([
      {
        name: 'reviews-navigation-item',
        label: 'Reviews',
        href: '/reviews',
        weight: 30, // Example weight
        icon: ReviewIcon,
      },
    ]);

    productHuntPlatform.registerUserBarMenuItem([
      {
        name: 'admin-manage-reviews',
        label: 'Manage Reviews',
        href: '/admin/reviews',
        allowedRoles: ['admin'], // Only visible to users with 'admin' role
        icon: ReviewIcon,
        weight: 100, // Example weight for admin items
      },
    ]);

    return reviews;
  }
}

export default ReviewsBrowser;