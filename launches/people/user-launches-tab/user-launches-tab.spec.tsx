import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserLaunchesTab } from './user-launches-tab.js';
import styles from './user-launches-tab.module.scss';
import { Launch, mockLaunch } from '@infinity/launches.entities.launch';

describe('UserLaunchesTab', () => {
  it('displays loading state', () => {
    const { container } = render(
      <MockProvider>
        <UserLaunchesTab userId="loading-user" loading={true} />
      </MockProvider>
    );

    expect(screen.getByText('Loading submitted launches...')).toBeInTheDocument();
    const loadingElement = container.querySelector(`.${styles.loadingState}`);
    expect(loadingElement).toBeInTheDocument();
    expect(container.querySelector(`.${styles.loadingSpinner}`)).toBeInTheDocument();
  });

  it('displays error state', () => {
    const { container } = render(
      <MockProvider>
        <UserLaunchesTab userId="error-user" error={new Error("Simulated error")} />
      </MockProvider>
    );

    expect(screen.getByText('We encountered an issue loading your launches. Please try again later.')).toBeInTheDocument();
    const errorElement = container.querySelector(`.${styles.errorState}`);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders LaunchList when launches are provided', () => {
    const mockLaunchesData: Launch[] = [
      mockLaunch({ 
        id: '1', 
        name: 'Test Launch 1', 
        tagline: 'Tagline 1', 
        productId: 'p1', 
        description: 'd1', 
        launchDate: new Date().toISOString(), 
        status: 'live', 
        submittedBy: 'user1', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      }),
    ];
    const { container } = render(
      <MockProvider>
        <UserLaunchesTab userId="data-user" launches={mockLaunchesData} loading={false} error={null} />
      </MockProvider>
    );

    const launchListElement = container.querySelector('.launchListGrid');
    expect(launchListElement).toBeInTheDocument();
    // Example of checking for content if LaunchList/LaunchCard renders it
    // This depends on the internal structure of LaunchList and LaunchCard.
    // If LaunchCard renders the name:
    // expect(screen.getByText('Test Launch 1')).toBeInTheDocument(); 
  });
});