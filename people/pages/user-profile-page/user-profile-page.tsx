import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Avatar } from '@infinity/design.content.avatar';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Button } from '@infinity/design.actions.button';
import { Link } from '@infinity/design.navigation.link';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import type { UserProfile } from '@infinity/people.entities.user-profile';
import { useGetUserProfile } from '@infinity/people.hooks.use-user-profile';

import type { UserProfileTab } from './user-profile-tab-type.js';
import styles from './user-profile-page.module.scss';

/**
 * Props for the UserProfilePage component.
 */
export type UserProfilePageProps = {
  /**
   * ID of the user profile to display.
   * If not provided, the page attempts to display the profile of the currently authenticated user.
   */
  userId?: string;
  /**
   * An array of tab configurations to display additional sections on the profile page.
   * Each tab object defines its name, label, optional icon, and the component to render.
   * Defaults to an empty array if not provided.
   */
  tabs?: UserProfileTab[];
  /**
   * Optional custom CSS class to apply to the root element of the page.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the page.
   * It's generally recommended to use CSS classes for styling.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock data for the `useGetUserProfile` hook.
   * This is intended for testing or development purposes.
   */
  mockUserProfileData?: UserProfile;
};

const DEFAULT_TABS: UserProfileTab[] = [];

/**
 * UserProfilePage displays a user's profile information, including an overview and optional tabs for additional content.
 * It fetches user data using the `useGetUserProfile` hook and leverages `useAuth` to determine if the profile
 * being viewed belongs to the authenticated user, enabling features like an "Edit Profile" button.
 */
export function UserProfilePage({
  userId,
  tabs = DEFAULT_TABS,
  className,
  style,
  mockUserProfileData,
}: UserProfilePageProps): React.JSX.Element {
  const { user: authUser, loading: authLoading } = useAuth();
  const [activeTabName, setActiveTabName] = useState<string | null>(null);

  const targetUserId = userId || authUser?.id;

  const {
    userProfile,
    loading: profileLoading,
    error: profileError,
  } = useGetUserProfile({
    variables: { userId: targetUserId! },
    skip: !targetUserId || authLoading,
    mockData: mockUserProfileData,
  });

  useEffect(() => {
    if (tabs.length > 0 && !activeTabName) {
      setActiveTabName(tabs[0].name);
    } else if (tabs.length > 0 && activeTabName) {
      // Ensure activeTabName is still valid if tabs array changes
      const currentTabExists = tabs.some(tab => tab.name === activeTabName);
      if (!currentTabExists) {
        setActiveTabName(tabs[0].name);
      }
    } else if (tabs.length === 0) {
      setActiveTabName(null); // No tabs, so no active tab
    }
  }, [tabs, activeTabName]);

  const handleTabClick = (tabName: string) => {
    setActiveTabName(tabName);
  };

  if (authLoading || (profileLoading && !userProfile && !profileError)) {
    return (
      <PageLayout title="Loading Profile...">
        <div className={styles.stateContainer}>
          <Paragraph>Loading user profile...</Paragraph>
        </div>
      </PageLayout>
    );
  }

  if (profileError) {
    return (
      <PageLayout title="Error">
        <div className={styles.stateContainer}>
          <Heading level={2} className={styles.errorTitle}>Error Loading Profile</Heading>
          <Paragraph>{profileError.message || 'An unexpected error occurred.'}</Paragraph>
        </div>
      </PageLayout>
    );
  }

  if (!userProfile) {
    return (
      <PageLayout title="User Not Found">
        <div className={styles.stateContainer}>
          <Heading level={2} className={styles.notFoundTitle}>User Profile Not Found</Heading>
          <Paragraph>
            The requested user profile could not be found.
            {!authUser && !userId && ' You might need to log in to view your profile.'}
          </Paragraph>
        </div>
      </PageLayout>
    );
  }

  const ActiveTabContentComponent = tabs.find(
    (tab) => tab.name === activeTabName
  )?.component;
  const isOwnProfile = authUser?.id === userProfile.userId;

  return (
    <PageLayout
      title={`${userProfile.name} - Profile`}
      className={classNames(styles.userProfilePage, className)}
      // style prop is removed here as PageLayoutProps does not accept it
    >
      <header className={styles.profileOverview}>
        <div className={styles.avatarColumn}>
          <Avatar
            src={userProfile.imageUrl}
            alt={userProfile.name}
            size="xlarge"
            shape="circle"
            className={styles.avatar}
          />
        </div>
        <div className={styles.detailsColumn}>
          <Heading level={1} className={styles.userName}>
            {userProfile.name}
          </Heading>
          {userProfile.company && (
            <Paragraph className={styles.userInfoItem}>
              Works at <strong>{userProfile.company}</strong>
            </Paragraph>
          )}
          {userProfile.bio && (
            <Paragraph className={styles.userBio}>{userProfile.bio}</Paragraph>
          )}
          <div className={styles.additionalInfo}>
            {userProfile.location && (
              <Paragraph className={styles.userInfoItem}>
                From <strong>{userProfile.location}</strong>
              </Paragraph>
            )}
            <Paragraph className={styles.userInfoItem}>
              Joined: {new Date(userProfile.createdAt).toLocaleDateString()}
            </Paragraph>
            {userProfile.email && (
               <Paragraph className={styles.userInfoItem}>
                Contact: <Link href={`mailto:${userProfile.email}`}>{userProfile.email}</Link>
              </Paragraph>
            )}
          </div>
          {userProfile.socialMediaLinks &&
            Object.keys(userProfile.socialMediaLinks).length > 0 && (
              <div className={styles.socialLinks}>
                <Heading level={4} visualLevel={5} className={styles.socialLinksTitle}>
                  Connect
                </Heading>
                <ul className={styles.socialLinksList}>
                  {Object.entries(userProfile.socialMediaLinks).map(
                    ([platform, link]) => (
                      <li key={platform}>
                        <Link href={link} external className={styles.socialLinkItem}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
        {isOwnProfile && (
          <div className={styles.profileActions}>
            <Button appearance="secondary" href="/profile/edit">
              Edit Profile
            </Button>
          </div>
        )}
      </header>

      {tabs.length > 0 && (
        <nav className={styles.tabsNav}>
          {tabs.map((tab) => {
            const TabIconComponent = tab.icon;
            return (
              <button
                key={tab.name}
                type="button"
                className={classNames(styles.tabButton, {
                  [styles.activeTab]: activeTabName === tab.name,
                })}
                onClick={() => handleTabClick(tab.name)}
                aria-pressed={activeTabName === tab.name}
              >
                {TabIconComponent && (
                  <TabIconComponent className={styles.tabIcon} />
                )}
                <span className={styles.tabLabel}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {ActiveTabContentComponent && (
        <main className={styles.tabContent}>
          <ActiveTabContentComponent />
        </main>
      )}
    </PageLayout>
  );
}