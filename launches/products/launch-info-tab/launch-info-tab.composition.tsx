import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import type { Launch } from '@infinity/launches.entities.launch'; 
import { LaunchInfoTab } from './launch-info-tab.js';

const commonLaunchData = {
  productId: 'prod-123',
  submittedBy: 'user-alpha',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const liveLaunchData = {
  ...commonLaunchData,
  id: 'launch-live-001',
  name: 'InnovateHub X - Live Now!',
  tagline: 'The future of collaborative project management is here.',
  description:
    'InnovateHub X revolutionizes how teams work together. With AI-powered task management, seamless integrations, and real-time updates, it\'s the ultimate platform for bringing your ideas to life. We focused on creating an intuitive user experience coupled with powerful features to boost productivity and creativity.',
  launchDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  status: 'live',
};
const liveLaunch: Launch = {
  ...liveLaunchData,
  toObject: () => liveLaunchData,
};

const upcomingLaunchData = {
  ...commonLaunchData,
  id: 'launch-upcoming-002',
  name: 'CodeStream AI - Launching Soon',
  tagline: 'AI-driven insights for your development workflow.',
  description:
    'Get ready for CodeStream AI, a groundbreaking tool that integrates directly into your IDE to provide intelligent code suggestions, automated refactoring, and performance analysis. Prepare to supercharge your coding sessions and reduce development time significantly.',
  launchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  status: 'upcoming',
};
const upcomingLaunch: Launch = {
  ...upcomingLaunchData,
  toObject: () => upcomingLaunchData,
};

const archivedLaunchData = {
  ...commonLaunchData,
  id: 'launch-archived-003',
  name: 'PixelPerfect Suite (Archived)',
  tagline: 'Classic design tools for the discerning creative.',
  description:
    'PixelPerfect Suite was a beloved set of design applications that empowered thousands of artists and designers. While now archived, its legacy continues to inspire. This launch marked a significant milestone in digital art tools.',
  launchDate: new Date('2022-05-15T10:00:00Z').toISOString(),
  status: 'archived',
};
const archivedLaunch: Launch = {
  ...archivedLaunchData,
  toObject: () => archivedLaunchData,
};

const multipleLaunchesData = [
  liveLaunchData,
  {
    ...commonLaunchData,
    id: 'launch-old-004',
    name: 'DataSphere Analytics v1.0',
    tagline: 'Early version of our analytics platform.',
    description: 'The initial release of DataSphere, focusing on core data visualization.',
    launchDate: new Date('2023-01-20T10:00:00Z').toISOString(),
    status: 'archived',
  },
  upcomingLaunchData,
];

const multipleLaunches: Launch[] = multipleLaunchesData.map(data => ({...data, toObject: () => data}));


export const LiveLaunchInfo = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <LaunchInfoTab
          productId="prod-123"
          mockLaunchesData={[liveLaunch]}
        />
      </div>
    </MockProvider>
  );
};

export const UpcomingLaunchInfo = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <LaunchInfoTab
          productId="prod-456"
          mockLaunchesData={[upcomingLaunch]}
        />
      </div>
    </MockProvider>
  );
};

export const ArchivedLaunchInfo = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <LaunchInfoTab
          productId="prod-789"
          mockLaunchesData={[archivedLaunch]}
        />
      </div>
    </MockProvider>
  );
};

export const NoLaunchesInfo = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <LaunchInfoTab productId="prod-000" mockLaunchesData={[]} />
      </div>
    </MockProvider>
  );
};

export const MultipleLaunchesShowsLatest = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
        <LaunchInfoTab
          productId="prod-multi"
          mockLaunchesData={multipleLaunches}
        />
      </div>
    </MockProvider>
  );
};