import type { Effect } from '@/app/@types';
import type { Dispatch, SetStateAction } from 'react';

export const getHitEffect = (
  stateHook: [boolean, Dispatch<SetStateAction<boolean>>],
  _effect?: Effect<boolean>,
): Effect<boolean> => {
  const effect: Effect<boolean> = _effect ?? getHitEffectNoState();

  effect.state = stateHook;
  effect.onStart = () => effect.state?.[1](true);
  effect.onEnd = () => effect.state?.[1](false);

  return effect;
};

export const getHitEffectNoState = (): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'hit',
    icon: '👊',
    duration: 100,
  };

  return effect;
};

export default getHitEffect;
