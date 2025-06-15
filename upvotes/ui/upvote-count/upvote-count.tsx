import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Paragraph } from '@infinity/design.typography.paragraph';
import classNames from 'classnames';
import styles from './upvote-count.module.scss';

// GraphQL query to fetch the upvote count
// Corresponds to the schema: getUpvoteCount(options: GetUpvoteCountOptionsInput!): Int!
const GET_UPVOTE_COUNT = gql`
  query GetUpvoteCount($options: GetUpvoteCountOptionsInput!) {
    getUpvoteCount(options: $options)
  }
`;

/**
 * Props for the UpvoteCount component.
 */
export type UpvoteCountProps = {
  /**
   * The unique identifier of the item for which to display the upvote count.
   */
  itemId: string;
  /**
   * The type of the item (e.g., "product", "launch").
   */
  itemType: string;
  /**
   * Optional class name to apply to the Paragraph component that renders the count.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the Paragraph component.
   */
  style?: React.CSSProperties;
  /**
   * Optional prefix text to display before the count.
   * @default ''
   */
  prefix?: string;
  /**
   * Optional suffix text to display after the count.
   * @default ''
   */
  suffix?: string;
  /**
   * The HTML element type to render the count as, via the Paragraph component.
   * This allows semantic flexibility (e.g., 'p' for block, 'span' for inline).
   * Defaults to 'span' for inline display suitable for counts.
   * @default 'span'
   */
  element?: keyof React.JSX.IntrinsicElements;
};

// Define expected data and variable types for the useQuery hook
type GetUpvoteCountData = {
  getUpvoteCount: number;
};

type GetUpvoteCountVars = {
  options: {
    itemId: string;
    itemType: string;
  };
};

/**
 * UpvoteCount is a UI component that displays the numerical count of upvotes for a given item.
 * It fetches the count using GraphQL and renders it using the Paragraph component for consistent styling.
 */
export function UpvoteCount({
  itemId,
  itemType,
  className,
  style,
  prefix = '',
  suffix = '',
  element = 'span',
}: UpvoteCountProps): React.JSX.Element {
  const { data, loading, error } = useQuery<GetUpvoteCountData, GetUpvoteCountVars>(
    GET_UPVOTE_COUNT,
    {
      variables: { options: { itemId, itemType } },
      skip: !itemId || !itemType, // Skip query if essential props are missing
    }
  );

  if (loading) {
    return (
      <Paragraph
        element={element}
        className={classNames(styles.upvoteCount, styles.loadingState, className)}
        style={style}
        aria-live="polite" 
        aria-busy="true"
      >
        {prefix}…{suffix} {/* Using ellipsis for loading */}
      </Paragraph>
    );
  }

  if (error) {
    // Log error for debugging, display a placeholder
    console.error(`Failed to fetch upvote count for item ${itemId} (type: ${itemType}): ${error.message}`);
    return (
      <Paragraph
        element={element}
        className={classNames(styles.upvoteCount, styles.errorState, className)}
        style={style}
        aria-live="polite"
      >
        {prefix}—{suffix} {/* Using em-dash for error */}
      </Paragraph>
    );
  }

  // If query was skipped, or if data is unexpectedly absent post-loading without error
  // (though `Int!` in schema makes `data.getUpvoteCount` non-nullable on success)
  // Default to 0 if data is undefined (e.g. when query is skipped).
  const count = data?.getUpvoteCount ?? 0;

  return (
    <Paragraph
      element={element}
      className={classNames(styles.upvoteCount, className)}
      style={style}
      aria-live="polite" 
    >
      {prefix}{count}{suffix}
    </Paragraph>
  );
}