import React from 'react';
import { MockProvider } from "@infinity/product-hunt-platform.testing.mock-provider";
import { UpvotesDashboardPanel } from './upvotes-dashboard-panel.js';

const commonPanelStyle: React.CSSProperties = {
  maxWidth: '400px',
  margin: '20px auto',
};

/**
 * Demonstrates the UpvotesDashboardPanel in its default state.
 * The data displayed (count, user upvote status) will depend on the
 * behavior of the `useUpvote` hook within the MockProvider environment.
 * It will likely show a loading or error state for the upvote data.
 */
export const DefaultPanelState = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
      <UpvotesDashboardPanel
        itemId="product-101"
        itemType="product"
        style={commonPanelStyle}
      />
    </div>
  </MockProvider>
);

/**
 * Demonstrates the UpvotesDashboardPanel with a custom title and background image.
 * This showcases the visual customization options of the panel.
 * The upvote data will likely be in a loading or error state.
 */
export const CustomizedPanelDisplay = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
      <UpvotesDashboardPanel
        itemId="launch-202"
        itemType="launch"
        title="Launch Performance"
        backgroundImageUrl="https://images.unsplash.com/photo-1604434218929-a5531054e25f?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxncm93dGglMjBzdGF0aXN0aWNzJTIwZGFzaGJvYXJkfGVufDF8MHx8b3JhbmdlfDE3NDk4MjMxNjJ8MA&ixlib=rb-4.1.0" // "Upward"
        style={commonPanelStyle}
        className="custom-panel-class"
      />
    </div>
  </MockProvider>
);

/**
 * Demonstrates the UpvotesDashboardPanel for a different item, potentially showing
 * how it handles various item IDs or types.
 * Features a different background and title.
 * The upvote data will likely be in a loading or error state.
 */
export const PanelForAnotherItem = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)', backgroundColor: 'var(--colors-surface-background)' }}>
      <UpvotesDashboardPanel
        itemId="article-303"
        itemType="article"
        title="Article Engagement"
        backgroundImageUrl="https://images.unsplash.com/photo-1601043081615-d6fb3fada413?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxncm93dGglMjBzdGF0aXN0aWNzJTIwZGFzaGJvYXJkfGVufDF8MHx8b3JhbmdlfDE3NDk4MjMxNjJ8MA&ixlib=rb-4.1.0" // "yellow and white painted wall"
        style={commonPanelStyle}
      />
    </div>
  </MockProvider>
);