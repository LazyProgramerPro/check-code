/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const DepositPage = lazyLoad(
  () => import('./index'),
  module => module.DepositPage,
);