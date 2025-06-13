import React from 'react';
import { Link } from '@infinity/design.navigation.link';
import type { ButtonAppearance } from './button-appearance-type.js';
import styles from './button.module.scss';

/**
 * Props for the Button component.
 * Defines the properties accepted by the Button to customize its behavior and appearance.
 */
export type ButtonProps = {
  /**
   * Callback fired when the button is clicked.
   * Receives the React MouseEvent, which can originate from either an HTMLButtonElement or an HTMLAnchorElement
   * depending on whether an `href` is provided.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;

  /**
   * The type attribute of the button element, used only when the component renders as a native HTML `<button>`.
   * This is ignored if an `href` is provided (rendering an `<a>` tag).
   * Defaults to 'button'.
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * The content to be displayed within the button.
   * This can be a simple string, a number, or any valid React node (e.g., an icon alongside text).
   */
  children: React.ReactNode;

  /**
   * If provided, the button will be rendered as an anchor (`<a>`) tag styled as a button,
   * utilizing the Link component for navigation. This prop specifies the URL the link will navigate to.
   * If omitted, a native `<button>` element is rendered.
   */
  href?: string;

  /**
   * If true, the button will be visually and functionally disabled, preventing interaction.
   * Defaults to false.
   */
  disabled?: boolean;

  /**
   * If true and an `href` is also provided, the link will be treated as an external link.
   * This typically means it will open in a new tab and include `rel="noopener noreferrer"` for security.
   * This prop is only applicable when `href` is set. Defaults to false.
   */
  external?: boolean;

  /**
   * An optional CSS class name to apply to the root element of the button.
   * This allows for applying custom styles or integrating with utility CSS frameworks.
   */
  className?: string;

  /**
   * The visual appearance style of the button, determining its color scheme and overall look.
   * Options include 'primary' for main actions, 'secondary' for alternative actions,
   * and 'tertiary' for less prominent, often text-like actions.
   * Defaults to 'primary'.
   */
  appearance?: ButtonAppearance;

  /**
   * Optional inline styles to apply to the button's root element.
   * While available for specific overrides, it's generally recommended to use
   * the `className` prop and SCSS modules for styling to maintain consistency and reusability.
   */
  style?: React.CSSProperties;
};

/**
 * A versatile and accessible button component that prioritizes user experience and visual consistency.
 * It can render as a standard HTML button or as a link (anchor tag) with button styling if an `href` is provided.
 * Supports multiple visual appearances (primary, secondary, tertiary) and a disabled state.
 */
export function Button({
  children,
  onClick,
  type = 'button',
  href,
  disabled = false,
  external = false,
  className,
  appearance = 'primary',
  style,
}: ButtonProps): React.JSX.Element {
  const classList = [styles.button];
  if (appearance && styles[appearance]) {
    classList.push(styles[appearance]);
  }
  if (disabled && styles.disabled) {
    classList.push(styles.disabled);
  }
  if (className) {
    classList.push(className);
  }
  const buttonClasses = classList.filter(Boolean).join(' ');

  const handleInteraction = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (disabled) {
      event.preventDefault();
      // The user's onClick callback is still called, allowing them to potentially
      // show a message or perform an action even if the button is disabled.
      // If the onClick should NOT fire when disabled, uncomment the following:
      // return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  if (href) {
    // Render as a Link component if href is provided
    // The 'type' prop is not applicable to anchor tags.
    // The 'disabled' state is primarily visual (via className) and behavioral (via onClick wrapper).
    // The Link component internally handles navigation logic.
    const linkProps: React.ComponentProps<typeof Link> & { 'aria-disabled'?: boolean; tabIndex?: number } = {
        href,
        external,
        className: buttonClasses,
        style,
        children,
        onClick: handleInteraction,
      };

      if (disabled) {
        linkProps['aria-disabled'] = true;
        linkProps.tabIndex = -1;
      }

    return (
      <Link {...linkProps}>
        {children}
      </Link>
    );
  }

  // Render as a native HTML button element
  return (
    <button
      type={type}
      className={buttonClasses}
      style={style}
      onClick={handleInteraction}
      disabled={disabled}
    >
      {children}
    </button>
  );
}