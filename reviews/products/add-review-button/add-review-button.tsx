import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button, type ButtonAppearance } from '@infinity/design.actions.button';
import styles from './add-review-button.module.scss';

/**
 * Props for the AddReviewButton component.
 */
export type AddReviewButtonProps = {
  /**
   * The unique identifier of the product for which the review is being added.
   * This is used to navigate to the correct review submission page.
   */
  productId: string;
  /**
   * Optional text to display on the button.
   * @default 'Add Your Review'
   */
  buttonText?: string;
  /**
   * Visual appearance of the button.
   * @default 'primary'
   */
  buttonAppearance?: ButtonAppearance;
  /**
   * An optional CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the component's root element.
   */
  style?: React.CSSProperties;
};

const DEFAULT_BUTTON_TEXT = 'Add Your Review';
const DEFAULT_BUTTON_APPEARANCE: ButtonAppearance = 'primary';

/**
 * A component that displays a button to add a review for a specific product.
 * On click, it navigates the user to the review submission page for that product.
 */
export function AddReviewButton({
  productId,
  buttonText = DEFAULT_BUTTON_TEXT,
  buttonAppearance = DEFAULT_BUTTON_APPEARANCE,
  className,
  style,
}: AddReviewButtonProps): React.JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    if (productId) {
      navigate(`/products/${productId}/reviews`);
    } else {
      // Fallback or error handling if productId is not provided, though it's a required prop.
      // For robust applications, consider logging this or displaying a user-friendly message.
      // eslint-disable-next-line no-console
      console.error('AddReviewButton: productId is missing, cannot navigate.');
    }
  };

  return (
    <div
      className={classNames(styles.addReviewButtonContainer, className)}
      style={style}
    >
      <Button
        appearance={buttonAppearance}
        onClick={handleClick}
        disabled={!productId} // Disable button if productId is somehow missing
      >
        {buttonText}
      </Button>
    </div>
  );
}