import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

// Aspect dependencies
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser } from '@bitdev/symphony.symphony-platform';
import { ProductHuntPlatformAspect } from '@infinity/product-hunt-platform.product-hunt-platform';
import { PeopleAspect, type PeopleBrowser } from '@infinity/people.people';
import { SearchAspect } from '@infinity/search.search'; // Added SearchResultItemProps import

// Types
import type { ProductsConfig } from './products-config.js';
import type { ProductAction, ProductActionSlot } from './product-action.js';
import type { ProductDetailsTab, ProductDetailsTabSlot } from './product-details-tab.js';
import type { Route } from '@bitdev/symphony.frontends.route';
import type { HomepageSection, HeaderLink, ProductHuntPlatformBrowser, NavigationItem, UserBarMenuItem } from '@infinity/product-hunt-platform.product-hunt-platform';
import type { SearchResultItem, SearchFilter, SearchTypeComponent, SearchBrowser, SearchResultItemProps as SearchAspectSearchResultItemProps } from '@infinity/search.search';

// Product components
import { ProductsPage } from '@infinity/products.pages.products-page';
import { ProductDetailPage } from '@infinity/products.pages.product-detail-page';
import { SubmitProductPage } from '@infinity/products.pages.submit-product-page';
import { CreateProductPage } from '@infinity/products.admin.create-product';
import { EditProduct } from '@infinity/products.admin.edit-product';
import { FeaturedProducts } from '@infinity/products.homepage-section.featured-products';
import { ProductSearchResultItem, type ProductSearchResultItemProps } from '@infinity/products.search.product-search-result-item';
import { ProductCategoryFilter } from '@infinity/products.search.product-category-filter';
import { productSearchTypeEntry } from '@infinity/products.search.product-search-type'; // Removed ProductSearchType import as it's unused
import { UserProductsTab } from '@infinity/products.people.user-products-tab';
import { ProductIcon } from '@infinity/products.icons.product-icon';

const AdaptedProductSearchResultItem: React.FC<SearchAspectSearchResultItemProps> = ({ data }) => {
  // Assuming `data` (PlainSearchResult) is structurally compatible with what `ProductSearchResultItem` expects for `searchResult`.
  // This cast might be necessary if the nominal types are different but structures align.
  // The `ProductSearchResultItem` expects a `searchResult` prop. The `SearchAspect` provides a `data` prop.
  return <ProductSearchResultItem searchResult={data as any} />;
};


export class ProductsBrowser {
  constructor(
    private productsConfig: ProductsConfig,
    private productActionSlot: ProductActionSlot,
    private productDetailsTabSlot: ProductDetailsTabSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private productHuntPlatform: ProductHuntPlatformBrowser,
    private search: SearchBrowser,
    private people: PeopleBrowser,
  ) {}

  /**
   * register a list of product action.
   */
  registerProductAction(productActions: ProductAction[]) {
    this.productActionSlot.register(productActions);
    return this;
  }

  /**
   * list all product action.
   */
  listProductActions() {
    return this.productActionSlot.flatValues();
  }

  /**
   * register a list of product details-tab.
   */
  registerProductDetailsTab(productDetailsTabs: ProductDetailsTab[]) {
    this.productDetailsTabSlot.register(productDetailsTabs);
    return this;
  }

  /**
   * list all product details-tab.
   */
  listProductDetailsTabs() {
    return this.productDetailsTabSlot.flatValues();
  }

  static dependencies = [SymphonyPlatformAspect, ProductHuntPlatformAspect, SearchAspect, PeopleAspect];

  static async provider(
    [symphonyPlatform, productHuntPlatform, search, people]: [SymphonyPlatformBrowser, ProductHuntPlatformBrowser, SearchBrowser, PeopleBrowser],
    config: ProductsConfig,
    [productActionSlot, productDetailsTabSlot]: [ProductActionSlot, ProductDetailsTabSlot]
  ) {
    const products = new ProductsBrowser(config, productActionSlot, productDetailsTabSlot, symphonyPlatform, productHuntPlatform, search, people);

    // Register routes to the Symphony Platform
    symphonyPlatform.registerRoute([
      {
        path: '/products',
        component: () => {
          const [searchParams] = useSearchParams();
          const categoryId = searchParams.get('category') || undefined;
          return <ProductsPage title="All Products" metaDescription="Discover a wide range of products." categoryId={categoryId || 'all'} />;
        }
      },
      {
        path: '/products/:productId',
        component: () => {
          const { productId } = useParams<{ productId: string }>();
          const tabs = products.listProductDetailsTabs();
          if (!productId) return <div>Product ID missing</div>;
          return <ProductDetailPage tabs={tabs} productId={productId} />;
        }
      },
      {
        path: '/submit-product',
        component: () => <SubmitProductPage />,
      },
      // Admin-related product pages, directly accessible via routes as admin aspect is not used for registration.
      {
        path: '/admin/products/create',
        component: () => <CreateProductPage />,
      },
      {
        path: '/admin/products/edit/:productId',
        component: () => <EditProduct />, // EditProduct component uses useParams internally
      },
    ] as Route[]);

    // Integrate with ProductHuntPlatform slots
    productHuntPlatform.registerHeaderLink([
      {
        name: 'products-header-link',
        label: 'Products',
        href: '/products',
        weight: -10,
      },
      // {
      //   name: 'submit-product-header-link',
      //   label: 'Submit Product',
      //   href: '/submit-product',
      // }
    ] as HeaderLink[]);

    productHuntPlatform.registerNavigationItem([
      {
        name: 'products-nav-item',
        label: 'Products',
        href: '/products',
        icon: ProductIcon,
        weight: 10,
      },
      {
        name: 'submit-product-nav-item',
        label: 'Submit Product',
        href: '/submit-product',
        icon: ProductIcon,
        weight: 20,
      }
    ] as NavigationItem[]);

    productHuntPlatform.registerHomepageSection([
      {
        name: 'featured-products-homepage',
        component: () => <FeaturedProducts title="Our Top Picks" categoryId="top-picks" limit={6} />,
        weight: 10,
      }
    ] as HomepageSection[]);

    productHuntPlatform.registerUserBarMenuItem([
      {
        name: 'create-product-admin-menu',
        label: 'Create Product (Admin)',
        href: '/admin/products/create',
        allowedRoles: ['admin'], // Assuming an admin role for this
        icon: ProductIcon,
      },
      {
        name: 'edit-products-admin-menu',
        label: 'Edit Products (Admin)',
        href: '/admin/products/edit/placeholder', // This might link to a generic admin product list for editing
        allowedRoles: ['admin'],
        icon: ProductIcon,
      }
    ] as UserBarMenuItem[]);

    // Integrate with Search Aspect slots
    search.registerSearchResultItem([
      {
        name: 'product-search-result',
        type: 'product', // The type of search result this component handles
        component: AdaptedProductSearchResultItem, // Use the adapter here
      }
    ] as SearchResultItem[]);

    search.registerSearchFilter([
      {
        name: 'product-category-filter',
        label: 'Product Category',
        component: ProductCategoryFilter,
      }
    ] as SearchFilter[]);

    search.registerSearchTypeComponent([
      productSearchTypeEntry, // Reusing the exported entry for the product search type
    ] as SearchTypeComponent[]);

    // Integrate with People Aspect slots
    people.registerUserProfileTab([
      {
        name: 'user-products-profile-tab',
        label: 'Submitted Products',
        component: ({ userId }) => <UserProductsTab userId={userId} />,
        icon: ProductIcon,
        weight: 20,
      }
    ]);

    return products;
  }
}

export default ProductsBrowser;
