export * from './utils';

export * from './heal';
export * from './boost';
export * from './hit';

import * as heal from './heal';
import * as boost from './boost';
import * as hit from './hit';

export const effects = [
  heal.getHealEffectNoState(),
  boost.getBoostEffectNoState(),
  hit.getHitEffectNoState(),
];
