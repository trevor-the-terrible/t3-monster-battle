import type { Effect } from "@/app/@types";

export const getBoostEffect = (stateHook: [boolean, (value: boolean) => void]): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'boost',
    icon: '⏩',
    duration: 'none',
    state: stateHook,
    onStart: () => effect.state?.[1](true),
    onEnd: () => effect.state?.[1](false),
  };

  return effect;
};

export default getBoostEffect;
