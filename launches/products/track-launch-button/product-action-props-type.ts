import type { LaunchType } from './launch-type.js';

/**
 * Defines the properties expected by a component when used as a "ProductAction".
 * This type is specifically tailored for actions related to a product's launch,
 * such as tracking the launch.
 */
export type ProductActionProps = {
  /**
   * The launch object associated with the product. This object contains all
   * necessary details about the launch, including its ID, which is crucial
   * for the tracking functionality.
   */
  launch: LaunchType;

  /**
   * The unique identifier of the current user performing the action.
   * This ID is essential for associating the tracking status with the correct user account.
   */
  userId: string;

  /**
   * An optional CSS class name to apply to the root element of the ProductAction component.
   * This allows for custom styling and layout adjustments within the context where the action is displayed.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the ProductAction component.
   * It is generally recommended to use `className` for styling to maintain separation of concerns.
   */
  style?: React.CSSProperties;
};