import { ComponentType } from 'react';
import { Launch } from '@infinity/launches.entities.launch';

export type LaunchActionType = {
  /**
   * name of the launch.
   */
  name: string;

  /**
   * component to render.
   */
  component: ComponentType<{ launch: Launch }>;
};
