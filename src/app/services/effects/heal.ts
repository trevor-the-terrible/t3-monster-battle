import type { Effect } from '@/app/@types';
import type { Dispatch, SetStateAction } from 'react';

export const getHealEffect = (
  stateHook: [boolean, Dispatch<SetStateAction<boolean>>],
  _effect?: Effect<boolean>,
): Effect<boolean> => {
  const effect: Effect<boolean> = _effect ?? getHealEffectNoState();

  effect.state = stateHook;
  effect.onStart = () => effect.state?.[1](true);
  effect.onEnd = () => effect.state?.[1](false);

  return effect;
};

export const getHealEffectNoState = (): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'heal',
    icon: '🩹',
    duration: 1000,
  };

  return effect;
};

export default getHealEffect;
