import { Launch } from '@infinity/launches.entities.launch';

/**
 * Defines the type for options that can be passed to the useGetLaunch hook.
 */
export type UseGetLaunchHookOptions = {
  /**
   * If provided, the hook will use this mock Launch data instead of making a network request.
   * The useQuery skip option will be set to true.
   */
  mockData?: Launch;
};