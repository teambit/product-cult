import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockLaunch } from '@infinity/launches.entities.launch';
import { LaunchCard } from './launch-card.js';

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
  padding: 'var(--spacing-x-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-x-large)',
  alignItems: 'center',
  background: 'var(--colors-surface-background)',
  minHeight: '100vh',
};

const cardContainerStyle: React.CSSProperties = {
  maxWidth: '400px',
  width: '100%',
};

export const BasicLaunchCardUpcoming = () => {
  const launchData = mockLaunch({
    name: 'EcoPlanner Pro',
    tagline: 'Sustainable planning for a greener future.',
    description:
      'EcoPlanner Pro helps you organize your tasks and projects with a focus on sustainability. Track your carbon footprint, discover eco-friendly alternatives, and contribute to a healthier planet. This is a long description to test truncation. This is a long description to test truncation. This is a long description to test truncation.',
    launchDate: futureDate(5, 3, 30), // 5 days, 3 hours, 30 minutes from now
    id: 'ecoplanner-pro-123',
  });

  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <div style={cardContainerStyle}>
          <LaunchCard launch={launchData} />
        </div>
      </div>
    </MockProvider>
  );
};

export const LaunchCardWithCustomImageAndText = () => {
  const launchData = mockLaunch({
    name: 'Aura Smart Garden',
    tagline: 'Grow fresh herbs and vegetables effortlessly indoors.',
    description:
      'Aura Smart Garden uses AI-powered hydroponics to automate watering, lighting, and nutrient delivery. Enjoy fresh produce year-round, right in your kitchen. Perfect for urban dwellers and gardening enthusiasts alike. Experience the future of home gardening.',
    launchDate: futureDate(10, 0, 0, 15), // 10 days, 15 seconds from now
    id: 'aura-garden-456',
  });

  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <div style={cardContainerStyle}>
          <LaunchCard
            launch={launchData}
            imageUrl="https://images.unsplash.com/photo-1583312605516-4d11f1acbdd0?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwbGF1bmNoJTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk5MjU4fDA&ixlib=rb-4.1.0"
            imageAlt="Lush green plants growing in an innovative indoor garden system."
            viewLaunchText="Explore Aura Garden"
          />
        </div>
      </div>
    </MockProvider>
  );
};

export const PastLaunchCard = () => {
  const launchData = mockLaunch({
    name: 'PixelBeat Earbuds',
    tagline: 'Immersive sound, iconic design.',
    description:
      'PixelBeat Earbuds deliver crystal-clear audio and deep bass in a sleek, comfortable package. Featuring active noise cancellation and long-lasting battery life. These earbuds have already launched and are available for purchase.',
    launchDate: pastDate(7), // Launched 7 days ago
    id: 'pixelbeat-789',
  });

  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <div style={cardContainerStyle}>
          <LaunchCard
            launch={launchData}
            imageUrl="https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwbGF1bmNoJTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk5MjU4fDA&ixlib=rb-4.1.0"
            imageAlt="White wireless earbuds in their charging case."
            viewLaunchText="Check Out PixelBeat"
          />
        </div>
      </div>
    </MockProvider>
  );
};

export const LaunchCardWithShortDescription = () => {
  const launchData = mockLaunch({
    name: 'QuickNote AI',
    tagline: 'Note-taking, simplified by AI.',
    description:
      'QuickNote AI captures your thoughts instantly and organizes them intelligently. Your new productivity companion.',
    launchDate: futureDate(0, 1, 5), // 1 hour, 5 minutes from now
    id: 'quicknote-ai-001',
  });

  return (
    <MockProvider>
      <div style={compositionWrapperStyle}>
        <div style={cardContainerStyle}>
          <LaunchCard
            launch={launchData}
            imageUrl="https://images.unsplash.com/photo-1615215271299-608ada121f72?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw3fHxwcm9kdWN0JTIwbGF1bmNoJTIwaW5ub3ZhdGlvbnxlbnwxfDJ8fG9yYW5nZXwxNzQ5NTk5MjU5fDA&ixlib=rb-4.1.0"
            imageAlt="A bright yellow phone on a polka dot background, symbolizing quick notes."
            viewLaunchText="Discover QuickNote"
          />
        </div>
      </div>
    </MockProvider>
  );
};