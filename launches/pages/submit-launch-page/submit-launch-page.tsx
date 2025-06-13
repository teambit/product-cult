import React, { useState } from 'react';
import { PageLayout, PageLayoutProps } from '@infinity/design.layouts.page-layout';
import { TextInput, TextInputProps } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { useCreateLaunch, type CreateLaunchVariables } from '@infinity/launches.hooks.use-launches';
import classNames from 'classnames';
import styles from './submit-launch-page.module.scss';

/**
 * Props for the SubmitLaunchPage component.
 */
export type SubmitLaunchPageProps = {
  /**
   * Optional CSS class name to apply to the root PageLayout element.
   */
  className?: string;
  // Removed style prop as PageLayout does not support it directly
  // style?: React.CSSProperties; 
};

const ROCKET_IMAGE_URL = `https://images.unsplash.com/photo-1700508317396-e343a69ac72f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0&q=80&w=1200`;

/**
 * SubmitLaunchPage is a dedicated page for users to submit new product launches.
 * It includes a form for launch details and utilizes the useCreateLaunch hook to persist the data.
 */
export function SubmitLaunchPage({ className }: SubmitLaunchPageProps): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [tagline, setTagline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [launchDate, setLaunchDate] = useState<string>('');

  const [createLaunch, { data: createData, loading: createLoading, error: createError }] = useCreateLaunch();
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmissionMessage(null); // Reset message on new submission attempt

    if (!name || !tagline || !description || !productId || !launchDate) {
      setSubmissionMessage('Error: Please fill in all required fields.');
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
      if (result.data?.createLaunch) {
        setSubmissionMessage(`🚀 Success! '${result.data.createLaunch.name}' has been submitted.`);
        // Clear form
        setName('');
        setTagline('');
        setDescription('');
        setProductId('');
        setLaunchDate('');
      } else if (result.errors) {
        // Handle GraphQL errors returned in the mutation response
        const gqlError = result.errors[0]?.message || 'An unknown error occurred during submission.';
        setSubmissionMessage(`Error: ${gqlError}`);
      } else {
        // Fallback for other non-successful scenarios without specific errors
         setSubmissionMessage('Error: Failed to submit launch. Please try again.');
      }
    } catch (e:unknown) {
      // Catch network errors or other exceptions from the createLaunch call
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setSubmissionMessage(`Error: ${errorMessage}`);
    }
  };

  return (
    <PageLayout
      title="Submit Your Launch | Infinity"
      metaDescription="Provide details for your new product launch to share it with the Infinity community."
      className={classNames(styles.submitLaunchPage, className)}
      // style prop removed as it's not supported by PageLayout
    >
      <div className={styles.pageHeaderImageContainer}>
         <img
            src={ROCKET_IMAGE_URL}
            alt="A rocket soaring upwards, symbolizing a new launch"
            className={styles.headerImage}
          />
      </div>
      <div className={styles.formContainer}>
        <h1 className={styles.pageTitle}>Ignite Your Launch!</h1>
        <p className={styles.pageSubtitle}>
          Share your groundbreaking product with the world. Fill in the details below to get started.
        </p>
        <form onSubmit={handleSubmit} className={styles.launchForm}>
          <div className={styles.formField}>
            <label htmlFor="launch-name" className={styles.label}>Launch Name</label>
            <TextInput
              id="launch-name"
              placeholder="e.g., QuantumLeap AI v1.0"
              value={name}
              onChange={setName}
              name="name"
              // required prop removed
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="launch-tagline" className={styles.label}>Tagline</label>
            <TextInput
              id="launch-tagline"
              placeholder="Your launch&apos;s catchy one-liner"
              value={tagline}
              onChange={setTagline}
              name="tagline"
              // required prop removed
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="launch-description" className={styles.label}>Description</label>
            <TextInput
              id="launch-description"
              placeholder="Describe your launch in detail (features, benefits, etc.)"
              value={description}
              onChange={setDescription}
              name="description"
              className={styles.descriptionInput} // Styled for more height
              // required prop removed
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="product-id" className={styles.label}>Product ID</label>
            <TextInput
              id="product-id"
              placeholder="The unique ID of the associated product"
              value={productId}
              onChange={setProductId}
              name="productId"
              // required prop removed
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="launch-date" className={styles.label}>Target Launch Date</label>
            <TextInput
              id="launch-date"
              type="date"
              value={launchDate}
              onChange={setLaunchDate}
              name="launchDate"
              // required prop removed
            />
          </div>

          {submissionMessage && (
            <div className={classNames(styles.submissionMessage, { [styles.successMessage]: submissionMessage.startsWith('🚀 Success!'), [styles.errorMessage]: submissionMessage.startsWith('Error:') })}>
              {submissionMessage}
            </div>
          )}
          {/* Display Apollo hook error separately if not already captured by submissionMessage logic */}
          {createError && !submissionMessage?.includes(createError.message) && (
             <div className={classNames(styles.submissionMessage, styles.errorMessage)}>
               Error: {createError.message}
             </div>
          )}


          <Button type="submit" appearance="primary" disabled={createLoading} className={styles.submitButton}>
            {createLoading ? 'Submitting...' : 'Submit Launch'}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}