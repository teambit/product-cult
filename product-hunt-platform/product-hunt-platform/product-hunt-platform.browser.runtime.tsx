import React, { ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { SymphonyPlatformAspect, type SymphonyPlatformBrowser, type TopLevelSlot } from '@bitdev/symphony.symphony-platform';
import type { ProductHuntPlatformConfig } from './product-hunt-platform-config.js';
import { NavigationItem, NavigationItemSlot } from './navigation-item.js';
import { HeaderLink, HeaderLinkSlot } from './header-link.js';
import { HomepageSection, HomepageSectionSlot } from './homepage-section.js';
import { UserBarMenuItem, UserBarMenuItemSlot } from './user-bar-menu-item.js';
import { AppLayoutHeader, AppLayoutHeaderSlot } from './app-layout-header.js';
import { AppLayoutFooter, AppLayoutFooterSlot } from './app-layout-footer.js';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Header } from '@infinity/product-hunt-platform.layout.header';
import { ThemeToggler } from '@infinity/design.actions.theme-toggler';
import { UserBar } from '@infinity/product-hunt-platform.composites.user-bar';
// AuthProvider class removed as it's not a JSX component
import { Home } from '@infinity/product-hunt-platform.pages.home';
import { Login } from '@infinity/product-hunt-platform.pages.login';
import { Signup } from '@infinity/product-hunt-platform.pages.signup';
import { NotFoundPage } from '@infinity/product-hunt-platform.pages.not-found-page';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';
import type { Route } from '@bitdev/symphony.frontends.route';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';

export class ProductHuntPlatformBrowser {
  constructor(
    private productHuntPlatformConfig: ProductHuntPlatformConfig,
    private navigationItemSlot: NavigationItemSlot,
    private headerLinkSlot: HeaderLinkSlot,
    private homepageSectionSlot: HomepageSectionSlot,
    private userBarMenuItemSlot: UserBarMenuItemSlot,
    private appLayoutHeaderSlot: AppLayoutHeaderSlot,
    private appLayoutFooterSlot: AppLayoutFooterSlot,
    private symphonyPlatform: SymphonyPlatformBrowser,
    private topLevelComponentsSlot: TopLevelSlot // Added from template to handle AuthProvider
  ) {}

  /**
   * register a list of navigation item.
   */
  registerNavigationItem(navigationItems: NavigationItem[]) {
    this.navigationItemSlot.register(navigationItems);
    return this;
  }

  /**
   * list all navigation item.
   */
  listNavigationItems() {
    return this.navigationItemSlot.flatValues();
  }

  /**
   * register a list of header link.
   */
  registerHeaderLink(headerLinks: HeaderLink[]) {
    this.headerLinkSlot.register(headerLinks);
    return this;
  }

  /**
   * list all header link.
   */
  listHeaderLinks() {
    return this.headerLinkSlot.flatValues();
  }

  /**
   * register a list of homepage section.
   */
  registerHomepageSection(homepageSections: HomepageSection[]) {
    this.homepageSectionSlot.register(homepageSections);
    return this;
  }

  /**
   * list all homepage section.
   */
  listHomepageSections() {
    return this.homepageSectionSlot.flatValues();
  }

  /**
   * register a list of user bar-menu-item.
   */
  registerUserBarMenuItem(userBarMenuItems: UserBarMenuItem[]) {
    this.userBarMenuItemSlot.register(userBarMenuItems);
    return this;
  }

  /**
   * list all user bar-menu-item.
   */
  listUserBarMenuItems() {
    return this.userBarMenuItemSlot.flatValues();
  }

  /**
   * register a list of app layout-header.
   */
  registerAppLayoutHeader(appLayoutHeaders: AppLayoutHeader[]) {
    this.appLayoutHeaderSlot.register(appLayoutHeaders);
    return this;
  }

  /**
   * list all app layout-header.
   */
  listAppLayoutHeaders() {
    return this.appLayoutHeaderSlot.flatValues();
  }

  /**
   * register a list of app layout-footer.
   */
  registerAppLayoutFooter(appLayoutFooters: AppLayoutFooter[]) {
    this.appLayoutFooterSlot.register(appLayoutFooters);
    return this;
  }

  /**
   * list all app layout-footer.
   */
  listAppLayoutFooters() {
    return this.appLayoutFooterSlot.flatValues();
  }

  /**
   * register new routes to the platform.
   */
  registerRoute(routes: Route[]) {
    this.symphonyPlatform.registerRoute(routes);
    return this;
  }

