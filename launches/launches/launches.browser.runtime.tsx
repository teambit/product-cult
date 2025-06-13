import React from 'react';
import { useParams } from 'react-router-dom';
import { Route } from '@bitdev/symphony.frontends.route';

import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';

import { ProductHuntPlatformAspect, type ProductHuntPlatformBrowser, type NavigationItem, type HeaderLink, type HomepageSection } from '@infinity/product-hunt-platform.product-hunt-platform';

import { PeopleAspect, type PeopleBrowser, type UserProfileTab } from '@infinity/people.people';

import { ProductsAspect, type ProductsBrowser, type ProductAction, type ProductDetailsTab, type ProductProps as ProductsProductProps } from '@infinity/products.products';
import type { LaunchesConfig } from './launches-config.js';
import { LaunchCard, LaunchCardSlot } from './launch-card.js';
import { LaunchDetailsTab, LaunchDetailsTabSlot } from './launch-details-tab.js';
import { LaunchAction, LaunchActionSlot } from './launch-action.js';
import { LaunchSubmitForm, LaunchSubmitFormSlot } from './launch-submit-form.js';
import { LaunchListFilter, LaunchListFilterSlot } from './launch-list-filter.js';

// Component imports
import { LaunchesPage } from '@infinity/launches.pages.launches-page';
import { LaunchDetailsPage } from '@infinity/launches.pages.launch-details-page';
import { SubmitLaunchPage } from '@infinity/launches.pages.submit-launch-page';
import { CreateLaunchPage } from '@infinity/launches.admin.create-launch';
import { EditLaunch } from '@infinity/launches.admin.edit-launch';
import { TrackLaunchButton, type LaunchType } from '@infinity/launches.products.track-launch-button';
import { LaunchInfoTab } from '@infinity/launches.products.launch-info-tab';
import { UserLaunchesTab } from '@infinity/launches.people.user-launches-tab';
import { UpcomingLaunchesSection } from '@infinity/launches.homepage-section.upcoming-launches-section';
import { PlusIcon } from '@infinity/launches.icons.plus-icon';
import { useListLaunches } from '@infinity/launches.hooks.use-launches';


export class LaunchesBrowser {
  constructor(
    private launchesConfig: LaunchesConfig,
    private launchCardSlot: LaunchCardSlot,
    private launchDetailsTabSlot: LaunchDetailsTabSlot,
    private launchActionSlot: LaunchActionSlot,
    private launchSubmitFormSlot: LaunchSubmitFormSlot,
    private launchListFilterSlot: LaunchListFilterSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
    private products: ProductsBrowser,
    private people: PeopleBrowser,
  ) {}

  /**
   * Register a list of launch card components.
   * This slot allows other aspects to provide custom implementations of launch cards.
   */
  registerLaunchCard(launchCards: LaunchCard[]) {
    this.launchCardSlot.register(launchCards);
    return this;
  }

  /**
   * List all registered launch card components.
   */
  listLaunchCards() {
    return this.launchCardSlot.flatValues();
  }

  /**
   * Register a list of launch details tab components.
   * These tabs can be displayed on the launch details page.
   */
  registerLaunchDetailsTab(launchDetailsTabs: LaunchDetailsTab[]) {
    this.launchDetailsTabSlot.register(launchDetailsTabs);
    return this;
  }

  /**
   * List all registered launch details tab components.
   */
  listLaunchDetailsTabs() {
    return this.launchDetailsTabSlot.flatValues();
  }

  /**
   * Register a list of launch action components.
   * These actions can be displayed on launch-related pages.
   */
  registerLaunchAction(launchActions: LaunchAction[]) {
    this.launchActionSlot.register(launchActions);
    return this;
  }

  /**
   * List all registered launch action components.
   */
  listLaunchActions() {
    return this.launchActionSlot.flatValues();
  }

  /**
   * Register a list of launch submit form components.
   * This slot allows for custom submission forms.
   */
  registerLaunchSubmitForm(launchSubmitForms: LaunchSubmitForm[]) {
    this.launchSubmitFormSlot.register(launchSubmitForms);
    return this;
  }

