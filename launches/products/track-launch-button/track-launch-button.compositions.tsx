import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { TrackLaunchButton } from './track-launch-button.js';
import type { LaunchType } from './launch-type.js';
import type { NotificationPreferencesType } from './notification-preferences-type.js';

// Reusable wrapper for consistent styling of compositions
const CompositionShowcase = ({
  title,
  description,
  children,
  launchName,
  launchTagline,
  launchImage,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  launchName?: string;
  launchTagline?: string;
  launchImage?: string;
}) => (
  <div
    style={{
      fontFamily: 'var(--typography-font-family)',
      color: 'var(--colors-text-primary)',
      backgroundColor: 'var(--colors-surface-primary)',
      padding: 'var(--spacing-large)',
      margin: 'var(--spacing-large) auto', // Center the showcase box
      borderRadius: 'var(--borders-radius-large)',
      border: `1px solid var(--colors-border-subtle)`,
      boxShadow: 'var(--effects-shadows-medium)',
      maxWidth: '600px',
    }}
  >
    <h3
      style={{
        fontSize: 'var(--typography-sizes-heading-h4)',
        color: 'var(--colors-text-primary)',
        borderBottom: `1px solid var(--colors-border-subtle)`,
        paddingBottom: 'var(--spacing-medium)',
        marginBottom: 'var(--spacing-medium)',
        marginTop: 0,
      }}
    >
      {title}
    </h3>
    {launchName && (
      <div style={{ marginBottom: 'var(--spacing-medium)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-medium)' }}>
        {launchImage && (
          <img
            src={launchImage}
            alt={`${launchName} illustration`}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: 'var(--borders-radius-medium)',
              border: `1px solid var(--colors-border-default)`,
            }}
          />
        )}
        <div>
          <h4 style={{ margin: 0, fontSize: 'var(--typography-sizes-heading-h5)', color: 'var(--colors-text-accent)' }}>
            {launchName}
          </h4>
          {launchTagline && (
            <p style={{ margin: 'var(--spacing-x-small) 0 0 0', fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)' }}>
              {launchTagline}
            </p>
          )}
        </div>
      </div>
    )}
    <p
      style={{
        fontSize: 'var(--typography-sizes-body-default)',
        color: 'var(--colors-text-secondary)',
        marginBottom: 'var(--spacing-medium)',
        lineHeight: 'var(--typography-line-height-base)',
      }}
    >
      {description}
    </p>
    <div
      style={{
        padding: 'var(--spacing-medium)',
        backgroundColor: 'var(--colors-surface-secondary)',
        borderRadius: 'var(--borders-radius-medium)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  </div>
);

// Image URLs from the provided list
const rocketImageUrl = "https://images.unsplash.com/photo-1700508317396-e343a69ac72f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0";
const telescopeImageUrl = "https://images.unsplash.com/photo-1615403842974-707a10f8399c?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0";
const blurryTreeImageUrl = "https://images.unsplash.com/photo-1712397046497-c55fa27bb628?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0";
const blackMetalTowerImageUrl = "https://images.unsplash.com/photo-1591370879678-b1429e988558?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxyb2NrZXQlMjBsYXVuY2h8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5Nzk2N3ww&ixlib=rb-4.1.0";

// Mock Data
const mockLaunchBasic: LaunchType = {
  id: 'launch-apollo-x',
  productId: 'prod-space-systems',
  name: 'Apollo Mission X',
  tagline: 'Reaching for new horizons in space exploration.',
  description: 'The Apollo Mission X is a landmark private spaceflight initiative, aiming to test next-generation propulsion systems.',
  launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  status: 'upcoming',
  submittedBy: 'user-visionary-001',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockLaunchTracked: LaunchType = {
  id: 'launch-comsat-gen2',
  productId: 'prod-global-comms',
  name: 'ComSat Gen2 Satellite',
  tagline: 'Connecting the world, faster and more reliably.',
  description: 'The second generation of ComSat satellites, offering enhanced bandwidth and coverage for global communication networks.',
  launchDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
  status: 'upcoming',
  submittedBy: 'user-innovator-002',
  createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockLaunchCallback: LaunchType = {
  id: 'launch-deepsky-probe',
  productId: 'prod-astro-research',
  name: 'DeepSky Observation Probe',
  tagline: 'Unveiling the secrets of distant galaxies.',
  description: 'An advanced probe equipped with powerful telescopes to study deep space phenomena and cosmic origins.',
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  status: 'upcoming',
  submittedBy: 'user-scientist-003',
  createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockLaunchStyled: LaunchType = {
  id: 'launch-eco-rocket',
  productId: 'prod-green-launch',
  name: 'EcoBoost Rocket "Veridian"',
  tagline: 'Sustainable launches for a greener future.',
  description: 'The Veridian rocket utilizes innovative, eco-friendly fuel and reusable components for sustainable space access.',
  launchDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
  status: 'upcoming',
  submittedBy: 'user-environmentalist-004',
  createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultNotificationPreferences: NotificationPreferencesType = {
  emailEnabled: true,
  pushEnabled: false,
  inAppEnabled: true,
};

const customNotificationPreferences: NotificationPreferencesType = {
  emailEnabled: false,
  pushEnabled: true,
  inAppEnabled: true,
};

// Compositions

export const BasicTrackLaunchButton = () => (
  <MockProvider>
    <CompositionShowcase
      title="Default Untracked Launch"
      description="This shows the TrackLaunchButton for 'Apollo Mission X' in its default, untracked state. Clicking it will simulate tracking the launch."
      launchName={mockLaunchBasic.name}
      launchTagline={mockLaunchBasic.tagline}
      launchImage={rocketImageUrl}
    >
      <TrackLaunchButton
        launch={mockLaunchBasic}
        userId="user-spacefan-001"
        initialTracked={false}
      />
    </CompositionShowcase>
  </MockProvider>
);

export const InitiallyTrackedLaunchButton = () => (
  <MockProvider>
    <CompositionShowcase
      title="Initially Tracked Launch"
      description="The TrackLaunchButton for 'ComSat Gen2 Satellite' is pre-set to 'tracked'. Clicking it will simulate untracking."
      launchName={mockLaunchTracked.name}
      launchTagline={mockLaunchTracked.tagline}
      launchImage={telescopeImageUrl}
    >
      <TrackLaunchButton
        launch={mockLaunchTracked}
        userId="user-techie-002"
        initialTracked={true}
        initialNotificationPreferences={defaultNotificationPreferences}
      />
    </CompositionShowcase>
  </MockProvider>
);

export const TrackLaunchButtonWithCallbackAndCustomPrefs = () => {
  const handleTrackChange = (
    tracked: boolean,
    launchId: string,
    userId: string,
    preferences: NotificationPreferencesType
  ) => {
    // eslint-disable-next-line no-alert
    alert(
      `TrackLaunchButton Callback:
      Launch ID: ${launchId} (for ${mockLaunchCallback.name})
      User ID: ${userId}
      Now Tracked: ${tracked}
      Notification Preferences:
        Email: ${preferences.emailEnabled}
        Push: ${preferences.pushEnabled}
        In-App: ${preferences.inAppEnabled}`
    );
    console.log('TrackLaunchButton - onTrackChange Fired:', {
      launchId,
      userId,
      tracked,
      preferences,
    });
  };

  return (
    <MockProvider>
      <CompositionShowcase
        title="Callback & Custom Preferences"
        description="Click the button for 'DeepSky Observation Probe'. This demonstrates the onTrackChange callback and custom initial notification preferences (Push & In-App enabled)."
        launchName={mockLaunchCallback.name}
        launchTagline={mockLaunchCallback.tagline}
        launchImage={blurryTreeImageUrl}
      >
        <TrackLaunchButton
          launch={mockLaunchCallback}
          userId="user-curious-003"
          initialTracked={false}
          initialNotificationPreferences={customNotificationPreferences}
          onTrackChange={handleTrackChange}
        />
      </CompositionShowcase>
    </MockProvider>
  );
};

export const StyledTrackLaunchButtonWrapper = () => {
  return (
    <MockProvider>
      <style>
        {`
          .custom-launch-button-wrapper {
            padding: var(--spacing-x-small); /* Add some internal padding to the wrapper */
            background-image: var(--effects-gradients-subtle-surface); /* Subtle gradient background */
            border-radius: var(--borders-radius-pill); /* Pill-shaped wrapper */
            box-shadow: var(--effects-shadows-primary); /* Primary color shadow for emphasis */
            transition: transform 0.2s var(--interactions-transitions-easing-ease-out);
          }

          .custom-launch-button-wrapper:hover {
            transform: scale(1.03); /* Slight scale effect on hover */
          }
        `}
      </style>
      <CompositionShowcase
        title="Styled Button Wrapper"
        description="This TrackLaunchButton for 'EcoBoost Rocket uses a custom CSS class on its wrapper element to apply unique styles like a gradient background, pill shape, and hover effect."
        launchName={mockLaunchStyled.name}
        launchTagline={mockLaunchStyled.tagline}
        launchImage={blackMetalTowerImageUrl}
      >
        <TrackLaunchButton
          launch={mockLaunchStyled}
          userId="user-designer-004"
          className="custom-launch-button-wrapper"
        />
      </CompositionShowcase>
    </MockProvider>
  );
};
