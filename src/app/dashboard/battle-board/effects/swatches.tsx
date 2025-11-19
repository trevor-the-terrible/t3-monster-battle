import { cn } from '@/app/utils/styles';
import { heal } from './heal'

// include classes for tailwind to detect at compile-time
export const EffectSwatches = () => {
  return (
    <div
      className={cn(
        'hidden',
        heal.css,
      )}
    ></div>
  );
}
