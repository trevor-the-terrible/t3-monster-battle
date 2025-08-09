export type Effect<T = any> = {
  id: string;
  icon?: string;
  details?: string;
  // in ms
  duration: number | 'none';
  state: [T, (value: T) => void] | null;
  onStart: () => void;
  onEnd: () => void;
}
