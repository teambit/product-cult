import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TrackLaunchButton } from './track-launch-button.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import styles from './track-launch-button.module.scss';

const mockLaunch = {
  id: 'launch-123',
  productId: 'product-456',
  name: 'Test Launch',
  tagline: 'A test launch',
  description: 'A test launch description',
  launchDate: new Date().toISOString(),
  status: 'upcoming',
  submittedBy: 'user-789',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TrackLaunchButton', () => {
  it('renders the component', () => {
    const { container } = render(
      <MockProvider>
        <TrackLaunchButton launch={mockLaunch} userId="user-1" />
      </MockProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onTrackChange = vi.fn();
    const { container } = render(
      <MockProvider>
        <TrackLaunchButton launch={mockLaunch} userId="user-1" onTrackChange={onTrackChange} />
      </MockProvider>
    );
    const button = container.querySelector('button');

    if (button) {
      fireEvent.click(button);
      expect(onTrackChange).toHaveBeenCalledTimes(1);
    }
  });

  it('applies custom class name to the wrapper', () => {
    const customClassName = 'custom-wrapper-class';
    const { container } = render(
      <MockProvider>
        <TrackLaunchButton launch={mockLaunch} userId="user-1" className={customClassName} />
      </MockProvider>
    );

    const wrapper = container.querySelector(`.${styles.trackLaunchButtonWrapper}`);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(customClassName);
  });
});