import React from 'react';
import { Spinner } from '@infinity/design.loaders.spinner';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { LaunchList } from '@infinity/launches.ui.launch-list';
import { Launch, mockLaunch } from '@infinity/launches.entities.launch'; // Updated import
import { useListLaunches } from '@infinity/launches.hooks.use-launches';
import styles from './launches-page.module.scss';

// Updated DEFAULT_MOCK_LAUNCHES to use mockLaunch for Launch entity instances
const DEFAULT_MOCK_LAUNCHES: Launch[] = [
  mockLaunch({
    id: 'launch-nova-ai',
    productId: 'prod-ai-assistant',
    name: 'Nova AI Code Assistant',
    tagline: 'Boost your productivity with intelligent code completion and analysis.',
    description: 'Nova AI integrates seamlessly into your IDE, offering real-time suggestions, bug detection, and code refactoring capabilities powered by advanced machine learning models. Supports over 20 programming languages.',
    launchDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    status: 'upcoming',
    submittedBy: 'user-devlead-alpha',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    updatedAt: new Date().toISOString(),
    // thumbnailUrl: 'http://example.com/thumb-nova.jpg',
    // votesCount: 100,
    // commentsCount: 10,
    // // makers: [{ id: 'maker-1', name: 'AI Dev', avatarUrl: 'http://example.com/avatar1.jpg' }],
    // // topics: [{ id: 'topic-1', name: 'AI' }],
    // websiteUrl: 'http://example.com/nova-ai',
    // galleryImageUrls: ['http://example.com/gallery-nova-1.jpg'],
  }),
  mockLaunch({
    id: 'launch-taskmaster-x',
    productId: 'prod-taskmaster-pro',
    name: 'TaskMaster Pro X',
    tagline: 'The ultimate task management suite for teams and individuals.',
    description: 'Achieve peak productivity with TaskMaster Pro X. Features include Kanban boards, Gantt charts, collaborative workspaces, and powerful integrations with your favorite tools. Now with AI-powered task prioritization.',
    launchDate: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString(),
    status: 'live',
    submittedBy: 'user-prodmanager-beta',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    // media: [],
    // thumbnailUrl: 'http://example.com/thumb-taskmaster.jpg',
    // votesCount: 250,
    // commentsCount: 30,
    // makers: [{ id: 'maker-2', name: 'Prod Manager', avatarUrl: 'http://example.com/avatar2.jpg' }],
    // topics: [{ id: 'topic-2', name: 'Productivity' }],
    // websiteUrl: 'http://example.com/taskmaster',
    // galleryImageUrls: ['http://example.com/gallery-taskmaster-1.jpg'],
  }),
  mockLaunch({
    id: 'launch-stellarscope',
    productId: 'prod-stellar-scope',
    name: 'StellarScope Telescope App',
    tagline: 'Explore the cosmos from your pocket with augmented reality.',
    description: 'Point your device to the sky and StellarScope identifies stars, planets, constellations, and satellites in real-time. Features include detailed astronomical information, event notifications, and a stunning 3D sky map.',
    launchDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString(),
    status: 'upcoming',
    submittedBy: 'user-astronomyfan-gamma',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    updatedAt: new Date().toISOString(),
    // media: [],
    // thumbnailUrl: 'http://example.com/thumb-stellar.jpg',
    // votesCount: 50,
    // commentsCount: 5,
    // makers: [{ id: 'maker-3', name: 'Astro Fan', avatarUrl: 'http://example.com/avatar3.jpg' }],
    // topics: [{ id: 'topic-3', name: 'Education' }, { id: 'topic-4', name: 'AR' }],
    // websiteUrl: 'http://example.com/stellarscope',
    // galleryImageUrls: ['http://example.com/gallery-stellar-1.jpg'],
  }),
  mockLaunch({
    id: 'launch-greenroute',
    productId: 'prod-greenroute-logistics',
    name: 'GreenRoute Logistics Platform',
    tagline: 'Optimize your supply chain with sustainable routing solutions.',
    description: 'GreenRoute uses AI to plan the most eco-friendly and cost-effective delivery routes, reducing carbon footprint and operational expenses. Includes real-time tracking and emissions reporting.',
    launchDate: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    status: 'live',
    submittedBy: 'user-ecopreneur-delta',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 40)).toISOString(),
    updatedAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    // media: [],
    // thumbnailUrl: 'http://example.com/thumb-greenroute.jpg',
    // votesCount: 180,
    // commentsCount: 22,
    // makers: [{ id: 'maker-4', name: 'Eco Warrior', avatarUrl: 'http://example.com/avatar4.jpg' }],
    // topics: [{ id: 'topic-5', name: 'Sustainability' }, { id: 'topic-6', name: 'Logistics' }],
    // websiteUrl: 'http://example.com/greenroute',
    // galleryImageUrls: ['http://example.com/gallery-greenroute-1.jpg'],
  }),
  mockLaunch({
    id: 'launch-mindgarden',
    productId: 'prod-mindgarden-wellness',
    name: 'MindGarden AI Wellness Coach',
    tagline: 'Cultivate mental well-being with personalized AI guidance.',
    description: 'MindGarden offers guided meditations, stress-relief exercises, and mood tracking, all tailored to your personal needs by an empathetic AI coach. Start your journey to a healthier mind today.',
    launchDate: new Date(new Date().setDate(new Date().getDate() + 35)).toISOString(),
    status: 'upcoming',
    submittedBy: 'user-wellnessguru-epsilon',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    updatedAt: new Date().toISOString(),
    // media: [],
    // thumbnailUrl: 'http://example.com/thumb-mindgarden.jpg',
    // votesCount: 90,
    // commentsCount: 12,
    // makers: [{ id: 'maker-5', name: 'Wellness Guru', avatarUrl: 'http://example.com/avatar5.jpg' }],
    // topics: [{ id: 'topic-7', name: 'Health' }, { id: 'topic-8', name: 'AI' }],
    // websiteUrl: 'http://example.com/mindgarden',
    // galleryImageUrls: ['http://example.com/gallery-mindgarden-1.jpg'],
  })
];

