/**
 * Asynchronously loads the component for PostAdP2P
 */

import { lazyLoad } from 'utils/loadable';

export const PostAdP2P = lazyLoad(
  () => import('./index'),
  module => module.PostAdP2P,
);
