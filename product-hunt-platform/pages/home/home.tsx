import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import type { User } from '@infinity/product-hunt-platform.entities.user';
import { HomeSection } from './home-section.js';
import styles from './home.module.scss';

export type HomeProps = {
  /**
   * Optional CSS class name for the root element.
   */
  className?: string;
  /**
   * Optional inline styles for the root element.
   */
  style?: React.CSSProperties;

  sections?: HomeSection[],

  // Unauthenticated state content
  /**
   * Title for the hero section when the user is not authenticated.
   * @default 'Discover Tomorrow’s Tech, Today.'
   */
  heroTitleUnauthenticated?: string;
  /**
   * Subtitle for the hero section when the user is not authenticated.
   * @default 'Join Product Cult to find and share the latest innovations in tech, connect with makers, and be the first to explore groundbreaking products.'
   */
  heroSubtitleUnauthenticated?: string;
  /**
   * Call-to-action button text for the unauthenticated hero section.
   * @default 'Explore Products'
   */
  heroCtaTextUnauthenticated?: string;
  /**
   * Link for the unauthenticated hero section's call-to-action button.
   * @default '/products'
   */
  heroCtaLinkUnauthenticated?: string;
  /**
   * Background image URL for the hero section.
   * @default 'https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk4NjE1fDA&ixlib=rb-4.1.0'
   */
  heroBackgroundImageUrl?: string;

  // Authenticated state content
  /**
   * Greeting format for authenticated users. '{username}' will be replaced with the user's name.
   * @default 'Welcome back, {username}!'
   */
  greetingAuthenticatedFormat?: string;
  /**
   * Subtitle displayed below the greeting for authenticated users.
   * @default 'Ready to discover or share the next big thing? Let’s get started.'
   */
  subtitleAuthenticated?: string;
  /**
   * Text for the 'Submit a Product' call-to-action for authenticated users.
   * @default 'Share Your Innovation'
   */
  submitProductCtaText?: string;
  /**
   * Link for the 'Submit a Product' call-to-action.
   * @default '/submit-product'
   */
  submitProductCtaLink?: string;
  /**
   * Text for the 'Explore Products' call-to-action for authenticated users.
   * @default 'Discover New Products'
   */
  exploreProductsCtaText?: string;
  /**
   * Link for the 'Explore Products' call-to-action.
   * @default '/products'
   */
  exploreProductsCtaLink?: string;
  /**
   * Text for the 'View Profile' link for authenticated users.
   * @default 'My Profile'
   */
  viewProfileLinkText?: string;
  /**
   * Link for the 'View Profile' action.
   * @default '/profile'
   */
  viewProfileLink?: string;

  /**
   * Title for the generic content section.
   * @default 'Hot Right Now 🔥'
   */
  mainContentTitle?: string;
  /**
   * Placeholder text for the main content area.
   * @default 'Amazing new products and launches are featured here. Check out the latest discussions, or share your own project with the world!'
   */
  mainContentPlaceholderText?: string;
};

const DEFAULT_HERO_TITLE_UNAUTHENTICATED = 'Discover Tomorrow’s Tech, Today.';
const DEFAULT_HERO_SUBTITLE_UNAUTHENTICATED =
  'Join Product Cult to find and share the latest innovations in tech, connect with makers, and be the first to explore groundbreaking products.';
const DEFAULT_HERO_CTA_TEXT_UNAUTHENTICATED = 'Explore Products';
const DEFAULT_HERO_CTA_LINK_UNAUTHENTICATED = '/products';
const DEFAULT_HERO_BACKGROUND_IMAGE_URL =
  'https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk4NjE1fDA&ixlib=rb-4.1.0';

const DEFAULT_GREETING_AUTHENTICATED_FORMAT = 'Welcome back, {username}!';
const DEFAULT_SUBTITLE_AUTHENTICATED =
  'Ready to discover or share the next big thing? Let’s get started.';
const DEFAULT_SUBMIT_PRODUCT_CTA_TEXT = 'Share Your Innovation';
const DEFAULT_SUBMIT_PRODUCT_CTA_LINK = '/submit-product';
const DEFAULT_EXPLORE_PRODUCTS_CTA_TEXT = 'Discover New Products';
const DEFAULT_EXPLORE_PRODUCTS_CTA_LINK = '/products';
const DEFAULT_VIEW_PROFILE_LINK_TEXT = 'My Profile';
const DEFAULT_VIEW_PROFILE_LINK = '/profile';

const DEFAULT_MAIN_CONTENT_TITLE = 'Hot Right Now 🔥';
const DEFAULT_MAIN_CONTENT_PLACEHOLDER_TEXT =
  'Amazing new products and launches are featured here. Check out the latest discussions, or share your own project with the world!';

