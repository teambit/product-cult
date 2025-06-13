import { render, waitFor } from '@testing-library/react';
import { LaunchCountdown } from './launch-countdown.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import styles from './launch-countdown.module.scss';

const futureDate = (secondsToAdd: number): string => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + secondsToAdd);
  return date.toISOString();
};

describe('LaunchCountdown', () => {
  it('should display the countdown timer', async () => {
    const launchDate = futureDate(3);
    const { container } = render(
      <MockProvider>
        <LaunchCountdown launchDate={launchDate} />
      </MockProvider>
    );

    await waitFor(() => {
      const timerWrapper = container.querySelector(`.${styles.timerWrapper}`);
      expect(timerWrapper).toBeInTheDocument();
    });
  });

  it('should display the launched message when the launch date has passed', () => {
    const launchDate = new Date(Date.now() - 1000).toISOString();
    const launchedMessage = 'Launched!';
    const { container } = render(
      <MockProvider>
        <LaunchCountdown launchDate={launchDate} launchedMessage={launchedMessage} />
      </MockProvider>
    );

    const launchedMessageElement = container.querySelector(`.${styles.launchedMessage}`);
    expect(launchedMessageElement).toHaveTextContent(launchedMessage);
  });
});