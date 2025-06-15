import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { LaunchCountdown } from '@infinity/launches.ui.launch-countdown';
import { LaunchTrackingButton } from '@infinity/launches.ui.launch-tracking-button';
import { useGetLaunch } from '@infinity/launches.hooks.use-launches';
import type { Launch } from '@infinity/launches.entities.launch';
import classNames from 'classnames';
import styles from './launch-details-page.module.scss';
import type { LaunchDetailsPageProps } from './launch-details-page-props-type.js';
import type { NotificationPreferences } from './notification-preferences-type.js';


const DEFAULT_USER_ID_PLACEHOLDER = 'current-user-placeholder';
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1700508317396-e343a69ac72f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0";


/**
 * LaunchDetailsPage displays detailed information about a specific product launch.
 * It fetches launch data using the `launchId` from the URL parameters and
 * presents details such as name, tagline, description, launch date, a countdown,
 * and tracking options.
 */
export function LaunchDetailsPage({ className, style, mockLaunchData, sections, actions }: LaunchDetailsPageProps): React.JSX.Element {
  const { launchId } = useParams<{ launchId: string }>();
  const queryVariables = launchId ? { id: launchId } : { id: mockLaunchData!.id }; // Hook requires an ID.
  
  const { data, loading, error } = useGetLaunch(
    queryVariables,
    mockLaunchData ? { mockData: mockLaunchData } : undefined
  );

  if (!launchId && !mockLaunchData) {
    return (
      <PageLayout title="Error: Launch Not Specified">
        <div className={styles.errorState}>
          <Heading level={1}>Launch Not Found</Heading>
          <Paragraph>No launch ID was provided in the URL, and no mock data was supplied.</Paragraph>
        </div>
      </PageLayout>
    );
  }

  const launch: Launch | undefined = data?.getLaunch;

  const handleTrackChange = (
    tracked: boolean,
    currentLaunchId: string,
    userId: string,
    preferences: NotificationPreferences
  ): void => {
    // In a real application, this would trigger an API call to update tracking status.
    console.log('Launch tracking status changed:', {
      tracked,
      launchId: currentLaunchId,
      userId,
      preferences,
    });
  };

  if (loading) {
    return (
      <PageLayout title="Loading Launch Details...">
        <div className={styles.loadingState}>
          <Heading level={2}>Loading Details...</Heading>
          <Paragraph>Please wait while we fetch the launch information.</Paragraph>
          {/* Consider adding a themed spinner component here */}
        </div>
      </PageLayout>
    );
  }

  if (error || !launch) {
    return (
      <PageLayout title="Error Loading Launch">
        <div className={styles.errorState}>
          <Heading level={1}>Oops! Something Went Wrong</Heading>
          <Paragraph>
            {error || 'We could not find or load the launch you are looking for.'}
          </Paragraph>
          {/* Consider adding a link to go back or to a launches list page */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={`${launch.name} - Launch Details`} className={classNames(styles.launchDetailsPage, className)}>
      <header className={styles.heroSection} style={{ backgroundImage: `url(${launch.imageUrl || HERO_IMAGE_URL})` }}>
        <div className={styles.heroOverlay}>
          <Heading level={1} className={styles.launchNameHero}>{launch.name}</Heading>
          {launch.tagline && <Paragraph className={styles.taglineHero}>{launch.tagline}</Paragraph>}
        </div>
        <div className={styles.actions}>
        {actions?.length ? actions.map((action) => {
            const Component = action.component;
            return <Component launch={launch} />;
          }): null}
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.interactiveSection}>
          <LaunchCountdown
            launchDate={launch.launchDate}
            title="Time to Liftoff!"
            launchedMessage={`🚀 ${launch.name} Has Launched!`}
            className={styles.countdownTimer}
          />
          <LaunchTrackingButton
            launchId={launch.id}
            userId={DEFAULT_USER_ID_PLACEHOLDER} // Replace with actual user ID from auth context in a real app
            initialTracked={false} // This would ideally come from user-specific data
            onTrackChange={handleTrackChange}
            className={styles.trackingButton}
          />
        </section>

        <section className={styles.aboutSection}>
          <Heading level={2} className={styles.sectionTitle}>About This Launch</Heading>
          <Paragraph className={styles.description}>{launch.description}</Paragraph>
        </section>

        <section className={styles.detailsSection}>
          <Heading level={2} className={styles.sectionTitle}>Key Information</Heading>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Launch Date</Heading>
              <Paragraph className={styles.detailValue}>
                {new Date(launch.launchDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
              </Paragraph>
            </div>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Status</Heading>
              <Paragraph className={styles.detailValue}>{launch.status}</Paragraph>
            </div>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Product ID</Heading>
              <Paragraph className={styles.detailValue}>{launch.productId}</Paragraph>
              {/* In a real app, this could be a link: <Link to={`/products/${launch.productId}`}>{launch.productId}</Link> */}
            </div>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Submitted By</Heading>
              <Paragraph className={styles.detailValue}>{launch.submittedBy}</Paragraph>
               {/* In a real app, this could be a link to user profile */}
            </div>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Created</Heading>
              <Paragraph className={styles.detailValue}>
                {new Date(launch.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </Paragraph>
            </div>
            <div className={styles.detailItem}>
              <Heading level={4} className={styles.detailLabel}>Last Updated</Heading>
              <Paragraph className={styles.detailValue}>
                {new Date(launch.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </Paragraph>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
