import React, { type ComponentType, type SVGProps } from 'react';
import classNames from 'classnames';
import { Link } from '@infinity/design.navigation.link';
import { DefaultLogo } from './default-logo.js';
import styles from './logo.module.scss';

export type LogoProps = {
  /**
   * The name of the brand to display alongside the logo.
   * @default 'Product Hunt'
   */
  name?: string;

  /**
   * An optional slogan to display below the brand name.
   */
  slogan?: string;

  /**
   * The URL the logo should navigate to when clicked.
   * @default '/'
   */
  href?: string;

  /**
   * An optional custom SVG component to be used as the logo.
   * If provided, this will override the default logo.
   * The component will receive `width`, `height`, and `className` props.
   */
  svgLogo?: ComponentType<SVGProps<SVGSVGElement>>;

  /**
   * The size (width and height) of the logo image/SVG in pixels.
   * @default 40
   */
  logoSize?: number;

  /**
   * If true, the logo will be displayed in a minimal mode, showing only the SVG/image without the name or slogan.
   * @default false
   */
  minimal?: boolean;

  /**
   * An optional CSS class name to apply to the root container of the logo.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root container of the logo.
   */
  style?: React.CSSProperties;
};

/**
 * A versatile and brand-conscious logo component.
 * It displays a logo (defaulting to Product Hunt's) and optionally a name and slogan.
 * The logo is clickable and navigates to a specified URL.
 */
export const Logo: React.FC<LogoProps> = ({
  name = 'Product Hunt',
  slogan,
  href = '/',
  svgLogo,
  logoSize = 40,
  minimal = false,
  className,
  style,
}) => {
  const LogoComponentToRender = svgLogo || DefaultLogo;

  return (
    <Link
      href={href}
      className={classNames(styles.logoContainer, className)}
      style={style}
      aria-label={minimal ? name : `${name}${slogan ? `, ${slogan}` : ''} homepage`}
    >
      <LogoComponentToRender
        width={logoSize}
        height={logoSize}
        className={styles.logoImage}
      />
      {!minimal && (
        <div className={styles.textWrapper}>
          {name && <span className={styles.name}>{name}</span>}
          {slogan && <span className={styles.slogan}>{slogan}</span>}
        </div>
      )}
    </Link>
  );
};