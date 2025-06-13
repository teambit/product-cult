import React, { useState } from 'react';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';
import { useCreateLaunch, type CreateLaunchVariables } from '@infinity/launches.hooks.use-launches';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './create-launch.module.scss';

/**
 * Props for the CreateLaunchPage component.
 */
export interface CreateLaunchPageProps {
  /**
   * Optional CSS class name to apply to the root element of the page.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the page.
   */
  style?: React.CSSProperties;
}

/**
 * CreateLaunchPage is an admin page for creating a new product launch.
 * It includes a form with fields for launch name, tagline, description, product ID, and launch date.
 * It utilizes the useCreateLaunch hook to submit the launch data.
 */
export function CreateLaunchPage({ className, style }: CreateLaunchPageProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [productId, setProductId] = useState('');
  const [launchDate, setLaunchDate] = useState('');

  const navigate = useNavigate();

  const [
    createLaunch,
    { data: createData, loading: createLoading, error: createError },
  ] = useCreateLaunch();

  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionMessage(null);
    setIsSuccess(null);

    // Basic validation for required fields
    if (!name || !tagline || !description || !productId || !launchDate) {
        setIsSuccess(false);
        setSubmissionMessage('All fields are required. Please fill them out.');
        return;
    }

    const variables: CreateLaunchVariables = {
      name,
      tagline,
      description,
      productId,
      launchDate,
    };

    try {
      const result = await createLaunch({ variables });
      if (result.data?.createLaunch?.id) {
        setIsSuccess(true);
        setSubmissionMessage(
          `Launch '${result.data.createLaunch.name}' created successfully! Redirecting...`
        );
        setName('');
        setTagline('');
        setDescription('');
        setProductId('');
        setLaunchDate('');
        // Navigate to the newly created launch page or a list page after a short delay
        setTimeout(() => {
          navigate(`/launches/${result.data.createLaunch!.id}`);
        }, 2000);
      } else if (result.errors || !result.data?.createLaunch?.id) {
        // Handle GraphQL errors returned in the result that don't throw
        setIsSuccess(false);
        setSubmissionMessage(result.errors?.[0].message || 'Failed to create launch. Please check the details and try again.');
      }
    } catch (err) {
      // This catches network errors or errors thrown by the mutation function itself
      setIsSuccess(false);
      setSubmissionMessage( (err instanceof Error ? err.message : String(err)) || 'An unexpected error occurred. Please try again.');
      console.error('Failed to create launch:', err);
    }
  };

  return (
    <ProtectedRoute redirectTo="/login">
      <PageLayout
        title="Create New Launch"
        metaDescription="Submit a new product launch to the platform."
      >
        <div
          className={classNames(styles.createLaunchPage, className)}
          style={style}
        >
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>Create New Launch</h1>
            <p className={styles.pageSubtitle}>
              Fill in the details below to schedule a new product launch.
            </p>
          </header>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formField}>
              <label htmlFor="launch-name" className={styles.label}>
                Launch Name
              </label>
              <TextInput
                id="launch-name"
                value={name}
                onChange={setName}
                placeholder="e.g., My Awesome Product v2.0"
                name="name"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="launch-tagline" className={styles.label}>
                Tagline
              </label>
              <TextInput
                id="launch-tagline"
                value={tagline}
                onChange={setTagline}
                placeholder="A catchy phrase for your launch"
                name="tagline"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="launch-description" className={styles.label}>
                Description
              </label>
              <TextInput
                id="launch-description"
                value={description}
                onChange={setDescription}
                placeholder="Detailed description of the product launch..."
                name="description"
                className={styles.descriptionInput} 
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="product-id" className={styles.label}>
                Product ID
              </label>
              <TextInput
                id="product-id"
                value={productId}
                onChange={setProductId}
                placeholder="The ID of the associated product"
                name="productId"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="launch-date" className={styles.label}>
                Launch Date
              </label>
              <TextInput
                id="launch-date"
                type="date"
                value={launchDate}
                onChange={setLaunchDate}
                name="launchDate"
              />
            </div>

            {submissionMessage && (
              <p className={classNames(styles.submissionMessage, isSuccess ? styles.successMessage : styles.errorMessage)}>
                {submissionMessage}
              </p>
            )}
             {createError && !submissionMessage && (
              <p className={classNames(styles.errorMessage, styles.submissionMessage)}>
                Error: {createError.message}
              </p>
            )}


            <Button
              type="submit"
              appearance="primary"
              disabled={createLoading}
              className={styles.submitButton}
            >
              {createLoading ? 'Creating Launch...' : 'Create Launch'}
            </Button>
          </form>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}