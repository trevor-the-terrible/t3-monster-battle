import { cn } from '@/app/utils/styles';
import { heal } from './heal'

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
