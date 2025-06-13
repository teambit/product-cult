import React from 'react';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Link } from '@infinity/design.navigation.link';
import { Image } from '@infinity/design.content.image';
import styles from './not-found-page.module.scss';

/**
 * Defines the properties for the NotFoundPage component.
 */
export type NotFoundPageProps = {
  /**
   * Optional custom CSS class name to apply to the root element.
   * This allows for additional styling or overrides.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;

  /**
   * The route to navigate to when the user clicks the "Go Home" link.
   * Defaults to `/`.
   */
  homePageRoute?: string;

  /**
   * The URL for the image to display on the 404 page.
   * Defaults to a relevant placeholder image of an astronaut.
   */
  imageUrl?: string;

  /**
   * The alt text for the image.
   * Defaults to a descriptive alt text for the astronaut image.
   */
  imageAltText?: string;

  /**
   * The main title text for the 404 page.
   * Defaults to "404 - Page Not Found".
   */
  titleText?: string;

  /**
   * The descriptive message text for the 404 page.
   * Defaults to "Oops! The page you&apos;re looking for seems to have drifted off into the cosmos."
   */
  messageText?: string;

  /**
   * The text for the link that navigates the user back.
   * Defaults to "Return to Mission Control (Homepage)".
   */
  linkText?: string;
};

const DEFAULT_IMAGE_URL = `https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=800&q=80`;
const DEFAULT_IMAGE_ALT = `Astronaut floating in space, indicating a page not found.`;
const DEFAULT_TITLE_TEXT = `404 - Page Not Found`;
const DEFAULT_MESSAGE_TEXT = `Oops! The page you&apos;re looking for seems to have drifted off into the cosmos. It might have been moved, deleted, or perhaps it never existed.`;
const DEFAULT_LINK_TEXT = `Return to Mission Control (Homepage)`;
const DEFAULT_HOME_ROUTE = `/`;

/**
 * NotFoundPage component displays a user-friendly 404 error page.
 * It includes an illustrative image, a clear message, and a link to navigate back to safety.
 */
export function NotFoundPage({
  className,
  style,
  homePageRoute = DEFAULT_HOME_ROUTE,
  imageUrl = DEFAULT_IMAGE_URL,
  imageAltText = DEFAULT_IMAGE_ALT,
  titleText = DEFAULT_TITLE_TEXT,
  messageText = DEFAULT_MESSAGE_TEXT,
  linkText = DEFAULT_LINK_TEXT,
}: NotFoundPageProps): React.JSX.Element {
  const rootClassName = `${styles.notFoundPage}${className ? ` ${className}` : ''}`;
  return (
    <div
      className={rootClassName}
      style={style}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={imageAltText}
            className={styles.errorImage}
            width="300" // Set a base width, SCSS can make it responsive
            height="300" // Set a base height, SCSS can make it responsive
            objectFit="contain"
            loading="eager" // Load 404 image eagerly
          />
        </div>
        <Heading level={1} className={styles.errorTitle}>
          {titleText}
        </Heading>
        <Paragraph className={styles.errorMessage}>
          {messageText}
        </Paragraph>
        <Link href={homePageRoute} className={styles.homeLink}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}