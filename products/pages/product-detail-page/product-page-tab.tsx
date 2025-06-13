import { ComponentType } from 'react';

export type ProductPageTab = {
  name: string;
  component?: ComponentType<{ productId: string }>;
};
