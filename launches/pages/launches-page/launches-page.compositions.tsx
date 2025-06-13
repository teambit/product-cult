import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { LaunchesPage } from './launches-page.js';
import { Launch, mockLaunch } from '@infinity/launches.entities.launch'; // Updated import

const futureDateISO = (days: number, hours = 0, minutes = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};

const pastDateISO = (days: number, hours = 0, minutes = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
};

// Recreate mockLaunchesData using mockLaunch to ensure they are Launch entity instances
const mockLaunchesData: Launch[] = [
  mockLaunch({
    id: 'launch-rocket-fog',
    productId: 'prod-rocket-fog',
    name: 'Project: Foggy Rocket',
    tagline: 'A breakthrough in atmospheric propulsion technology.',
    description: 'Experience the unveiling of "Project: Foggy Rocket," a new system designed to operate optimally in challenging weather conditions, inspired by a rocket flying through the air on a foggy day.',
    launchDate: futureDateISO(7, 3),
    status: 'upcoming',
    submittedBy: 'user-spacecadet',
    createdAt: pastDateISO(30),
    updatedAt: pastDateISO(2),
    // Ensure all fields required by Launch entity are present if mockLaunch needs them
    // Add dummy values for any missing required fields if necessary based on Launch entity definition
  }),
  mockLaunch({
    id: 'launch-sunset-telescope',
    productId: 'prod-sunset-scope',
    name: 'Sunset Telescope Discovery Platform',
    tagline: 'Observe the cosmos with unparalleled clarity during twilight hours.',
    description: 'Inspired by the silhouette of a telescope during sunset, this platform provides astronomers with advanced tools for dusk and dawn observations. Launching new features for celestial event tracking.',
    launchDate: pastDateISO(14),
    status: 'live',
    submittedBy: 'user-stargazer',
    createdAt: pastDateISO(60),
    updatedAt: pastDateISO(1),
  }),
  mockLaunch({
    id: 'launch-caterpillar-deploy',
    productId: 'prod-caterpillar-deploy',
    name: 'Caterpillar Deploy System',
    tagline: 'Gradual and steady software deployment, like a caterpillar on a stick.',
    description: 'A new CI/CD tool focused on phased rollouts and meticulous monitoring. Ensures stability and reliability for critical software updates.',
    launchDate: futureDateISO(25, 6),
    status: 'upcoming',
    submittedBy: 'user-devopsguru',
    createdAt: pastDateISO(10),
    updatedAt: pastDateISO(1),
  }),
  mockLaunch({
    id: 'launch-watertower-comms',
    productId: 'prod-watertower-net',
    name: 'Orange Sunset Comms Network',
    tagline: 'High-altitude communication leveraging existing tower infrastructure.',
    description: 'Inspired by the resilience of a black metal tower under an orange sky, this project aims to provide robust communication networks using new technology on existing structures.',
    launchDate: pastDateISO(5),
    status: 'live',
    submittedBy: 'user-networkarch',
    createdAt: pastDateISO(45),
    updatedAt: pastDateISO(3),
  }),
];

export const BasicLaunchesPage = () => {
  return (
    <MockProvider>
      <LaunchesPage launches={mockLaunchesData} />
    </MockProvider>
  );
};

export const LaunchesPageWithOnlyUpcoming = () => {
  const upcomingOnly: Launch[] = mockLaunchesData.filter(
    (launch) => new Date(launch.launchDate) > new Date()
  );
  return (
    <MockProvider>
      <LaunchesPage launches={upcomingOnly} />
    </MockProvider>
  );
};

export const LaunchesPageWithOnlyPast = () => {
  const pastOnly: Launch[] = mockLaunchesData.filter(
    (launch) => new Date(launch.launchDate) <= new Date()
  );
  return (
    <MockProvider>
      <LaunchesPage launches={pastOnly} />
    </MockProvider>
  );
};

export const EmptyLaunchesPage = () => {
  return (
    <MockProvider>
      <LaunchesPage launches={[]} />
    </MockProvider>
  );
};