export function Home({
  className,
  style,
  heroTitleUnauthenticated = DEFAULT_HERO_TITLE_UNAUTHENTICATED,
  heroSubtitleUnauthenticated = DEFAULT_HERO_SUBTITLE_UNAUTHENTICATED,
  heroCtaTextUnauthenticated = DEFAULT_HERO_CTA_TEXT_UNAUTHENTICATED,
  heroCtaLinkUnauthenticated = DEFAULT_HERO_CTA_LINK_UNAUTHENTICATED,
  heroBackgroundImageUrl = DEFAULT_HERO_BACKGROUND_IMAGE_URL,
  greetingAuthenticatedFormat = DEFAULT_GREETING_AUTHENTICATED_FORMAT,
  subtitleAuthenticated = DEFAULT_SUBTITLE_AUTHENTICATED,
  submitProductCtaText = DEFAULT_SUBMIT_PRODUCT_CTA_TEXT,
  submitProductCtaLink = DEFAULT_SUBMIT_PRODUCT_CTA_LINK,
  exploreProductsCtaText = DEFAULT_EXPLORE_PRODUCTS_CTA_TEXT,
  exploreProductsCtaLink = DEFAULT_EXPLORE_PRODUCTS_CTA_LINK,
  viewProfileLinkText = DEFAULT_VIEW_PROFILE_LINK_TEXT,
  viewProfileLink = DEFAULT_VIEW_PROFILE_LINK,
  mainContentTitle = DEFAULT_MAIN_CONTENT_TITLE,
  mainContentPlaceholderText = DEFAULT_MAIN_CONTENT_PLACEHOLDER_TEXT,
  sections = []
}: HomeProps): React.JSX.Element {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className={classNames(styles.homePage, styles.loadingState, className)} style={style}>
        Loading your experience...
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.homePage, styles.errorState, className)} style={style}>
        Oops! Something went wrong. Please try refreshing the page.
      </div>
    );
  }

  const heroStyle = heroBackgroundImageUrl
    ? ({ backgroundImage: `url(${heroBackgroundImageUrl})` } as React.CSSProperties)
    : {};

  return (
    <div className={classNames(styles.homePage, className)} style={style}>
      {user ? (
        <AuthenticatedView
          user={user}
          greetingFormat={greetingAuthenticatedFormat}
          subtitle={subtitleAuthenticated}
          submitProductCtaText={submitProductCtaText}
          submitProductCtaLink={submitProductCtaLink}
          exploreProductsCtaText={exploreProductsCtaText}
          exploreProductsCtaLink={exploreProductsCtaLink}
          viewProfileLinkText={viewProfileLinkText}
          viewProfileLink={viewProfileLink}
          sections={sections}
          mainContentTitle={mainContentTitle}
          mainContentPlaceholderText={mainContentPlaceholderText}
        />
      ) : (
        <UnauthenticatedView
          sections={sections}
          heroTitle={heroTitleUnauthenticated}
          heroSubtitle={heroSubtitleUnauthenticated}
          heroCtaText={heroCtaTextUnauthenticated}
          heroCtaLink={heroCtaLinkUnauthenticated}
          heroStyle={heroStyle}
          mainContentTitle={mainContentTitle}
          mainContentPlaceholderText={mainContentPlaceholderText}
        />
      )}
    </div>
  );
}

type AuthenticatedViewProps = {
  user: User;
  greetingFormat: string;
  subtitle: string;
  submitProductCtaText: string;
  submitProductCtaLink: string;
  exploreProductsCtaText: string;
  exploreProductsCtaLink: string;
  viewProfileLinkText: string;
  viewProfileLink: string;
  sections: HomeSection[];
  mainContentTitle: string;
  mainContentPlaceholderText: string;
};

function AuthenticatedView({
  user,
  greetingFormat,
  subtitle,
  submitProductCtaText,
  submitProductCtaLink,
  exploreProductsCtaText,
  exploreProductsCtaLink,
  viewProfileLinkText,
  viewProfileLink,
  mainContentTitle,
  mainContentPlaceholderText,
  sections,
}: AuthenticatedViewProps): React.JSX.Element {
  const greeting = greetingFormat.replace('{username}', user.username);
  return (
    <div className={styles.authenticatedView}>
      <header className={styles.welcomeHeader}>
        <h1 className={styles.welcomeMessage}>{greeting}</h1>
        <p className={styles.welcomeSubtitle}>{subtitle}</p>
      </header>
      <section className={styles.userActions}>
        <Link to={submitProductCtaLink} className={classNames(styles.actionButton, styles.primaryAction)}>
          {submitProductCtaText}
        </Link>
        <Link to={exploreProductsCtaLink} className={classNames(styles.actionButton, styles.secondaryAction)}>
          {exploreProductsCtaText}
        </Link>
        <Link to={viewProfileLink} className={classNames(styles.actionLink, styles.secondaryAction)}>
          {viewProfileLinkText}
        </Link>
      </section>
      <section className={styles.mainContentSection}>
        <h2 className={styles.sectionTitle}>{mainContentTitle}</h2>
        <p className={styles.placeholderText}>{mainContentPlaceholderText}</p>
        {/* Placeholder for future content like featured products, user activity etc. */}
      </section>
      {sections.map((section) => {
        const Component = section.component;
        if (!Component) return null;
        return <Component key={section.name} />;
      })}
    </div>
  );
}

type UnauthenticatedViewProps = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroStyle: React.CSSProperties;
  sections: HomeSection[];
  mainContentTitle: string;
  mainContentPlaceholderText: string;
};

function UnauthenticatedView({
  heroTitle,
  heroSubtitle,
  heroCtaText,
  sections,
  heroCtaLink,
  heroStyle,
  mainContentTitle,
  mainContentPlaceholderText,
}: UnauthenticatedViewProps): React.JSX.Element {
  return (
    <div className={styles.unauthenticatedView}>
      <section className={styles.heroSection} style={heroStyle}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{heroTitle}</h1>
          <p className={styles.heroSubtitle}>{heroSubtitle}</p>
          <Link to={heroCtaLink} className={styles.heroCtaButton}>
            {heroCtaText}
          </Link>
        </div>
      </section>
      <section className={styles.mainContentSection}>
        <h2 className={styles.sectionTitle}>{mainContentTitle}</h2>
        <p className={styles.placeholderText}>{mainContentPlaceholderText}</p>
        {/* Placeholder for future content like featured products */}
      </section>
      {sections.map((section) => {
        const Component = section.component;
        if (!Component) return null;
        return <Component key={section.name} />;
      })}
    </div>
  );
}