/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TradeP2PPage = lazyLoad(
  () => import('./index'),
  module => module.TradeP2PPage,
);