  /**
   * List all registered launch submit form components.
   */
  listLaunchSubmitForms() {
    return this.launchSubmitFormSlot.flatValues();
  }

  /**
   * Register a list of launch list filter components.
   * These filters can be used to refine the list of launches.
   */
  registerLaunchListFilter(launchListFilters: LaunchListFilter[]) {
    this.launchListFilterSlot.register(launchListFilters);
    return this;
  }

  /**
   * List all registered launch list filter components.
   */
  listLaunchListFilters() {
    return this.launchListFilterSlot.flatValues();
  }


  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, ProductsAspect, PeopleAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, products, people]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser, ProductsBrowser, PeopleBrowser],
    config: LaunchesConfig,
    [launchCardSlot, launchDetailsTabSlot, launchActionSlot, launchSubmitFormSlot, launchListFilterSlot]: [LaunchCardSlot, LaunchDetailsTabSlot, LaunchActionSlot, LaunchSubmitFormSlot, LaunchListFilterSlot]
  ) {
    const launches = new LaunchesBrowser(config, launchCardSlot, launchDetailsTabSlot, launchActionSlot, launchSubmitFormSlot, launchListFilterSlot, symphonyPlatform, productHuntPlatform, products, people);

    // Register routes for the Launches aspect to Symphony Platform
    symphonyPlatform.registerRoute([
      {
        path: '/launches',
        component: () => <LaunchesPage />,
      },
      {
        path: '/launches/:launchId',
        component: () => <LaunchDetailsPage />,
      },
      {
        path: '/submit-launch',
        component: () => <SubmitLaunchPage />,
      },
      {
        path: '/admin/launches/create',
        component: () => <CreateLaunchPage />,
      },
      {
        path: '/admin/launches/:launchId/edit',
        component: () => <EditLaunch />,
      },
    ] as Route[]); // Cast to Route[] type

    // Integrate into Product Hunt Platform
    productHuntPlatform.registerNavigationItem([
      {
        name: 'launches-nav',
        label: 'Launches',
        href: '/launches',
      },
    ] as NavigationItem[]);

    productHuntPlatform.registerHeaderLink([
      {
        name: 'submit-launch-link',
        label: 'Submit Launch',
        href: '/submit-launch',
        icon: PlusIcon,
      },
    ] as HeaderLink[]);

    productHuntPlatform.registerHomepageSection([
      {
        name: 'upcoming-launches-section',
        component: UpcomingLaunchesSection,
      },
    ] as HomepageSection[]);

    // Integrate into Products aspect
    products?.registerProductAction([
      {
        name: 'track-launch-button',
        component: (actionProps: { productId: string }) => {
          const { productId } = actionProps;
          // Fetch the relevant launch for this product.
          // This example assumes you want the most recent launch or a specific upcoming/live one.
          const { data, loading, error } = useListLaunches({ productId, limit: 1 });

          // TODO: Replace with actual user ID from authentication context
          const userId = "current-user-id-from-context";

          if (loading) {
            return <button disabled>Loading...</button>;
          }
          if (error || !data?.listLaunches || data.listLaunches.length === 0) {
            return null; 
          }

          const launchEntity = data.listLaunches[0];
          const launchObjectForButton: LaunchType = launchEntity.toObject();

          return <TrackLaunchButton launch={launchObjectForButton} userId={userId} />;
        },
      },
    ] as ProductAction[]);

    products?.registerProductDetailsTab([
      {
        name: 'launch-info-tab',
        label: 'Launches',
        component: ({ productId }: ProductsProductProps) => <LaunchInfoTab productId={productId} />,
      },
    ] as ProductDetailsTab[]);

    // Integrate into People aspect
    people.registerUserProfileTab([
      {
        name: 'user-launches-tab',
        label: 'Launches',
        component: () => {
          const { userId } = useParams();
          return userId ? <UserLaunchesTab userId={userId} /> : null;
        },
      },
    ] as UserProfileTab[]);

    return launches;
  }
}

export default LaunchesBrowser;