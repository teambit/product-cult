import { Launch } from '@infinity/launches.entities.launch';

/**
 * Defines the type for options that can be passed to the useListLaunches hook.
 */
export type UseListLaunchesHookOptions = {
  /**
   * If provided, the hook will use this mock Launch array data instead of making a network request.
   * The useQuery skip option will be set to true.
   */
  mockData?: Launch[];
};