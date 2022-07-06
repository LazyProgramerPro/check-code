/**
 * Asynchronously loads the component for PaymentP2pPage
 */

import { lazyLoad } from 'utils/loadable';

export const PaymentP2pPage = lazyLoad(
  () => import('./index'),
  module => module.PaymentP2pPage,
);
