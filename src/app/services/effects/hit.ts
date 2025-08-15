import type { Effect } from "@/app/@types";

export const getHitEffect = (stateHook: [boolean, (value: boolean) => void]): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'hit',
    icon: '👊',
    duration: 500,
    state: stateHook,
    onStart: () => effect.state?.[1](true),
    onEnd: () => effect.state?.[1](false),
  };

  return effect;
};

export default getHitEffect;
