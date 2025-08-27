import { coconut } from '@lucide/lab';
// import { TruckElectric } from 'lucide-react';
import type { MonsterStats } from '@/app/@types';

export type EffectAlt = {
  id: string;
  css: string;
  duration: number | 'manual';
  baseValue?: number;
  applyToMainPanel?: boolean;
  icon?: typeof coconut;
  applyEffect: (stats: MonsterStats) => void;
  removeEffect: (stats: MonsterStats) => void;
};
