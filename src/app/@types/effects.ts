import type { Dispatch, SetStateAction } from 'react';

export type Effect<T = unknown> = {
  id: string;
  icon?: string;
  details?: string;
  duration: number | 'none';
  onStart?: () => void;
  onEnd?: () => void;
  state?: [T, Dispatch<SetStateAction<T>>];
}
