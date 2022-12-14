/**
 *
 * Asynchronously loads the component for ProductsList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
