import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UpcomingLaunchesSection } from './upcoming-launches-section.js';
import { mockLaunch, type Launch } from '@infinity/launches.entities.launch'; // Changed import

const futureDateISO = (days: number, hours = 0, minutes = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setUTCHours(date.getUTCHours() + hours); // Use UTC hours to avoid timezone issues in toISOString()
  date.setUTCMinutes(date.getUTCMinutes() + minutes); // Use UTC minutes
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
};

const mockLaunchesData: Launch[] = [
  mockLaunch({
    id: 'launch-futuristic-ai-suite',
    productId: 'prod-ai-001',
    name: 'Synapse AI Suite',
    tagline: 'Unlock human potential with cognitive AI.',
    description:
      'Synapse AI is a revolutionary platform offering a suite of tools for advanced data analysis, creative content generation, and complex problem-solving. Experience the future of AI-driven productivity.',
    launchDate: futureDateISO(5, 14, 30), // 5 days, 14 hours, 30 minutes from now
    status: 'upcoming',
    submittedBy: 'user-innovator-alpha',
    createdAt: new Date('2024-07-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-01T10:00:00.000Z').toISOString(),
  }),
  mockLaunch({
    id: 'launch-orbital-data-network',
    productId: 'prod-space-002',
    name: 'OrbitalMesh Network',
    tagline: 'Global connectivity, reimagined from space.',
    description:
      'OrbitalMesh provides ultra-low latency internet access anywhere on Earth through a constellation of next-generation satellites. Connecting the unconnected, empowering communities.',
    launchDate: futureDateISO(12, 9, 0), // 12 days, 9 hours from now
    status: 'upcoming',
    submittedBy: 'user-visionary-beta',
    createdAt: new Date('2024-07-02T12:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-02T12:00:00.000Z').toISOString(),
  }),
  mockLaunch({
    id: 'launch-bioharmony-platform',
    productId: 'prod-health-003',
    name: 'BioHarmony Health',
    tagline: 'Personalized wellness through genetic insights.',
    description:
      'BioHarmony offers a comprehensive platform for understanding your unique genetic makeup and receiving tailored recommendations for diet, fitness, and preventative health. Live smarter, live healthier.',
    launchDate: futureDateISO(25, 16, 45), // 25 days, 16 hours, 45 minutes from now
    status: 'upcoming',
    submittedBy: 'user-scientist-gamma',
    createdAt: new Date('2024-07-03T14:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-03T14:00:00.000Z').toISOString(),
  }),
];

export const BasicUpcomingLaunches = () => (
  <MockProvider>
    <UpcomingLaunchesSection launches={mockLaunchesData.slice(0, 2)} />
  </MockProvider>
);

export const UpcomingLaunchesEmptyState = () => (
  <MockProvider>
    <UpcomingLaunchesSection
      launches={[]}
      title="What's Next?"
      subtitle="Keep an eye on this space for groundbreaking products about to launch."
      caption="Future Forward"
    />
  </MockProvider>
);

export const UpcomingLaunchesWithViewAllLinkAndCustomText = () => (
  <MockProvider>
    <UpcomingLaunchesSection
      launches={mockLaunchesData}
      viewAllLink="/launches/upcoming"
      viewAllText="See All Future Innovations"
      title="On The Horizon"
      subtitle="A curated list of the most exciting products launching soon. Get ready to be amazed!"
      caption="Innovate. Inspire. Ignite."
    />
  </MockProvider>
);