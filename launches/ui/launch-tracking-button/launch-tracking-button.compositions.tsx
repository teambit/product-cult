import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { LaunchTrackingButton } from './launch-tracking-button.js';
import type { NotificationPreferences } from '@infinity/launches.entities.launch-tracking';

const CompositionWrapper = ({ title, children, description }: { title: string, children: React.ReactNode, description?: string }) => (
  <div style={{
    marginBottom: 'var(--spacing-x-large)',
    padding: 'var(--spacing-large)',
    border: `1px solid var(--colors-border-subtle)`,
    borderRadius: 'var(--borders-radius-large)',
    backgroundColor: 'var(--colors-surface-primary)',
    fontFamily: 'var(--typography-font-family)',
  }}>
    <h3 style={{
      marginTop: 0,
      marginBottom: 'var(--spacing-small)',
      color: 'var(--colors-text-primary)',
      fontSize: 'var(--typography-sizes-heading-h4)',
      borderBottom: `1px solid var(--colors-border-subtle)`,
      paddingBottom: 'var(--spacing-small)',
    }}>{title}</h3>
    {description && (
      <p style={{
        color: 'var(--colors-text-secondary)',
        fontSize: 'var(--typography-sizes-body-default)',
        marginBottom: 'var(--spacing-medium)',
        lineHeight: 'var(--typography-line-height-base)',
      }}>
        {description}
      </p>
    )}
    {children}
  </div>
);

export const DefaultUntrackedButton = () => (
  <MockProvider>
    <CompositionWrapper
      title="Default Untracked State"
      description="This shows the LaunchTrackingButton in its default state (not tracked). Clicking it will toggle its appearance."
    >
      <LaunchTrackingButton
        launchId="launch-alpha-123"
        userId="user-visitor-001"
      />
    </CompositionWrapper>
  </MockProvider>
);

export const InitiallyTrackedButton = () => (
  <MockProvider>
    <CompositionWrapper
      title="Initially Tracked State"
      description="This button is initialized as 'tracked'. Clicking it will change its state to 'untracked'."
    >
      <LaunchTrackingButton
        launchId="launch-omega-456"
        userId="user-follower-002"
        initialTracked={true}
      />
    </CompositionWrapper>
  </MockProvider>
);

export const ButtonWithTrackChangeCallback = () => {
  const handleTrackChange = (
    tracked: boolean,
    launchId: string,
    userId: string,
    preferences: NotificationPreferences
  ) => {
    // eslint-disable-next-line no-alert
    alert(
      `Launch Tracking Update:
      Launch ID: ${launchId}
      User ID: ${userId}
      Now Tracked: ${tracked}
      Notification Prefs: Email ${preferences.emailEnabled}, Push ${preferences.pushEnabled}, In-App ${preferences.inAppEnabled}`
    );
    console.log('TrackChange Callback Fired:', { tracked, launchId, userId, preferences });
  };

  const customNotificationPreferences: NotificationPreferences = {
    emailEnabled: false,
    pushEnabled: true,
    inAppEnabled: true,
  };

  return (
    <MockProvider>
      <CompositionWrapper
        title="Button with onTrackChange Callback"
        description="Clicking this button will trigger an alert and log to the console, demonstrating the onTrackChange callback with custom notification preferences."
      >
        <LaunchTrackingButton
          launchId="launch-gamma-789"
          userId="user-interactive-003"
          initialNotificationPreferences={customNotificationPreferences}
          onTrackChange={handleTrackChange}
        />
      </CompositionWrapper>
    </MockProvider>
  );
};

export const CustomStyledButton = () => {
  return (
    <MockProvider>
      <style>
        {`
          .custom-launch-tracker {
            border-radius: var(--borders-radius-pill) !important; /* Example: Pill shape */
            font-weight: var(--typography-font-weight-bold) !important; /* Example: Bolder text */
            box-shadow: var(--effects-shadows-medium) !important; /* Example: Add a shadow */
          }

          .custom-launch-tracker:hover {
            transform: scale(1.05) !important; /* Example: Scale on hover */
            opacity: 0.9 !important;
          }
        `}
      </style>
      <CompositionWrapper
        title="Custom Styled Button"
        description="This button uses the 'className' prop to apply custom styles, such as a pill shape and bolder text."
      >
        <LaunchTrackingButton
          launchId="launch-delta-010"
          userId="user-stylist-004"
          className="custom-launch-tracker"
        />
      </CompositionWrapper>
    </MockProvider>
  );
};