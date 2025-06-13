import React from 'react';
import classNames from 'classnames';
import { Avatar } from '@infinity/design.content.avatar';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { useGetUserProfile } from '@infinity/people.hooks.use-user-profile';
import type { Review } from '@infinity/reviews.entities.review';
import type { UserProfile } from '@infinity/people.entities.user-profile';
import styles from './review-card.module.scss';

/**
 * Props for the ReviewCard component.
 */
export type ReviewCardProps = {
  /**
   * The review data to display.
   * This object contains all information about the review, including the reviewer's ID,
   * the rating, comment, and creation date.
   */
  review: Review;
  /**
   * Optional CSS class name to apply to the root element of the component.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * ReviewCard displays a single product review, including author information,
 * rating, and the review comment. It fetches author details dynamically using the userId from the review.
 * The card presents a visually appealing summary of a user's feedback.
 */
export function ReviewCard({ review, className, style }: ReviewCardProps): React.JSX.Element {
  const {
    userProfile,
    loading: userLoading,
    error: userError,
  }: {
    userProfile?: UserProfile;
    loading: boolean;
    error?: Error; // Assuming ApolloError or similar, but Error is a safe base
  } = useGetUserProfile({
    variables: { userId: review.userId },
    skip: !review.userId, // Skip query if userId is not available
  });

  const formattedDate = new Date(review.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Ensure rating is between 0 and 5 for star display
  const roundedRating = Math.max(0, Math.min(5, Math.round(review.rating)));
  const stars = '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);

  const getInitials = (name?: string): string | undefined => {
    if (!name) return undefined;
    const parts = name.split(' ');
    if (parts.length === 1 && parts[0]) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return parts
      .map((part) => (part ? part[0] : ''))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const authorName = userError || !userProfile ? 'Anonymous' : userProfile.name;
  const avatarSrc = userProfile?.imageUrl;
  const avatarAlt = userProfile?.name || 'Author';
  const avatarInitials = getInitials(userProfile?.name);

  return (
    <div className={classNames(styles.reviewCard, className)} style={style}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          {userLoading ? (
            <div className={styles.avatarPlaceholder} />
          ) : (
            <Avatar
              src={avatarSrc}
              alt={avatarAlt}
              initials={avatarInitials}
              size="medium"
            />
          )}
          <div className={styles.authorDetails}>
            {userLoading ? (
              <Paragraph className={styles.loadingText}>Loading author...</Paragraph>
            ) : (
              <Heading level={5} className={styles.authorName}>
                {authorName}
              </Heading>
            )}
            <Paragraph className={styles.reviewDate}>{formattedDate}</Paragraph>
          </div>
        </div>
        <div className={styles.rating}>{stars}</div>
      </div>
      <Paragraph className={styles.comment}>{review.comment}</Paragraph>
    </div>
  );
}