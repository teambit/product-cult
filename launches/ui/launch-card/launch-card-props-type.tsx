import type React from 'react';
import type { Launch } from '@infinity/launches.entities.launch';

/**
 * Props for the LaunchCard component.
 * Defines the properties accepted by LaunchCard to customize its appearance and content.
 */
export type LaunchCardProps = {
  /**
   * The launch data object containing all information about the launch.
   * This includes name, tagline, description, launch date, and ID.
   */
  launch: Launch;

  /**
   * Optional URL for the image to be displayed on the card.
   * If not provided, a default placeholder image will be used.
   */
  imageUrl?: string;

  /**
   * Optional alternative text for the launch image.
   * This is crucial for accessibility. If not provided, it defaults to the launch name or a generic description.
   */
  imageAlt?: string;

  /**
   * Optional text for the call-to-action link/button that navigates to the launch details page.
   * @default "View Launch Details"
   */
  viewLaunchText?: string;

  /**
   * Optional custom CSS class name to apply to the card's root element.
   * This allows for further styling and customization via external CSS.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the card's root element.
   * While available, it's generally recommended to use `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};