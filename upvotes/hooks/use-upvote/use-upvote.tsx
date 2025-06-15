import { useState, useEffect, useCallback } from 'react';
import { ApolloError, type ApolloQueryResult } from '@apollo/client';
import { useGetUpvoteCount } from './use-get-upvote-count.js';
import type { GetUpvoteCountOptionsType } from './get-upvote-count-options-type.js';
import { useGetUserUpvoteStatus } from './use-get-user-upvote-status.js';
import type { GetUserUpvoteStatusOptionsType } from './get-user-upvote-status-options-type.js';
import { useCreateUpvote } from './use-create-upvote.js';
import { useDeleteUpvote } from './use-delete-upvote.js';

/**
 * Options for the useUpvote hook.
 */
export type UseUpvoteOptions = {
  /**
   * Identifier of the item for which upvote functionality is managed.
   */
  itemId: string;
  /**
   * Type of the item (e.g., "product", "launch").
   */
  itemType: string;
  /**
   * Optional initial upvote count. Useful for SSR or optimistic UI before first fetch.
   */
  initialCount?: number;
  /**
   * Optional initial upvoted status for the user. Useful for SSR or optimistic UI.
   */
  initialHasUpvoted?: boolean;
};

/**
 * Result returned by the useUpvote hook.
 * Provides state and actions related to upvoting an item.
 */
export type UseUpvoteResult = {
  /**
   * Current upvote count for the item. This value can be optimistically updated.
   * It will be undefined if not yet loaded and no initial count was provided.
   */
  count?: number;
  /**
   * Current upvoted status for the user regarding the item. This can be optimistically updated.
   * It will be undefined if not yet loaded and no initial status was provided.
   */
  hasUpvoted?: boolean;
  /**
   * Function to execute an upvote action for the item.
   * Manages optimistic updates and refetches data.
   */
  upvote: () => Promise<void>;
  /**
   * Function to execute a downvote (remove upvote) action for the item.
   * Manages optimistic updates and refetches data.
   */
  downvote: () => Promise<void>;
  /**
   * True if the upvote count is currently being fetched.
   */
  loadingCount: boolean;
  /**
   * True if the user's upvote status is currently being fetched.
   */
  loadingStatus: boolean;
  /**
   * True if an upvote or downvote mutation is in progress.
   */
  loadingAction: boolean;
  /**
   * Error object if fetching the upvote count failed.
   */
  errorCount?: ApolloError;
  /**
   * Error object if fetching the user's upvote status failed.
   */
  errorStatus?: ApolloError;
  /**
   * Error object if the last upvote or downvote action failed.
   */
  errorAction?: ApolloError;
  /**
   * Function to manually refetch the upvote count.
   */
  refetchCount: () => Promise<ApolloQueryResult<{ getUpvoteCount: number }>>;
  /**
   * Function to manually refetch the user's upvote status.
   */
  refetchStatus: () => Promise<ApolloQueryResult<{ getUserUpvoteStatus: boolean }>>;
};

/**
 * React hook to manage upvoting functionality for a specific item.
 * It fetches and displays the item's upvote count and the current user's upvote status.
 * Provides functions to upvote or downvote the item, with optimistic UI updates
 * and data refetching to ensure consistency.
 *
 * @param options - Configuration options for the hook, including `itemId`, `itemType`,
 * and optional `initialCount` and `initialHasUpvoted` for seeding state.
 * @returns An object containing the upvote state (count, hasUpvoted),
 * action handlers (upvote, downvote), loading indicators, error states, and refetch functions.
 */
