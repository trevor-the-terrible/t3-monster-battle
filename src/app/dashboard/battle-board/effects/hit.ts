import type { EffectAlt } from './@types';
import type { MonsterStats } from '@/app/@types';

export const hit: EffectAlt = {
  id: 'hit',
  css: 'battle-image-shake',
  duration: 500,

  // noop
  applyEffect: (stats: MonsterStats) => {},
  removeEffect: (stats: MonsterStats) => {},
};
