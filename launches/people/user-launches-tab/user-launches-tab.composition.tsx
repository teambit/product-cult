import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserLaunchesTab } from './user-launches-tab.js';
// Import Launch and mock data utilities from the entities package
import { Launch, mockLaunch } from '@infinity/launches.entities.launch';

// Helper to create some mock launch data
const createMockLaunches = (count: number): Launch[] => {
  return Array.from({ length: count }, (_, i) =>
    mockLaunch({ 
      id: `mock-launch-${i + 1}`,
      name: `Simulated Launch ${i + 1}`,
      tagline: `This is a cool tagline for launch ${i + 1}.`,
      description: `Detailed description for simulated launch number ${i + 1}. It's going to be great!`,
      launchDate: new Date().toISOString(),
      status: i % 2 === 0 ? 'live' : 'upcoming',
      productId: `prod-${i + 1}`,
      submittedBy: `user-simulated-data`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  );
};


const CompositionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    padding: 'var(--spacing-large, 24px)',
    backgroundColor: 'var(--colors-surface-background, #f8f9fa)',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {children}
  </div>
);

export const UserLaunchesTabDisplaysData = () => (
  <MockProvider>
    <CompositionWrapper>
      <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
        User Launches: With Data
      </h3>
      <UserLaunchesTab
        userId="user-simulated-data"
        launches={createMockLaunches(3)}
        loading={false}
        error={null}
      />
    </CompositionWrapper>
  </MockProvider>
);

export const UserLaunchesTabDisplaysEmptyState = () => (
  <MockProvider>
    <CompositionWrapper>
      <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
        User Launches: Empty State
      </h3>
      <UserLaunchesTab
        userId="user-simulated-empty"
        launches={[]}
        loading={false}
        error={null}
      />
    </CompositionWrapper>
  </MockProvider>
);

export const UserLaunchesTabDisplaysLoadingState = () => (
  <MockProvider>
    <CompositionWrapper>
      <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
        User Launches: Loading State
      </h3>
      <UserLaunchesTab
        userId="user-simulated-loading"
        loading={true}
      />
    </CompositionWrapper>
  </MockProvider>
);

export const UserLaunchesTabDisplaysErrorState = () => (
  <MockProvider>
    <CompositionWrapper>
      <h3 style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>
        User Launches: Error State
      </h3>
      <UserLaunchesTab
        userId="user-simulated-error"
        error={new Error("Simulated error fetching launches.")}
        loading={false}
      />
    </CompositionWrapper>
  </MockProvider>
);