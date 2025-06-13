import React from 'react';
import { render } from '@testing-library/react';
import { LaunchList } from './launch-list.js';
import { mockLaunch } from '@infinity/launches.entities.launch';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import styles from './launch-list.module.scss';

describe('LaunchList', () => {
  it('should render "No launches to display" message when launches array is empty', () => {
    const { container, getByText } = render(
      <MockProvider>
        <LaunchList launches={[]} />
      </MockProvider>
    );

    const emptyStateContainer = container.querySelector(`.${styles.emptyStateContainer}`);
    expect(emptyStateContainer).toBeInTheDocument();

    // Check for the main message
    expect(getByText('No launches to display at the moment.')).toBeInTheDocument();
    // Check for the subtext
    expect(getByText('Check back later for new and exciting product launches!')).toBeInTheDocument();
  });

  it('should render a list of LaunchCard components when launches array is not empty', () => {
    const mockLaunchesData = [mockLaunch({ id: '1' }), mockLaunch({ id: '2' })];

    const { container } = render(
      <MockProvider>
        <LaunchList launches={mockLaunchesData} />
      </MockProvider>
    );
    const launchListGrid = container.querySelector(`.${styles.launchListGrid}`);
    expect(launchListGrid).toBeInTheDocument(); // Ensure the grid container itself is rendered

    // Check that the grid has the correct number of direct children,
    // which should be the LaunchCard components.
    if (launchListGrid) {
      expect(launchListGrid.children.length).toBe(mockLaunchesData.length);
    }
    // If launchListGrid is null, the previous expect(launchListGrid).toBeInTheDocument() would have failed.
  });

  it('should apply a custom CSS class name to the list', () => {
    const mockLaunchesData = [mockLaunch({ id: '1' })];
    const customClassName = 'custom-list-class';
    const { container } = render(
      <MockProvider>
        <LaunchList launches={mockLaunchesData} className={customClassName} />
      </MockProvider>
    );

    const launchListGrid = container.querySelector(`.${styles.launchListGrid}.${customClassName}`);
    expect(launchListGrid).toBeInTheDocument();
  });
});