  static dependencies = [SymphonyPlatformAspect];

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformBrowser],
    config: ProductHuntPlatformConfig,
    [navigationItemSlot, headerLinkSlot, homepageSectionSlot, userBarMenuItemSlot, appLayoutHeaderSlot, appLayoutFooterSlot, topLevelComponentsSlot]: [NavigationItemSlot, HeaderLinkSlot, HomepageSectionSlot, UserBarMenuItemSlot, AppLayoutHeaderSlot, AppLayoutFooterSlot, TopLevelSlot]
  ) {
    const productHuntPlatform = new ProductHuntPlatformBrowser(config, navigationItemSlot, headerLinkSlot, homepageSectionSlot, userBarMenuItemSlot, appLayoutHeaderSlot, appLayoutFooterSlot, symphonyPlatform, topLevelComponentsSlot);

    // Register primary header links for the platform
    productHuntPlatform.registerHeaderLink([
      { name: 'home', label: 'Home', href: '/' },
      // { name: 'products', label: 'Products', href: '/products' },
      { name: 'launches', label: 'Launches', href: '/launches' },
      // { name: 'news', label: 'News', href: '/news' },
      { name: 'forums', label: 'Forums', href: '/forums' },
    ]);

    // Register user bar menu items
    productHuntPlatform.registerUserBarMenuItem([
      { name: 'profile', label: 'My Profile', href: '/profile' },
      { name: 'settings', label: 'Settings', href: '/settings' },
      { name: 'admin-dashboard', label: 'Admin Dashboard', href: '/admin', allowedRoles: ['admin'] },
    ]);

    // Register top-level wrapper components
    symphonyPlatform.registerTopLevel({
      component: ({ children }) => {
        // The AuthProvider class from @infinity/product-hunt-platform.providers.auth-provider is not a JSX component.
        // Authentication context is typically handled by ApolloProvider (set up by Symphony) and the useAuth hook.
        // If a specific wrapper is needed, it should be a React component. For now, use a fragment.
        return <>{children}</>;
      }
    });

    // Register theme
    symphonyPlatform.registerTheme((props) => {
      return <InfinityTheme {...props} />;
    });

    // Register main application routes
    productHuntPlatform.registerRoute([
      { path: '/', component: () => {
        const sections = productHuntPlatform.listHomepageSections();

        return <Home sections={sections} />;
      }},
      { path: '/login', component: Login },
      { path: '/signup', component: Signup },
      {
        path: '/profile',
        component: () => <ProtectedRoute redirectTo="/login"><div>User Profile Page (Protected)</div></ProtectedRoute>
      },
      {
        path: '/settings',
        component: () => <ProtectedRoute redirectTo="/login"><div>User Settings Page (Protected)</div></ProtectedRoute>
      },
      {
        path: '/admin',
        component: () => <ProtectedRoute redirectTo="/login"><div>Admin Dashboard (Protected)</div></ProtectedRoute>
      },
      // You can also add routes registered by other aspects here if needed.
    ]);

    // Register Page Not Found component
    symphonyPlatform.registerPageNotFound(NotFoundPage);

    // Register components to the application layout
    symphonyPlatform.registerLayoutEntry([
      {
        position: 'top',
        component: () => {
          const { user } = useAuth(); // Use useAuth hook within the component
          const location = useLocation();
          // Filter header links based on authentication status
          const headerLinks = productHuntPlatform.listHeaderLinks()
            .filter(link => link.authenticated === undefined || link.authenticated === !!user);

          // Prepare action components for the header
          const actions: ComponentType<any>[] = [];

          // Conditionally add UserBar or login/signup actions
          if (user) {
            actions.push(() => <UserBar menuItems={productHuntPlatform.listUserBarMenuItems()} />);
          } else if (!location.pathname.startsWith('/login') && !location.pathname.startsWith('/signup')) {
            actions.push(
              () => <a href="/login" style={{ padding: '8px 12px', border: '1px solid var(--colors-border-default)', borderRadius: '6px', textDecoration: 'none', color: 'var(--colors-text-primary)' }}>Login</a>,
              () => <a href="/signup" style={{ padding: '8px 12px', backgroundColor: 'var(--colors-primary-default)', borderRadius: '6px', textDecoration: 'none', color: 'var(--colors-text-inverse)' }}>Sign Up</a>
            );
          }

          return (
            <Header
              navLinks={headerLinks}
              actions={actions}
            />
          );
        }
      },
      // AppLayoutFooterSlot is an API for others to register their footers,
      // not necessarily for this aspect to enforce a global footer via registerLayoutEntry 'bottom'.
    ]);

    return productHuntPlatform;
  }
}

export default ProductHuntPlatformBrowser;