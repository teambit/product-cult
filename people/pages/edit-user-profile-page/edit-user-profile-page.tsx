import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { useGetUserProfile, useUpdateUserProfile, UpdateUserProfileOptionsInput } from '@infinity/people.hooks.use-user-profile';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import styles from './edit-user-profile-page.module.scss';

/**
 * Props for the EditUserProfilePage component.
 * This component currently does not accept external props as user information
 * is derived from the authentication context.
 */
export type EditUserProfilePageProps = {
  // className for custom styling of the root element
  className?: string;
  // style for custom styling of the root element
  style?: React.CSSProperties;
};

/**
 * EditUserProfilePage allows authenticated users to modify their profile information.
 * It fetches the current user's profile, provides input fields for editable details,
 * and submits changes using the useUpdateUserProfile hook.
 */
export function EditUserProfilePage({ className, style }: EditUserProfilePageProps): React.JSX.Element {
  const { user, loading: authLoading, error: authError } = useAuth();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [company, setCompany] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    userProfile,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useGetUserProfile({
    variables: { userId: user?.id || '' }, // userId is required, provide empty string if user.id is not yet available.
    skip: !user?.id || authLoading, // Skip if no user ID or auth is still loading.
  });

  const [
    updateUserProfile,
    { loading: updateLoading, error: updateMutationError },
  ] = useUpdateUserProfile();

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setBio(userProfile.bio || '');
      setCompany(userProfile.company || '');
      setImageUrl(userProfile.imageUrl || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (updateMutationError) {
      setFormMessage({ type: 'error', text: updateMutationError.message || 'Failed to update profile. Please try again.' });
    }
  }, [updateMutationError]);


  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormMessage(null);

    if (!user?.id) {
      setFormMessage({ type: 'error', text: 'User not authenticated.' });
      return;
    }

    const profileDataToUpdate: UpdateUserProfileOptionsInput = {
      displayName: name,
      bio,
      company,
      imageUrl,
    };

    try {
      const result = await updateUserProfile({ variables: profileDataToUpdate });
      if (result.data?.updateUserProfile) {
        setFormMessage({ type: 'success', text: 'Profile updated successfully!' });
        refetchProfile?.(); // Refetch profile to ensure UI consistency if cache doesn't update immediately
      } else if (result.errors) {
        setFormMessage({ type: 'error', text: result.errors[0]?.message || 'An unknown error occurred during update.' });
      }
    } catch (err) {
      // Error already handled by updateMutationError effect, but this catch block handles other potential errors.
      // The form message will be set by the useEffect watching updateMutationError if it's a GraphQL error.
    }
  }, [user, name, bio, company, imageUrl, updateUserProfile, refetchProfile]);

  const handleInputChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) => {
    setter(value);
    if (formMessage) {
      setFormMessage(null); // Clear message on new input
    }
  }, [formMessage]);

  if (authLoading) {
    return (
      <PageLayout title="Edit Profile - Product Hunt">
        <div className={styles.pageContainer}>
          <div className={styles.loadingSpinner}>Loading authentication...</div>
        </div>
      </PageLayout>
    );
  }

  if (authError) {
    return (
      <PageLayout title="Authentication Error - Product Hunt">
        <div className={styles.pageContainer}>
          <div className={classNames(styles.statusMessage, styles.error)}>
            Error authenticating: {authError.message}
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!user) {
    return (
      <PageLayout title="Edit Profile - Product Hunt">
        <div className={styles.pageContainer}>
          <div className={classNames(styles.statusMessage, styles.error)}>
            Please log in to edit your profile.
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (profileLoading && !userProfile) { // Show profile loading only if user is present and profile not yet loaded
    return (
      <PageLayout title="Edit Profile - Product Hunt">
        <div className={styles.pageContainer}>
          <div className={styles.loadingSpinner}>Loading profile...</div>
        </div>
      </PageLayout>
    );
  }

  if (profileError && !userProfile) {
    return (
      <PageLayout title="Error Loading Profile - Product Hunt">
        <div className={styles.pageContainer}>
          <div className={classNames(styles.statusMessage, styles.error)}>
            Error loading profile: {profileError.message}
          </div>
        </div>
      </PageLayout>
    );
  }


  return (
    <PageLayout title="Edit Your Profile - Product Hunt" className={className} >
      <div className={styles.pageContainer} style={style}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>Edit Your Profile</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="profile-name" className={styles.label}>Name</label>
              <TextInput
                id="profile-name"
                value={name}
                onChange={handleInputChange(setName)}
                placeholder="Your display name"
                name="name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profile-bio" className={styles.label}>Bio</label>
              <TextInput
                id="profile-bio"
                value={bio}
                onChange={handleInputChange(setBio)}
                placeholder="Tell us about yourself"
                name="bio"
                type="textarea" // Assuming TextInput can handle this, or use a dedicated TextArea component
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profile-company" className={styles.label}>Company</label>
              <TextInput
                id="profile-company"
                value={company}
                onChange={handleInputChange(setCompany)}
                placeholder="Your company (optional)"
                name="company"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="profile-imageurl" className={styles.label}>Avatar URL</label>
              <TextInput
                id="profile-imageurl"
                value={imageUrl}
                onChange={handleInputChange(setImageUrl)}
                placeholder="URL to your avatar image (optional)"
                name="imageUrl"
                type="url"
              />
            </div>

            {formMessage && (
              <div className={classNames(styles.formMessage, styles[formMessage.type])}>
                {formMessage.text}
              </div>
            )}

            <Button type="submit" appearance="primary" disabled={updateLoading} className={styles.submitButton}>
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}