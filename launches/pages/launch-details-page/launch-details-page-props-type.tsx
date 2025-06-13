import type React from 'react';
import { LaunchDeploySection } from './launch-deploy-section.js';
import type { Launch } from '@infinity/launches.entities.launch';

/**
 * Defines the properties for the LaunchDetailsPage component.
 */
export type LaunchDetailsPageProps = {
  /**
   * Optional CSS class name for custom styling of the component's root element.
   * This allows for overriding or extending the default styles.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the component's root element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;

  /**
   * Optional mock Launch data to use instead of fetching.
   * If provided, the component will pass this data to the `useGetLaunch` hook,
   * which will then use this mock data and skip network requests.
   * This is primarily intended for testing, storybook compositions, or previews.
   * The `launchId` from the URL (via `useParams`) will still be used as the basis
   * for the query variables passed to the hook.
   */
  mockLaunchData?: Launch;

  /**
   * sections
   */
  sections?: LaunchDeploySection;
};
