import { crossSquare } from '@lucide/lab';
import type { EffectAlt } from './@types';
import type { MonsterStats } from '@/app/@types';

export const heal: EffectAlt = {
  id: 'heal',
  // append to effect swatches tsx
  css: 'bg-blue-300 border-blue-900',
  duration: 1500,
  baseValue: 10,
  applyEffect: (stats: MonsterStats) => {
    stats.effects.add('heal');
    stats.hp += heal.baseValue ?? 0;
    stats.hp = Math.min(stats.hp, stats.maxHp);
  },
  removeEffect: (stats: MonsterStats) => {
    stats.effects.delete('heal');
  },
  icon: crossSquare,
};
