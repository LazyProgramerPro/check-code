/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const P2PUserCenterPage = lazyLoad(
  () => import('./index'),
  module => module.P2PUserCenterPage,
);
