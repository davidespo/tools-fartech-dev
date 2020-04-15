import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import * as models from './models';

import { getPersistor } from '@rematch/persist';

const persistPlugin = createRematchPersist({
  whitelist: ['authUser', 'idUtil'],
  throttle: 1000,
  version: 3,
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

export const persistor = getPersistor();
