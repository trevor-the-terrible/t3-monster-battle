import type { MonsterUser, MonsterStats } from '@/app/@types';
import { Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useMemo, type Dispatch, type SetStateAction } from 'react';
import { Stats } from './stats';
import { availableEffects } from './effects';

export const BattleCard = ({
  monster,
  stats,
}: {
  monster: MonsterUser;
  stats?: MonsterStats;
}) => {
  const currentEffectsCss = useMemo(() => {
    const css: string[] = [];

    stats?.effects?.forEach((effectId: string) => {
      const effect = availableEffects.find((effect) => effect.id === effectId);
      if (!effect) {
        console.warn('no effect', effectId);
        return;
      }

      if (effect.css) {
        css.push(effect.css);
      }
    });

    return css;
  }, [Array.from(stats?.effects ?? []).join()]);

  const currentEffects = useMemo(() => {
    const divs: React.JSX.Element[] = [];

    stats?.effects?.forEach((effectId: string) => {
      const effect = availableEffects.find((effect) => effect.id === effectId);
      if (!effect) {
        console.warn('no effect', effectId);
        return;
      }

      if (effect.icon) {
        divs.push(
          <div
            key={effect.id}
            className='border-2 rounded-md p-2 flex justify-center items-center'
          >
            <Icon
              className='h-6 w-6'
              iconNode={effect.icon}
            ></Icon>
          </div>
        );
      }
    });

    return divs;
  }, [Array.from(stats?.effects ?? []).join()]);

  return (
    <div
      className={cn(
        `rounded-md border bg-pink-500 px-4
        py-2
      `,
        ...currentEffectsCss,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={monster?.gifUrl}
        onError={(ev) => {
          ev.currentTarget.src = 'm-backup.jpg';
        }}
        alt={monster?.myname || monster?.name}
        className={cn('h-48 w-48 object-contain', 'drop-shadow-md')}
      />

      <Stats stats={stats} />

      <div className='all-effects flex h-8 w-full flex-row gap-2 justify-center'>
        {currentEffects.map((div) => div)}
      </div>
    </div>
  );
};

export default BattleCard;
