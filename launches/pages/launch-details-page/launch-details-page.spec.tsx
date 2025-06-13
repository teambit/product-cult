import React from 'react';
import { MockedProvider } from '@apollo/client/testing/index.js';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockLaunch } from '@infinity/launches.entities.launch';
import { LaunchDetailsPage } from './launch-details-page.js';
import styles from './launch-details-page.module.scss';

describe('LaunchDetailsPage', () => {
  const mockLaunchData = mockLaunch({
    id: 'test-launch-id',
    name: 'Test Launch',
    tagline: 'Test Tagline',
    description: 'Test Description',
    launchDate: new Date().toISOString(),
    status: 'upcoming',
  });

  it('renders launch details correctly', async () => {
    const { container } = render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/launch/test-launch-id']}>
          <Routes>
            <Route path="/launch/:launchId" element={<LaunchDetailsPage mockLaunchData={mockLaunchData} />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(container.querySelector(`.${styles.launchNameHero}`)?.textContent).toBe('Test Launch');
      expect(container.querySelector(`.${styles.taglineHero}`)?.textContent).toBe('Test Tagline');
    });
  });

  it('simulates tracking button click', async () => {
    const { container } = render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/launch/test-launch-id']}>
          <Routes>
            <Route path="/launch/:launchId" element={<LaunchDetailsPage mockLaunchData={mockLaunchData} />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      const trackButton = container.querySelector(`.${styles.trackingButton}`) as HTMLButtonElement;
      expect(trackButton).toBeInTheDocument();
      fireEvent.click(trackButton);
    });
  });
});
