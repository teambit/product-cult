import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { useGetLaunch, useUpdateLaunch } from '@infinity/launches.hooks.use-launches';
import type { UpdateLaunchVariables, GetLaunchData } from '@infinity/launches.hooks.use-launches';

import styles from './edit-launch.module.scss';

// Define Launch type based on GetLaunchData, as Launch itself is not directly exported
type Launch = NonNullable<GetLaunchData['getLaunch']>;

/**
 * Props for the EditLaunchPageContent component.
 * @param launchId The ID of the launch to edit.
 */
type EditLaunchPageContentProps = {
  launchId: string;
};

const EditLaunchPageContentInternal: React.FC<EditLaunchPageContentProps> = ({ launchId }) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [launchDate, setLaunchDate] = useState(''); // Stores date as YYYY-MM-DD
  const [currentLaunchName, setCurrentLaunchName] = useState<string | undefined>(undefined);

  const { data: launchData, loading: getLaunchLoading, error: getLaunchError } = useGetLaunch(
    { id: launchId }
  );

  const [updateLaunchMutation, { loading: updateLaunchLoading, error: updateLaunchError }] = useUpdateLaunch();

  useEffect(() => {
    if (launchData?.getLaunch) {
      const fetchedLaunch: Launch = launchData.getLaunch;
      setName(fetchedLaunch.name || '');
      setTagline(fetchedLaunch.tagline || '');
      setDescription(fetchedLaunch.description || '');
      setCurrentLaunchName(fetchedLaunch.name);
      if (fetchedLaunch.launchDate) {
        try {
          // Ensure launchDate is a valid date string before parsing
          const dateObj = new Date(fetchedLaunch.launchDate);
          // Check if dateObj is valid
          if (!Number.isNaN(dateObj.getTime())) {
            setLaunchDate(dateObj.toISOString().split('T')[0]);
          } else {
            setLaunchDate(''); // Invalid date from backend
          }
        } catch (e) {
          setLaunchDate(''); // Error during date parsing
        }
      } else {
        setLaunchDate('');
      }
    }
  }, [launchData]);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const variables: UpdateLaunchVariables = {
      id: launchId,
      name,
      tagline,
      description,
      launchDate, // Send as YYYY-MM-DD string
    };

    try {
      const result = await updateLaunchMutation({ variables });
      if (result.data?.updateLaunch?.id) {
        navigate(`/launches/${result.data.updateLaunch.id}`);
      } else if (result.errors) {
        // Handle GraphQL errors explicitly if not caught by updateLaunchError state
        console.error('GraphQL errors on update:', result.errors);
      }
    } catch (err) {
      // Network or other errors, usually also reflected in updateLaunchError
      console.error('Failed to update launch:', err);
    }
  }, [launchId, name, tagline, description, launchDate, updateLaunchMutation, navigate]);

  if (getLaunchLoading) {
    return <div className={styles.loading}>Loading launch details...</div>;
  }

  if (getLaunchError) {
    return <div className={styles.error}>Error loading launch: {getLaunchError}</div>;
  }

  if (!launchData?.getLaunch) {
    return <div className={styles.error}>Launch not found.</div>;
  }

  return (
    <div className={styles.editLaunchPageContent}>
      <h1 className={styles.pageTitle}>
        Edit Launch: {currentLaunchName || 'Details'}
      </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="launch-name" className={styles.label}>Name</label>
          <TextInput
            id="launch-name"
            value={name}
            onChange={setName}
            placeholder="Enter launch name"
            name="name"
            className={styles.textInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="launch-tagline" className={styles.label}>Tagline</label>
          <TextInput
            id="launch-tagline"
            value={tagline}
            onChange={setTagline}
            placeholder="Enter launch tagline"
            name="tagline"
            className={styles.textInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="launch-description" className={styles.label}>Description</label>
          <TextInput
            id="launch-description"
            value={description}
            onChange={setDescription}
            placeholder="Enter launch description"
            name="description"
            className={styles.textInput}
            // Note: TextInput does not explicitly support multiline. It will be a single line input.
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="launch-date" className={styles.label}>Launch Date</label>
          <TextInput
            id="launch-date"
            type="date"
            value={launchDate}
            onChange={setLaunchDate}
            name="launchDate"
            className={styles.textInput}
          />
        </div>

        <Button type="submit" appearance="primary" disabled={updateLaunchLoading} className={styles.submitButton}>
          {updateLaunchLoading ? 'Updating...' : 'Update Launch'}
        </Button>
        
        {updateLaunchError && (
          <div className={classNames(styles.error, styles.formError)}>
            Failed to update launch: {updateLaunchError.message}
          </div>
        )}
      </form>
    </div>
  );
};

/**
 * Props for the EditLaunch component.
 * @param className Optional CSS class name for custom styling.
 */
export type EditLaunchProps = {
  className?: string;
  // style prop was removed as PageLayout does not accept it
};

/**
 * EditLaunch is an admin page for editing an existing product launch.
 * It fetches launch data using the launchId from the URL, populates a form,
 * and allows updating the launch details.
 */
export const EditLaunch: React.FC<EditLaunchProps> = ({ className }) => {
  const { launchId } = useParams<{ launchId: string }>();

  // Determine page title dynamically based on launch data if possible, or use a generic one.
  // For simplicity and to avoid fetching data twice (once for title, once for content),
  // we'll use a generic title here and let the content render a dynamic H1.
  const pageLayoutTitle = 'Edit Product Launch';
  const metaDescription = 'Manage and update the details of an existing product launch.';
  
  return (
    <PageLayout title={pageLayoutTitle} metaDescription={metaDescription} className={className}>
      <ProtectedRoute redirectTo="/login"> {/* Configure your login path */}
        {launchId ? (
          <EditLaunchPageContentInternal launchId={launchId} />
        ) : (
          <div className={styles.error}>Launch ID is missing in URL. Cannot edit launch.</div>
        )}
      </ProtectedRoute>
    </PageLayout>
  );
};
