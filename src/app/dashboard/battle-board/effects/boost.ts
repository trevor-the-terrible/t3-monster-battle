import { sneaker } from '@lucide/lab';
// import { TruckElectric } from 'lucide-react';
import type { EffectAlt } from './@types';
import type { MonsterStats } from '@/app/@types';

export const boost: EffectAlt = {
  id: 'boost',
  css: '',
  duration: 'manual',
  icon: sneaker,
  applyEffect: (stats: MonsterStats) => {
    stats.effects.add('boost');
    stats.speed += 500;
  },
  removeEffect: (stats) => {
    stats.effects.delete('boost');
    stats.speed -= 500;
  },
};
