import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { LaunchCountdown } from './launch-countdown.js';
import { mockLaunch } from '@infinity/launches.entities.launch';

const futureDate = (secondsToAdd: number): string => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + secondsToAdd);
  return date.toISOString();
};

const pastDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

export const BasicLaunchCountdown = () => {
  const launch = mockLaunch({
    name: "Nebula Explorer App",
    launchDate: futureDate(3600 * 24 * 3 + 3600 * 5 + 60 * 30 + 15), // 3 days, 5 hours, 30 minutes, 15 seconds
  });

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)', alignItems: 'center', background: 'var(--colors-surface-background)', minHeight: '100vh' }}>
        <h2 style={{ color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)' }}>{launch.name} Launch</h2>
        <LaunchCountdown
          launchDate={launch.launchDate}
          title={`Launching ${launch.name}!`}
          onCountdownEnd={() => console.log(`${launch.name} has launched!`)}
        />
      </div>
    </MockProvider>
  );
};

export const CustomMessagesCountdown = () => {
  const launch = mockLaunch({
    name: "QuantumLeap AI Platform",
    launchDate: futureDate(60 * 10), // 10 minutes
  });

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)', alignItems: 'center', background: 'var(--colors-surface-background)',  minHeight: '100vh' }}>
        <LaunchCountdown
          launchDate={launch.launchDate}
          title="Get Ready for QuantumLeap AI!"
          launchedMessage="🎉 QuantumLeap AI is LIVE! Explore Now! 🎉"
          onCountdownEnd={() => alert('QuantumLeap AI is officially live!')}
        />
      </div>
    </MockProvider>
  );
};

export const AlreadyLaunchedState = () => {
  const launch = mockLaunch({
    name: "Retro Game Emulator",
    launchDate: pastDate(),
  });

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)', alignItems: 'center', background: 'var(--colors-surface-background)',  minHeight: '100vh' }}>
        <LaunchCountdown
          launchDate={launch.launchDate}
          title={`${launch.name} - Previous Launch`}
          launchedMessage="This Rocket Has Already Blasted Off!"
          onCountdownEnd={() => console.log('Callback for already launched item triggered on mount.')}
        />
      </div>
    </MockProvider>
  );
};

export const ShortCountdownToLaunch = () => {
  const launch = mockLaunch({
    name: "Project Phoenix",
    launchDate: futureDate(7), // 7 seconds from now
  });

  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-large)', alignItems: 'center', background: 'var(--colors-surface-background)',  minHeight: '100vh' }}>
         <h2 style={{ color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)' }}>Project Phoenix - Imminent Launch!</h2>
        <LaunchCountdown
          launchDate={launch.launchDate}
          title="Brace for Impact: Project Phoenix"
          launchedMessage="🚀 PHOENIX HAS RISEN! 🚀"
          onCountdownEnd={() => console.log('Project Phoenix launch sequence complete!')}
        />
        <p style={{ color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)', textAlign: 'center'}}>
          Watch closely! This countdown will finish in a few seconds.
        </p>
      </div>
    </MockProvider>
  );
};