/**
 * Props for the LaunchesPage component.
 */
export type LaunchesPageProps = {
  /**
   * An array of launch objects to display.
   * If not provided, default mock launches will be used.
   * These should be instances of the Launch entity.
   */
  launches?: Launch[];
  /**
   * Custom CSS class name for the root element of the page.
   * Allows for additional styling or overrides.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the page.
   * Use sparingly; prefer `className` for styling.
   * Note: This style is applied to the PageLayout's wrapper if PageLayout supports it,
   * or would require LaunchesPage to render its own wrapper if PageLayout doesn't.
   * Currently, PageLayout does not accept a style prop.
   */
  style?: React.CSSProperties;
};

/**
 * LaunchesPage displays a curated list of upcoming and past product launches.
 * It utilizes the PageLayout for consistent page structure and LaunchList for rendering launch items.
 */
export function LaunchesPage({
  launches: defaultLaunches = DEFAULT_MOCK_LAUNCHES,
  className,
  style,
  // The 'style' prop is part of LaunchesPageProps but is not passed to PageLayout as it's not supported.
  // It remains in props for potential future use or if LaunchesPage wraps PageLayout.
}: LaunchesPageProps): React.JSX.Element {
  const now = new Date();
  const { data, loading } = useListLaunches();
  const launches = data?.listLaunches || defaultLaunches;

  const upcomingLaunches = launches.filter(
    (launch) => new Date(launch.launchDate).getTime() > now.getTime()
  );
  const pastLaunches = launches.filter(
    (launch) => new Date(launch.launchDate).getTime() <= now.getTime()
  );

  const hasUpcoming = upcomingLaunches.length > 0;
  const hasPast = pastLaunches.length > 0;
  const hasAnyLaunches = hasUpcoming || hasPast;

  if (loading) {
    return (
      <div
        className={styles.loadingContainer}
        role="status"
        aria-live="polite"
      >
        <Spinner size="large" ariaLabel="Loading coming launches..." />
      </div>
    );
  }

  return (
    <PageLayout
      title="Product Launches - Discover What's Next"
      className={classNames(styles.launchesPage, className)}
      // style prop removed as PageLayout does not support it
      // style={style}
    >
      <header className={styles.pageHeader} style={style}>
        <h1 className={styles.pageTitle}>Explore Product Launches</h1>
        <p className={styles.pageSubtitle}>
          Discover the latest innovations, upcoming releases, and celebrated products from our vibrant community.
        </p>
      </header>

      {hasAnyLaunches ? (
        <>
          {hasUpcoming && (
            <section className={classNames(styles.section, styles.upcomingSection)}>
              <h2 className={styles.sectionTitle}>🚀 Upcoming Launches</h2>
              <LaunchList launches={upcomingLaunches} className={styles.launchListContainer} />
            </section>
          )}

          {hasPast && (
            <section className={classNames(styles.section, styles.pastSection)}>
              <h2 className={styles.sectionTitle}>🕰️ Past Launches</h2>
              <LaunchList launches={pastLaunches} className={styles.launchListContainer} />
            </section>
          )}
        </>
      ) : (
        <div className={styles.emptyStateContainer}>
            <span className={styles.emptyStateIcon} role="img" aria-label="Telescope emoji">🔭</span>
            <p className={styles.emptyStateText}>No Launches Yet</p>
            <p className={styles.emptyStateSubtext}>
              It&apos;s a bit quiet here right now. Be the first to know about new launches by checking back soon!
            </p>
        </div>
      )}
    </PageLayout>
  );
}
