import React from 'react';
import {
  Link as RouterLink,
  useLocation as rrUseLocation,
  useParams as rrUseParams,
  useNavigate as rrUseNavigate,
  useSearchParams as rrUseSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import styles from './link.module.scss';

export type LinkProps = {
  /**
   * The URL or path to navigate to.
   */
  href: string;
  /**
   * The content to be displayed within the link. Can be a string, number, or any valid React node.
   */
  children: React.ReactNode;
  /**
   * If true, the link will be treated as an external link and will open in a new tab by default.
   * Set to false for internal navigation using React Router.
   * Defaults to false.
   */
  external?: boolean;
  /**
   * Specifies where to open the linked document (e.g., '_blank', '_self', '_parent', '_top').
   * This property is primarily used when 'external' is true.
   * If 'external' is true and 'target' is not provided, it defaults to '_blank'.
   */
  target?: string;
  /**
   * Specifies the relationship of the target object to the link object.
   * This property is primarily used when 'external' is true.
   * Common values include 'noopener', 'noreferrer', 'nofollow'.
   * If 'external' is true and 'target' is '_blank', 'rel' defaults to 'noopener noreferrer' for security.
   */
  rel?: string;
  /**
   * Optional click handler function that is called when the link is clicked.
   * It receives the React MouseEvent as an argument.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  /**
   * An optional CSS class name to apply to the root element of the link.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the link's root element.
   * While available, it's generally recommended to use CSS classes for styling.
   */
  style?: React.CSSProperties;
};

/**
 * Link component for navigating within the application or to external URLs.
 * It intelligently uses React Router's Link for internal navigation and
 * a standard HTML <a> tag for external links, enhancing user experience and SEO.
 * The component is styled to fit modern aesthetics with clear hover and focus states.
 */
export function Link({
  href,
  children,
  external = false,
  target,
  rel,
  onClick,
  className,
  style,
}: LinkProps): React.JSX.Element {
  const linkClasses = classNames(styles.link, className);

  if (external) {
    const effectiveTarget = target || '_blank';
    const effectiveRel = rel || (effectiveTarget === '_blank' ? 'noopener noreferrer' : undefined);
    return (
      <a
        href={href}
        target={effectiveTarget}
        rel={effectiveRel}
        onClick={onClick}
        className={linkClasses}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} onClick={onClick} className={linkClasses} style={style}>
      {children}
    </RouterLink>
  );
}

/**
 * Hook that returns the current location object. This can be useful
 * for performing side effects whenever the current location changes.
 * Re-exported from react-router-dom.
 */
export const useLocation = rrUseLocation;

/**
 * Hook that returns an object of key/value pairs of URL parameters.
 * Uses window.location to parse the URL parameters.
 * Re-exported from react-router-dom.
 */
export const useParams = rrUseParams;

/**
 * Hook that returns an imperative method for changing the location.
 * Used by <Link>s, but may also be used by other elements to change
 * the location.
 * Re-exported from react-router-dom.
 */
export const useNavigate = rrUseNavigate;

/**
 * Hook that is used to read and modify the query string in the URL
 * for the current location.
 * Re-exported from react-router-dom as useSearchQuery.
 */
export const useSearchQuery = rrUseSearchParams;