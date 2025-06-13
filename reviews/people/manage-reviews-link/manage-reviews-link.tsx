import React from 'react';
import classNames from 'classnames';
import { Link } from '@infinity/design.navigation.link';
import styles from './manage-reviews-link.module.scss';

export type ManageReviewsLinkProps = {
  /**
   * The URL to navigate to when the link is clicked.
   * This should point to the page where the user can manage their reviews.
   */
  href: string;
  /**
   * The content to be displayed within the link.
   * Defaults to "Manage Reviews".
   */
  children?: React.ReactNode;
  /**
   * Optional CSS class name to apply to the link component.
   * This allows for custom styling specific to this instance of the link.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the link component.
   * Use sparingly; prefer `className` for styling.
   */
  style?: React.CSSProperties;
};

/**
 * ManageReviewsLink is a component designed for user profiles or similar contexts,
 * providing a clear, styled link to a page where users can manage their reviews.
 * It leverages the base Link component for navigation and accessibility,
 * applying specific styling to fit its role as a user action.
 */
export function ManageReviewsLink({
  href,
  children = `Manage Reviews`,
  className,
  style,
}: ManageReviewsLinkProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className={classNames(styles.manageReviewsLink, className)}
      style={style}
    >
      {children}
    </Link>
  );
}