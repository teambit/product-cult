import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockLaunch, mockLaunches, Launch } from '@infinity/launches.entities.launch';
import { LaunchList } from './launch-list.js';

const futureDate = (days: number, hours = 0, minutes = 0, seconds = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);
  return date.toISOString();
};

const pastDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const compositionWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)', // Ensuring theme background is applied
  minHeight: '100vh', // Full viewport height for better context
};

const mockLaunchData: Launch[] = [
  mockLaunch({
    id: 'launch-1',
    name: 'SynthWave AI Composer',
    tagline: 'Generate retro tunes with modern AI.',
    description: 'Create authentic 80s synthwave tracks in minutes. No music theory required, just pure creativity and AI power. Perfect for game devs, filmmakers, and music enthusiasts.',
    launchDate: futureDate(3, 5, 30), // 3 days, 5 hours, 30 minutes from now
    productId: 'synthwave-ai-composer-prod',
    status: 'upcoming',
    submittedBy: 'user-retrolover',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  mockLaunch({
    id: 'launch-2',
    name: 'EcoHarvest Smart Fridge',
    tagline: 'Minimize food waste, maximize freshness.',
    description: 'Our AI-powered smart fridge tracks inventory, suggests recipes, and alerts you before items expire. Integrates seamlessly with your grocery delivery services.',
    launchDate: pastDate(10), // Launched 10 days ago
    productId: 'ecoharvest-fridge-prod',
    status: 'live',
    submittedBy: 'user-ecowarrior',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  mockLaunch({
    id: 'launch-3',
    name: 'NovaLearn Language App',
    tagline: 'Learn any language with hyper-personalized AI tutors.',
    description: 'NovaLearn adapts to your learning style, pace, and interests. Practice speaking with advanced voice recognition and engage in real-world conversation simulations.',
    launchDate: futureDate(15, 0, 0, 10), // 15 days, 10 seconds from now
    productId: 'novalearn-app-prod',
    status: 'upcoming',
    submittedBy: 'user-polyglot',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
];

export const LaunchListWithFewItems = () => {
  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <LaunchList launches={mockLaunchData} />
      </div>
    </MockProvider>
  );
};

export const EmptyLaunchList = () => {
  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <LaunchList launches={[]} />
      </div>
    </MockProvider>
  );
};

export const LaunchListWithManyItems = () => {
  const manyLaunches = mockLaunches(7).map((launch, index) =>
    mockLaunch({
      ...launch.toObject(), // Get plain object from mock
      id: `many-launch-${index + 1}`,
      name: `Product Launch ${index + 1}: The Next Big Thing`,
      tagline: `An innovative solution for problem #${index + 1}.`,
      description: `This is launch number ${
        index + 1
      }, bringing you the latest advancements in technology and design. Explore its unique features and benefits.`,
      launchDate: index % 2 === 0 ? futureDate(index + 2, index * 2) : pastDate(index + 1),
    })
  );

  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <LaunchList launches={manyLaunches} />
      </div>
    </MockProvider>
  );
};