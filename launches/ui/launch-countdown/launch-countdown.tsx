import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './launch-countdown.module.scss';

/**
 * Props for the LaunchCountdown component.
 */
export type LaunchCountdownProps = {
  /**
   * The target date and time for the countdown, in ISO 8601 format (e.g., "2024-12-31T23:59:59Z").
   * It is crucial that this date string can be correctly parsed by `new Date()`.
   */
  launchDate: string;

  /**
   * An optional title to display above the countdown timer.
   * @default "Countdown to Launch"
   */
  title?: string;

  /**
   * An optional message to display when the countdown reaches zero.
   * @default "🚀 Launched!"
   */
  launchedMessage?: string;

  /**
   * Callback function to be invoked once when the countdown finishes for the current `launchDate`.
   */
  onCountdownEnd?: () => void;

  /**
   * Optional CSS class name for custom styling of the component's root element.
   */
  className?: string;

  /**
   * Optional inline styles for the component's root element.
   */
  style?: React.CSSProperties;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeftInternal = (targetDate: string): TimeLeft & { totalMilliseconds: number } => {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMilliseconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    totalMilliseconds: difference,
  };
};

/**
 * A visually engaging component that displays a countdown timer to a specific launch date.
 * It updates every second and shows a message once the launch time is reached.
 */
export function LaunchCountdown({
  launchDate,
  title = 'Countdown to Launch',
  launchedMessage = '🚀 Launched!',
  onCountdownEnd,
  className,
  style,
}: LaunchCountdownProps): React.JSX.Element {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeftInternal(launchDate));
  const [hasLaunched, setHasLaunched] = useState<boolean>(() => calculateTimeLeftInternal(launchDate).totalMilliseconds <= 0);
  
  const onCountdownEndRef = useRef(onCountdownEnd);
  const calledOnEndRef = useRef(false);

  // Effect to update internal state if the launchDate prop changes
  useEffect(() => {
    const newTimeState = calculateTimeLeftInternal(launchDate);
    setTimeLeft({ days: newTimeState.days, hours: newTimeState.hours, minutes: newTimeState.minutes, seconds: newTimeState.seconds });
    const newHasLaunched = newTimeState.totalMilliseconds <= 0;
    setHasLaunched(newHasLaunched);

    // If the new launchDate means we are counting down again, reset the callback guard
    if (!newHasLaunched) {
      calledOnEndRef.current = false;
    }
  }, [launchDate]);

  // Keep the latest onCountdownEnd callback in a ref
  useEffect(() => {
    onCountdownEndRef.current = onCountdownEnd;
  }, [onCountdownEnd]);

  // Effect to manage the timer and call onCountdownEnd
  useEffect(() => {
    if (hasLaunched) {
      if (onCountdownEndRef.current && !calledOnEndRef.current) {
        onCountdownEndRef.current();
        calledOnEndRef.current = true;
      }
      return undefined; // No timer needed if launched
    }

    // This part runs only if not yet launched
    const timerId = setInterval(() => {
      const newTime = calculateTimeLeftInternal(launchDate);
      setTimeLeft({
        days: newTime.days,
        hours: newTime.hours,
        minutes: newTime.minutes,
        seconds: newTime.seconds,
      });

      if (newTime.totalMilliseconds <= 0) {
        setHasLaunched(true); // This will trigger this effect to re-run and handle the launched state
        clearInterval(timerId); // Stop this specific interval
      }
    }, 2000);

    return () => clearInterval(timerId); // Cleanup interval on unmount or when dependencies change
  }, [launchDate, hasLaunched]); // Re-run if launchDate or hasLaunched changes

  const formatTimeUnit = (value: number): string => String(value).padStart(2, '0');

  if (hasLaunched) {
    return (
      <div className={classNames(styles.launchCountdown, styles.launchedState, className)} style={style} role="status" aria-live="polite">
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.launchedMessage}>{launchedMessage}</div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.launchCountdown, className)} style={style} role="timer" aria-live="assertive" aria-atomic="true">
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.timerWrapper}>
        <div className={styles.timeSegment}>
          <span className={styles.digit} aria-label={`${timeLeft.days} days`}>{formatTimeUnit(timeLeft.days)}</span>
          <span className={styles.label}>Days</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.timeSegment}>
          <span className={styles.digit} aria-label={`${timeLeft.hours} hours`}>{formatTimeUnit(timeLeft.hours)}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.timeSegment}>
          <span className={styles.digit} aria-label={`${timeLeft.minutes} minutes`}>{formatTimeUnit(timeLeft.minutes)}</span>
          <span className={styles.label}>Minutes</span>
        </div>
        <span className={styles.separator} aria-hidden="true">:</span>
        <div className={styles.timeSegment}>
          <span className={styles.digit} aria-label={`${timeLeft.seconds} seconds`}>{formatTimeUnit(timeLeft.seconds)}</span>
          <span className={styles.label}>Seconds</span>
        </div>
      </div>
    </div>
  );
}