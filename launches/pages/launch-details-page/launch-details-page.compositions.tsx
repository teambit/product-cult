import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Launch, mockLaunch as createMockLaunch } from '@infinity/launches.entities.launch';
import { LaunchDetailsPage } from './launch-details-page.js';

const futureDateISO = (days: number, hours: number = 14, minutes: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

const pastDateISO = (days: number, hours: number = 9, minutes: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

const upcomingLaunchData: Launch = createMockLaunch({
  id: 'project-nova-launch-001',
  name: 'Project Nova: AI Stargazer Assistant',
  tagline: 'Explore the cosmos like never before. Your personal AI guide to the stars.',
  description: `Project Nova is a revolutionary mobile application designed to enhance the amateur astronomy experience. 
It seamlessly integrates with your existing telescope setup (or works standalone) and uses advanced AI algorithms to:
  - Automatically identify stars, planets, constellations, and deep-sky objects.
  - Provide rich, real-time information, historical context, and mythology.
  - Assist with precise telescope alignment and object tracking.
  - Curate personalized "sky tours" based on your location and current celestial events.
  - Offer optimal viewing times for phenomena like meteor showers, eclipses, or planetary alignments.

Join us as we launch into a new era of cosmic discovery! Prepare to be amazed by the universe's wonders, brought closer and made more accessible by Project Nova.
This launch includes:
  * The core mobile application (available for iOS & Android).
  * A companion web portal for planning observing sessions and logging discoveries.
  * Early access to our premium astrophotography enhancement module.
  * Exclusive community forum access for founding members.`,
  launchDate: futureDateISO(15, 18, 0), // 15 days from now, at 6 PM
  status: 'upcoming',
  productId: 'prod-nova-ai-astro-app',
  submittedBy: 'user-GalileoJr-1610',
  createdAt: pastDateISO(45), 
  updatedAt: pastDateISO(2),
});

const alreadyLaunchedData: Launch = createMockLaunch({
  id: 'pixel-pioneer-game-123',
  name: 'Pixel Pioneer: Retro Realms',
  tagline: 'A charming 8-bit adventure RPG that has captured hearts worldwide!',
  description: `Pixel Pioneer: Retro Realms has officially launched and is taking the indie scene by storm! 
Journey through a vibrant world filled with quirky characters, challenging dungeons, and nostalgic pixel art. 
Uncover ancient secrets, craft powerful gear, and build your own village in this epic quest.
Features at Launch (v1.0.5):
  • Expansive overworld with multiple distinct biomes.
  • 10+ challenging dungeons with unique bosses.
  • Deep crafting and village-building system.
  • Engaging storyline with multiple side-quests.
  • Original 8-bit soundtrack.
  • Now with community-requested "New Game+" mode!
Thanks to all our beta testers and early supporters! The adventure begins now!`,
  launchDate: pastDateISO(30, 10, 0), // Launched 30 days ago at 10 AM
  status: 'live',
  productId: 'game-pixelpioneer-rpg',
  submittedBy: 'user-8bitBard-2023',
  createdAt: pastDateISO(120),
  updatedAt: pastDateISO(28), // Minor patch 2 days after launch
});

export const UpcomingLaunchDetailsPage = () => (
  <MockProvider>
    <Routes>
      <Route path="/launch/:launchId" element={<LaunchDetailsPage mockLaunchData={upcomingLaunchData} />} />
    </Routes>
    <Navigate to={`/launch/${upcomingLaunchData.id}`} replace />
  </MockProvider>
);

export const PastLaunchDetailsPage = () => (
  <MockProvider>
    <Routes>
      <Route path="/launch/:launchId" element={<LaunchDetailsPage mockLaunchData={alreadyLaunchedData} />} />
    </Routes>
    <Navigate to={`/launch/${alreadyLaunchedData.id}`} replace />
  </MockProvider>
);

export const LaunchDetailsPageErrorState = () => (
  <MockProvider>
    <Routes>
      {/* This route configuration ensures `launchId` from `useParams` will be undefined */}
      <Route path="/some/other/path/without/id" element={<LaunchDetailsPage />} />
    </Routes>
    {/* Navigate to the path where LaunchDetailsPage is rendered without a launchId in params and no mock data */}
    <Navigate to="/some/other/path/without/id" replace />
  </MockProvider>
);