import type { Effect } from '@/app/@types';

export const stopEffect = (effect: Effect) => {
  console.log('stopEffect', effect.id, effect.duration);
  effect.onEnd();
};

export const doEffect = (effect: Effect) => {
  console.log('doEffect', effect.id, effect.duration);
  effect.onStart();

  if (effect.duration === 'none') {
    return;
  }

  setTimeout(() => {
    stopEffect(effect);
  }, effect.duration);
};
