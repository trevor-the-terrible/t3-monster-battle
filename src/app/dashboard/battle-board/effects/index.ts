export type * from './@types';

export * from './boost';
export * from './heal';
export * from './hit';

import { boost } from './boost';
import { heal } from './heal';
import { hit } from './hit';

export const availableEffects = [boost, heal, hit];
export * from './swatches';

import type { MonsterStats } from '@/app/@types';

export const applyEffect = (
  effectId: string,
  stats: MonsterStats,
  setStats: (stats: MonsterStats) => void,
) => {
  const effect = availableEffects.find(ef => ef.id === effectId);
  if (!effect) {
    return;
  }

  stats.effects.add(effect.id);
  effect.applyEffect(stats);
  setStats({ ...stats });

  if (effect.duration === 'manual') {
    return;
  }

  setTimeout(() => {
    stats.effects.delete(effect.id);
    setStats({ ...stats });
  }, effect.duration);
};

export const removeEffect = (
  effectId: string,
  stats: MonsterStats,
  setStats: (stats: MonsterStats) => void,
) => {
  const effect = availableEffects.find(ef => ef.id === effectId);
  if (!effect) {
    return;
  }

  // stats.effects.add(effect.id);
  effect.removeEffect(stats);
  setStats({ ...stats });
};