export function useUpvote({
  itemId,
  itemType,
  initialCount,
  initialHasUpvoted,
}: UseUpvoteOptions): UseUpvoteResult {
  const [optimisticCount, setOptimisticCount] = useState<number | undefined>(initialCount);
  const [optimisticHasUpvoted, setOptimisticHasUpvoted] = useState<boolean | undefined>(initialHasUpvoted);
  const [actionError, setActionError] = useState<ApolloError | undefined>(undefined);

  const {
    count: fetchedCount,
    loading: loadingCount,
    error: errorCount,
    refetch: refetchCountQuery,
  } = useGetUpvoteCount(itemId, itemType);

  const {
    hasUpvoted: fetchedHasUpvoted,
    loading: loadingStatus,
    error: errorStatus,
    refetch: refetchStatusQuery,
  } = useGetUserUpvoteStatus(itemId, itemType);

  const [
    executeCreateUpvote,
    { loading: creatingUpvote, error: createError, reset: resetCreate },
  ] = useCreateUpvote();
  const [
    executeDeleteUpvote,
    { loading: deletingUpvote, error: deleteError, reset: resetDelete },
  ] = useDeleteUpvote();

  useEffect(() => {
    if (fetchedCount !== undefined) {
      setOptimisticCount(fetchedCount);
    }
  }, [fetchedCount]);

  useEffect(() => {
    if (fetchedHasUpvoted !== undefined) {
      setOptimisticHasUpvoted(fetchedHasUpvoted);
    }
  }, [fetchedHasUpvoted]);

  useEffect(() => {
    if (createError) {
      setActionError(createError);
    } else if (deleteError) {
      setActionError(deleteError);
    } else {
      setActionError(undefined);
    }
  }, [createError, deleteError]);

  const upvote = useCallback(async () => {
    if (creatingUpvote || deletingUpvote || optimisticHasUpvoted === true) return;

    resetCreate();
    resetDelete();
    setActionError(undefined);

    setOptimisticHasUpvoted(true);
    setOptimisticCount((prevCount) => (prevCount === undefined ? 1 : prevCount + 1));

    try {
      const { error: upvoteOpError } = await executeCreateUpvote({ itemId, itemType });
      if (upvoteOpError) {
        setActionError(upvoteOpError);
        // Revert optimistic update on error
        setOptimisticHasUpvoted(fetchedHasUpvoted); // Revert to last known server state
        setOptimisticCount(fetchedCount);         // Revert to last known server state
      }
    } catch (e) {
      const err = e instanceof ApolloError ? e : new ApolloError({ errorMessage: (e as Error).message });
      setActionError(err);
      setOptimisticHasUpvoted(fetchedHasUpvoted);
      setOptimisticCount(fetchedCount);
    } finally {
      // Refetch to ensure consistency
      refetchCountQuery();
      refetchStatusQuery();
    }
  }, [
    itemId, itemType, optimisticHasUpvoted, executeCreateUpvote, 
    creatingUpvote, deletingUpvote, refetchCountQuery, refetchStatusQuery,
    fetchedHasUpvoted, fetchedCount, resetCreate, resetDelete
  ]);

  const downvote = useCallback(async () => {
    if (creatingUpvote || deletingUpvote || optimisticHasUpvoted === false) return;
    
    resetCreate();
    resetDelete();
    setActionError(undefined);

    setOptimisticHasUpvoted(false);
    setOptimisticCount((prevCount) => (prevCount === undefined || prevCount <= 0 ? 0 : prevCount - 1));
    
    try {
      const { error: downvoteOpError } = await executeDeleteUpvote({ itemId, itemType });
      if (downvoteOpError) {
        setActionError(downvoteOpError);
        // Revert optimistic update
        setOptimisticHasUpvoted(fetchedHasUpvoted);
        setOptimisticCount(fetchedCount);
      }
    } catch (e) {
      const err = e instanceof ApolloError ? e : new ApolloError({ errorMessage: (e as Error).message });
      setActionError(err);
      setOptimisticHasUpvoted(fetchedHasUpvoted);
      setOptimisticCount(fetchedCount);
    } finally {
      refetchCountQuery();
      refetchStatusQuery();
    }
  }, [
    itemId, itemType, optimisticHasUpvoted, executeDeleteUpvote,
    creatingUpvote, deletingUpvote, refetchCountQuery, refetchStatusQuery,
    fetchedHasUpvoted, fetchedCount, resetCreate, resetDelete
  ]);
  
  const refetchCount = useCallback(() => {
      const options: GetUpvoteCountOptionsType = {itemId, itemType};
      return refetchCountQuery({options});
  }, [itemId, itemType, refetchCountQuery]);

  const refetchStatus = useCallback(() => {
      const options: GetUserUpvoteStatusOptionsType = {itemId, itemType};
      return refetchStatusQuery({options});
  }, [itemId, itemType, refetchStatusQuery]);

  return {
    count: optimisticCount,
    hasUpvoted: optimisticHasUpvoted,
    upvote,
    downvote,
    loadingCount,
    loadingStatus,
    loadingAction: creatingUpvote || deletingUpvote,
    errorCount,
    errorStatus,
    errorAction: actionError,
    refetchCount,
    refetchStatus,
  };
}