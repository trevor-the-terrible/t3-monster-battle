import { coconut } from '@lucide/lab';
import type { MonsterStats } from '@/app/@types';

export type EffectAlt = {
  id: string;
  css: string;
  duration: number | 'manual';
  baseValue?: number;
  icon?: typeof coconut;
  applyEffect: (stats: MonsterStats) => void;
  removeEffect: (stats: MonsterStats) => void;
};
