import type { Effect } from "@/app/@types";

export const getHealEffect = (stateHook: [boolean, (value: boolean) => void]): Effect<boolean> => {
  const effect: Effect<boolean> = {
    id: 'heal',
    icon: '🩹',
    duration: 1000,
    state: stateHook,
    onStart: () => effect.state?.[1](true),
    onEnd: () => effect.state?.[1](false),
  };

  return effect;
};

export default getHealEffect;
