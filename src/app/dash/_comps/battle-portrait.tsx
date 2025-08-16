import type { Effect, Monster, MonsterUser } from '@/app/@types';
import type { BattleEvent } from './battle-engine';
import * as effects from '@/app/services/effects';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BattlePortrait({
  monsterUser,
  onEventHook,
}: {
  monsterUser: MonsterUser;
  onEventHook: (onEvent: (event: BattleEvent) => void) => void;
}) {
  const healEffect = effects.getHealEffect(useState<boolean>(false));
  const boostEffect = effects.getBoostEffect(useState<boolean>(false));
  const hitEffect = effects.getHitEffect(useState<boolean>(false));
  // const [effectLookup, setEffectLookup] = useState<Map<string, Effect>>(new Map());
  const boostCss = useMemo(() => {
    return boostEffect.state?.[0] ? 'animate-pulse' : '-';
  }, [boostEffect.state]);
  const healCss = useMemo(() => {
    return healEffect.state?.[0] ? 'animate-bounce' : '-';
  }, [healEffect.state]);
  const hitCss = useMemo(() => {
    return hitEffect.state?.[0] ? 'battle-image-violent-shake' : '-';
  }, [hitEffect.state]);
  const lookup = new Map<string, Effect>([
    ['heal', healEffect],
    ['boost', boostEffect],
    ['hit', hitEffect]
  ]);
  onEventHook(() => {
    return (event: BattleEvent) => {
      const effect = lookup.get(event.event);
      if (!effect) {
        console.warn('missing effect', event.event);
        return;
      }
      return effect;
    };
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={monsterUser?.gifUrl}
      alt={monsterUser.name}
      className={cn(
        'w-48 h-48 object-contain',
        'transform-gpu transition-all duration-300',
        boostCss,
        healCss,
        hitCss,
      )}
    />
  );
}
