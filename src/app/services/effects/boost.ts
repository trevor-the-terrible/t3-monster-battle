import type { Effect } from '@/app/@types';
import type { Dispatch, SetStateAction } from 'react';

export const getBoostEffect = (
  stateHook: [boolean, Dispatch<SetStateAction<boolean>>],
  _effect?: Effect<boolean>,
): Effect<boolean> => {
  const effect: Effect<boolean> = _effect ?? getBoostEffectNoState();

  effect.state = stateHook;
  effect.onStart = () => effect.state?.[1](true);
  effect.onEnd = () => effect.state?.[1](false);

  return effect;
};

export const getBoostEffectNoState = (): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'boost',
    icon: '⏩',
    duration: 'none',
  };

  return effect;
};

export default getBoostEffect;
