import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import type { Launch } from '@infinity/launches.entities.launch';
import { LaunchInfoTab } from './launch-info-tab.js';
import styles from './launch-info-tab.module.scss';

describe('LaunchInfoTab', () => {
  const mockLaunchData = {
    id: 'launch-001',
    productId: 'prod-123',
    name: 'Test Launch',
    tagline: 'A tagline for testing',
    description: 'This is a test description.',
    launchDate: new Date().toISOString(),
    status: 'live',
    submittedBy: 'user-alpha',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const mockLaunch: Launch = {
    ...mockLaunchData,
    toObject: () => mockLaunchData,
  };

  it('renders launch information correctly', () => {
    const { container } = render(
      <MockProvider>
        <LaunchInfoTab productId="prod-123" mockLaunchesData={[mockLaunch]} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.launchName}`)).toHaveTextContent('Test Launch');
    expect(container.querySelector(`.${styles.launchTagline}`)).toHaveTextContent('A tagline for testing');
    expect(container.querySelector(`.${styles.launchDescription}`)).toHaveTextContent('This is a test description.');
  });

  it('renders "No launch information available" message when no launches are available', () => {
    const { container } = render(
      <MockProvider>
        <LaunchInfoTab productId="prod-123" mockLaunchesData={[]} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.noLaunchesMessage}`)).toHaveTextContent('No launch information available for this product yet.');
  });

  it('renders "Loading launch information..." message when loading', () => {
    const { container } = render(
      <MockProvider>
        <LaunchInfoTab productId="prod-123" mockLaunchesData={undefined} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.loadingMessage}`)).toBeInTheDocument();
  });
});
