import React from 'react';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { type Route } from '@bitdev/symphony.frontends.route';

import {
  ProductHuntPlatformAspect,
  ProductHuntPlatformBrowser,
  type HeaderLink,
  type HomepageSection,
  type AppLayoutHeader,
} from '@infinity/product-hunt-platform.product-hunt-platform';
import type { SearchConfig } from './search-config.js';
import { SearchResultItem, SearchResultItemSlot } from './search-result-item.js';
import { SearchFilter, SearchFilterSlot } from './search-filter.js';
import { SearchTypeComponent, SearchTypeComponentSlot } from './search-type-component.js';

// Components for integration
import { SearchBar } from '@infinity/search.composites.app-layout-header.search-bar';
import { TrendingSearches } from '@infinity/search.composites.homepage-section.trending-searches';
import { SearchIcon } from '@infinity/search.icons.search-icon';
import { SearchPage } from '@infinity/search.pages.search-page';

export class SearchBrowser {
  constructor(
    private searchConfig: SearchConfig,
    private searchResultItemSlot: SearchResultItemSlot,
    private searchFilterSlot: SearchFilterSlot,
    private searchTypeComponentSlot: SearchTypeComponentSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
  ) {}

  /**
   * register a list of search result-item.
   */
  registerSearchResultItem(searchResultItems: SearchResultItem[]) {
    this.searchResultItemSlot.register(searchResultItems);
    return this;
  }

  /**
   * list all search result-item.
   */
  listSearchResultItems() {
    return this.searchResultItemSlot.flatValues();
  }

  /**
   * register a list of search filter.
   */
  registerSearchFilter(searchFilters: SearchFilter[]) {
    this.searchFilterSlot.register(searchFilters);
    return this;
  }

  /**
   * list all search filter.
   */
  listSearchFilters() {
    return this.searchFilterSlot.flatValues();
  }

  /**
   * register a list of search type-component.
   */
  registerSearchTypeComponent(searchTypeComponents: SearchTypeComponent[]) {
    this.searchTypeComponentSlot.register(searchTypeComponents);
    return this;
  }

  /**
   * list all search type-component.
   */
  listSearchTypeComponents() {
    return this.searchTypeComponentSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser],
    config: SearchConfig,
    [searchResultItemSlot, searchFilterSlot, searchTypeComponentSlot]: [SearchResultItemSlot, SearchFilterSlot, SearchTypeComponentSlot]
  ) {
    const search = new SearchBrowser(config, searchResultItemSlot, searchFilterSlot, searchTypeComponentSlot, symphonyPlatform, productHuntPlatform);

    // Define and compose route components needed for the aspect.
    const searchRoutes: Route[] = [
      {
        path: '/search',
        component: () => {
          return <SearchPage />;
        },
      },
    ];
    symphonyPlatform.registerRoute(searchRoutes);

    // Integration with Product Hunt Platform
    // Register SearchBar to the app layout header
    const appLayoutHeaders: AppLayoutHeader[] = [
      {
        name: 'search-bar-header',
        component: () => <SearchBar />,
      },
    ];
    productHuntPlatform.registerAppLayoutHeader(appLayoutHeaders);

    // Register TrendingSearches to the homepage sections
    const homepageSections: HomepageSection[] = [
      {
        name: 'trending-searches-homepage',
        component: () => <TrendingSearches />,
        weight: 10, // Assign a weight to influence display order on the homepage
      },
    ];
    productHuntPlatform.registerHomepageSection(homepageSections);

    // Register a header link for search
    const headerLinks: HeaderLink[] = [
      {
        name: 'search-link',
        label: 'Search',
        href: '/search',
        icon: SearchIcon,
      },
    ];
    productHuntPlatform.registerHeaderLink(headerLinks);

    return search;
  }
}

export default SearchBrowser;