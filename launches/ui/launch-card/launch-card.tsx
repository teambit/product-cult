import React from 'react';
import classNames from 'classnames';
import { Card } from '@infinity/design.content.card';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Link } from '@infinity/design.navigation.link';
import { LaunchCountdown } from '@infinity/launches.ui.launch-countdown';
import type { LaunchCardProps } from './launch-card-props-type.js';
import styles from './launch-card.module.scss';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1548973862-91b7a794c719?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbGF1bmNoJTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk5MjU4fDA&ixlib=rb-4.1.0';
const DEFAULT_VIEW_LAUNCH_TEXT = 'View Launch Details';
const DEFAULT_IMAGE_ALT_FALLBACK = 'Product launch visual';

/**
 * LaunchCard is a component designed to display summarized information about a product launch.
 * It showcases the launch's name, tagline, image, description, countdown to launch date,
 * and a link to view more details. The card is interactive and visually engaging.
 */
export function LaunchCard({
  launch,
  className,
  style,
  imageUrl = DEFAULT_IMAGE_URL,
  imageAlt,
  viewLaunchText = DEFAULT_VIEW_LAUNCH_TEXT,
}: LaunchCardProps): React.JSX.Element {
  const resolvedImageAlt = imageAlt || launch.name || DEFAULT_IMAGE_ALT_FALLBACK;

  return (
    <Card
      className={classNames(styles.launchCard, className)}
      style={style}
      image={imageUrl}
      imageAlt={resolvedImageAlt}
      interactive
    >
      <Heading level={3} className={styles.launchName}>
        {launch.name}
      </Heading>
      <Paragraph className={styles.launchTagline}>{launch.tagline}</Paragraph>

      <div className={styles.countdownContainer}>
        <LaunchCountdown
          launchDate={launch.launchDate}
          title="Launching In"
        />
      </div>

      <Paragraph className={styles.launchDescription}>
        {launch.description}
      </Paragraph>

      <div className={styles.linkContainer}>
        <Link
          href={`/launches/${launch.id}`}
          className={styles.detailsLink}
        >
          {viewLaunchText}
        </Link>
      </div>
    </Card>
  );
}