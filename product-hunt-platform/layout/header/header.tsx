import type { ReactNode, ComponentType, CSSProperties } from 'react';
import classNames from 'classnames';
import { Logo } from '@infinity/design.content.logo';
import { Link } from '@infinity/design.navigation.link';
import { Flex } from '@infinity/design.layouts.flex';
import { ThemeToggler } from '@infinity/design.actions.theme-toggler';
import type { HeaderLinkType } from './header-link-type.js';
import styles from './header.module.scss';

/**
 * Props for the Header component.
 */
export type HeaderProps = {
  /**
   * The name to display in the logo.
   * @default 'Product Hunt'
   */
  logoName?: string;
  /**
   * The slogan to display in the logo.
   * If undefined, no slogan is shown.
   */
  logoSlogan?: string;
  /**
   * The URL the logo should navigate to when clicked.
   * @default '/'
   */
  logoHref?: string;
  /**
   * An array of navigation link objects to display in the header.
   * @default []
   */
  navLinks?: HeaderLinkType[];
  /**
   * An array of React components to be rendered as call-to-action elements
   * on the right side of the header (e.g., Login button, Signup button).
   * @default []
   */
  actions?: ComponentType<any>[];
  /**
   * Optional ReactNode to be rendered in the central area of the header,
   * between the navigation links and the action buttons.
   */
  children?: ReactNode;
  /**
   * An optional CSS class name to apply to the root element of the header.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the header.
   */
  style?: CSSProperties;
};

const DEFAULT_LOGO_NAME = 'Product Cult';
const DEFAULT_LOGO_HREF = '/';
const DEFAULT_NAV_LINKS: HeaderLinkType[] = [];
const DEFAULT_ACTIONS: ComponentType<any>[] = [];

/**
 * A responsive header component for the Product Hunt platform.
 * It displays a logo, navigation links, optional children in the center,
 * and call-to-action components along with a theme toggler on the right.
 */
export function Header({
  logoName = DEFAULT_LOGO_NAME,
  logoSlogan,
  logoHref = DEFAULT_LOGO_HREF,
  navLinks = DEFAULT_NAV_LINKS,
  actions = DEFAULT_ACTIONS,
  children,
  className,
  style,
}: HeaderProps): React.JSX.Element {
  return (
    <Flex
      as="header"
      className={classNames(styles.headerRoot, className)}
      style={style}
      alignItems="center"
      justifyContent="space-between"
      gap="var(--spacing-medium)"
    >
      {/* Left side: Logo and Navigation */}
      <Flex className={styles.leftSection} alignItems="center" gap="var(--spacing-large)">
        <Logo name={logoName} slogan={logoSlogan} href={logoHref} logoSize={32} />
        <Flex
          as="nav"
          className={styles.navLinksContainer}
          gap="var(--spacing-medium)"
          alignItems="center"
        >
          {navLinks.map((navLinkItem, index) => {
            const IconComponent = navLinkItem.icon;
            return (
              <Link
                key={`${navLinkItem.href}-${index}`}
                href={navLinkItem.href}
                external={navLinkItem.external}
                className={styles.navLink}
              >
                {IconComponent && <IconComponent className={styles.navLinkIcon} size={16} />}
                {navLinkItem.label}
              </Link>
            );
          })}
        </Flex>
      </Flex>

      {/* Center section: Children */}
      {children && <div className={styles.centerSection}>{children}</div>}

      {/* Right side: Actions and Theme Toggler */}
      <Flex className={styles.rightSection} alignItems="center" gap="var(--spacing-medium)">
        {actions.map((ActionComponent, index) => (
          <div key={`action-${index}`} className={styles.actionItem}>
            <ActionComponent />
          </div>
        ))}
        <ThemeToggler iconSize={20} />
      </Flex>
    </Flex>
  );
}