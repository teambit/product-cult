import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockLaunch } from '@infinity/launches.entities.launch';
import { LaunchCard } from './launch-card.js';
import styles from './launch-card.module.scss';

describe('LaunchCard', () => {
  it('renders launch name and tagline', () => {
    const launch = mockLaunch({
      name: 'Test Launch',
      tagline: 'Test Tagline',
    });

    const { container } = render(
      <MockProvider>
        <LaunchCard launch={launch} />
      </MockProvider>
    );

    const nameElement = container.querySelector(`.${styles.launchName}`);
    const taglineElement = container.querySelector(`.${styles.launchTagline}`);

    expect(nameElement).toHaveTextContent('Test Launch');
    expect(taglineElement).toHaveTextContent('Test Tagline');
  });

  it('renders the view launch details link', () => {
    const launch = mockLaunch({
      id: '123',
      name: 'Test Launch',
      tagline: 'Test Tagline',
    });

    const { container } = render(
      <MockProvider>
        <LaunchCard launch={launch} />
      </MockProvider>
    );
    const detailsLink = container.querySelector(`.${styles.detailsLink}`) as HTMLAnchorElement;
    expect(detailsLink).toHaveTextContent('View Launch Details');
    expect(detailsLink.href).toContain('/launches/123');
  });

  it('renders custom view launch text', () => {
    const launch = mockLaunch({
      id: '123',
      name: 'Test Launch',
      tagline: 'Test Tagline',
    });

    const { container } = render(
      <MockProvider>
        <LaunchCard launch={launch} viewLaunchText="See More" />
      </MockProvider>
    );
    const detailsLink = container.querySelector(`.${styles.detailsLink}`) as HTMLAnchorElement;
    expect(detailsLink).toHaveTextContent('See More');
  });
});