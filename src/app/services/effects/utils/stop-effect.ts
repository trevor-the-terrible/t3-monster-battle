import type { Effect } from "@/app/@types";

const stopEffect = (effect: Effect) => {
  console.log('stopEffect', effect.id, effect.duration);
  effect.onEnd();
}

export default stopEffect;
