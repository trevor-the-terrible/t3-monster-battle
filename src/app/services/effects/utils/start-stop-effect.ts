import type { Effect } from '@/app/@types';

export const stopEffect = <T = unknown>(effect: Effect<T>) => {
  console.log('stopEffect', effect.id, effect.duration);
  effect.onEnd?.();
};

export const doEffect = <T = unknown>(effect: Effect<T>) => {
  effect.onStart?.();

  if (effect.duration === 'none') {
    return;
  }

  setTimeout(() => {
    stopEffect(effect);
  }, effect.duration);
};
