import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { TextInput, TextInputProps } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { useGetReview, useUpdateReview } from '@infinity/reviews.hooks.use-reviews';

import styles from './edit-review-page.module.scss';

// Placeholder for Review type as it's not clearly exported or defined in the provided API for @infinity/reviews.hooks.use-reviews
type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string; // Optional based on usage in sample data
  updatedAt?: string; // Optional based on usage in sample data
};

/**
 * Props for the EditReviewPage component.
 */
export type EditReviewPageProps = {
  // This page component primarily derives its necessary data (reviewId) from URL parameters.
  // No specific props are required for its core functionality.
};

/**
 * EditReviewPage provides an interface for users to modify their existing reviews.
 * It fetches the current review data using the reviewId from the URL,
 * presents this data in an editable form, and submits changes using the useUpdateReview hook.
 * The page handles loading states, errors during data fetching or submission, and navigates
 * upon successful update.
 */
export function EditReviewPage(): React.JSX.Element {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();

  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch the existing review data
  // Assuming UseGetReviewResult is { review?: Review, loading: boolean, error: any, refetch: () => void }
  const { review: reviewToEdit, loading: getReviewLoading, error: getReviewError } = useGetReview({
    options: { id: reviewId! }, // reviewId is asserted; check below ensures it's present
  });

  // Hook for updating the review
  // Assuming the 'data' from useUpdateReview's result state directly contains the updated Review object or null
  const [
    updateReviewMutation,
    { data: updatedReview, loading: updateReviewLoading, error: updateReviewError },
  ] = useUpdateReview();

  // Populate form fields when review data is loaded
  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating.toString());
      setComment(reviewToEdit.comment);
    }
  }, [reviewToEdit]);

  // Handle navigation after successful update
  useEffect(() => {
    if (updatedReview) { // Check if an updated review object is available
      // Navigate to the product's reviews page or a general reviews page as fallback
      if (reviewToEdit?.productId) {
        navigate(`/products/${reviewToEdit.productId}/reviews`);
      } else {
        // Fallback if original product ID isn't available for some reason
        navigate('/reviews');
      }
    }
  }, [updatedReview, navigate, reviewToEdit]);

  /**
   * Handles changes to the rating input field.
   * @param event - The input change event.
   */
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value); // Actual validation and clamping on submit
  };

  /**
   * Handles form submission to update the review.
   * Validates input fields before calling the update mutation.
   * @param event - The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!reviewId) {
      // This case should ideally be caught earlier, but defensive check.
      setFormError('Critical error: Review ID is missing.');
      return;
    }

    const numericRating = parseFloat(rating);
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      setFormError('Rating must be a valid number between 1 and 5 (e.g., 3 or 4.5).');
      return;
    }

    if (!comment.trim()) {
      setFormError('Comment cannot be empty. Please share your thoughts.');
      return;
    }

    try {
      await updateReviewMutation({
        id: reviewId,
        rating: numericRating,
        comment: comment.trim(),
      });
      // Successful update will trigger navigation via useEffect
    } catch (err) {
      // This catch is for unexpected errors during the mutation call itself (e.g. network issues).
      // GraphQL errors are typically handled by `updateReviewError` from the hook.
      console.error('Failed to invoke update review mutation:', err);
      if (!updateReviewError) { // If hook hasn't already set an error
        setFormError('An unexpected error occurred while saving. Please try again.');
      }
    }
  };

  // Early exit if reviewId is not available from URL params
  if (!reviewId) {
    return (
      <PageLayout title="Error - Invalid Request">
        <div className={classNames(styles.editReviewPageContainer, styles.centeredContent, styles.errorState)}>
          <h1 className={styles.pageTitle}>Invalid Request</h1>
          <p className={styles.errorMessage}>No review ID was found in the URL. Please ensure you are using a valid link.</p>
          <Button appearance="primary" onClick={() => navigate('/')}>Go to Homepage</Button>
        </div>
      </PageLayout>
    );
  }

  // Loading state while fetching review
  if (getReviewLoading) {
    return (
      <PageLayout title="Loading Review...">
        <div className={classNames(styles.editReviewPageContainer, styles.centeredContent)}>
          <p className={styles.loadingMessage}>Loading your review for editing...</p>
        </div>
      </PageLayout>
    );
  }

  // Error state if review fetching failed
  if (getReviewError) {
    return (
      <PageLayout title="Error Loading Review">
        <div className={classNames(styles.editReviewPageContainer, styles.centeredContent, styles.errorState)}>
          <h1 className={styles.pageTitle}>Oops! Something Went Wrong</h1>
          <p className={styles.errorMessage}>
            We couldn&apos;t load the review details. Error: {(getReviewError as Error).message || 'An unknown error occurred.'}
          </p>
          <Button appearance="secondary" onClick={() => navigate(-1)}>Try Going Back</Button>
        </div>
      </PageLayout>
    );
  }

  // State if review data is fetched but review object is missing (e.g., review not found)
  if (!reviewToEdit) {
    return (
      <PageLayout title="Review Not Found">
        <div className={classNames(styles.editReviewPageContainer, styles.centeredContent, styles.errorState)}>
          <h1 className={styles.pageTitle}>Review Not Found</h1>
          <p className={styles.errorMessage}>
            Sorry, we couldn&apos;t find the review you&apos;re looking for. It might have been deleted or the link is incorrect.
          </p>
           <Button appearance="secondary" onClick={() => navigate(-1)}>Try Going Back</Button>
        </div>
      </PageLayout>
    );
  }
  
  const pageDisplayTitle = `Edit Your Review`;

  // Explicitly cast setComment to the type expected by TextInput's onChange if necessary,
  // or ensure TextInputProps's onChange is compatible.
  // TextInputProps defines onChange as (value: string) => void. useState's setComment is Dispatch<SetStateAction<string>>.
  // These are compatible.
  const textInputOnChange: (value: string) => void = setComment;


  return (
    <PageLayout title={pageDisplayTitle} metaDescription="Modify your review for a product on our platform.">
      <div className={styles.editReviewPageContainer}>
        <h1 className={styles.pageTitle}>{pageDisplayTitle}</h1>
        
        <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>Your Rating (1-5, e.g., 4.5):</label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={handleRatingChange}
              min="1"
              max="5"
              step="0.1" 
              className={styles.inputField}
              required
              aria-describedby={formError && (Number.isNaN(parseFloat(rating)) || parseFloat(rating) < 1 || parseFloat(rating) > 5) ? 'form-error-feedback' : undefined}
              disabled={updateReviewLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment" className={styles.label}>Your Comment:</label>
            <TextInput
              id="comment"
              value={comment}
              onChange={textInputOnChange}
              placeholder="Share more about your experience..."
              name="comment"
              className={styles.textInputOverride}
              // disabled prop removed as it's not in TextInputProps
              aria-describedby={formError && comment.trim() === '' ? 'form-error-feedback' : undefined}
            />
          </div>
          
          {(formError || updateReviewError) && (
            <div id="form-error-feedback" className={styles.errorFeedbackContainer}>
              {formError && <p className={styles.errorMessageItem}>{formError}</p>}
              {updateReviewError && (
                <p className={styles.errorMessageItem}>
                  Failed to save changes: {(updateReviewError as Error).message || 'Please try again.'}
                </p>
              )}
            </div>
          )}

          <div className={styles.actionsContainer}>
            <Button 
              type="submit" 
              appearance="primary" 
              disabled={updateReviewLoading || getReviewLoading}
            >
              {updateReviewLoading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
            <Button 
              type="button" 
              appearance="tertiary" 
              onClick={() => {
                if (reviewToEdit?.productId) {
                  navigate(`/products/${reviewToEdit.productId}/reviews`);
                } else {
                  navigate(-1); // Navigate back if productId is not available
                }
              }}
              disabled={updateReviewLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
