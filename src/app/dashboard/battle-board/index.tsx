'use client';

import { BattleCard } from './battle-card';
import { useState, useEffect } from 'react';
import { BattleClock } from './battle-clock';
import type { MonsterUser, MonsterStats } from '@/app/@types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { BattleBg } from '@/app/dashboard/battle-board/battle-bg';
import { BattleButton } from '@/app/dashboard/battle-board/battle-button';
import { applyEffect, removeEffect, EffectSwatches } from './effects';

export function BattleBoard({
  user,
  cpu,
}: {
  user: MonsterUser;
  cpu: MonsterUser;
}) {
  const [userStats, setUserStats] = useState<MonsterStats>(initMonsterStats());
  const [cpuStats, setCpuStats] = useState<MonsterStats>(initMonsterStats());

  const battleClock = BattleClock({
    user: {
      id: user.id,
      stats: userStats,
      setStats: setUserStats,
    },
    cpu: {
      id: cpu.id,
      stats: cpuStats,
      setStats: setCpuStats,
    },
  });

  const onStartClick = () => {
    battleClock.start();
  };

  useEffect(() => {
    onStartClick();
  }, []);

  const hitAnimationInlineCss = `
    .battle-image-shake {
      animation: shake 0.5s ease-in-out infinite;
    }

    .battle-image-violent-shake {
      animation: violentShake 0.1s ease-in-out infinite;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }

    @keyframes violentShake {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      10% { transform: translate(-3px, -1px) rotate(-1deg); }
      20% { transform: translate(3px, 2px) rotate(1deg); }
      30% { transform: translate(-2px, 1px) rotate(0deg); }
      40% { transform: translate(2px, -2px) rotate(1deg); }
      50% { transform: translate(-1px, 3px) rotate(-1deg); }
      60% { transform: translate(1px, -1px) rotate(0deg); }
      70% { transform: translate(-3px, 2px) rotate(-1deg); }
      80% { transform: translate(3px, -3px) rotate(1deg); }
      90% { transform: translate(-1px, 1px) rotate(0deg); }
    }
  `;

  return (
    <Card className='relative w-full overflow-hidden bg-violet-300'>
      <style>{hitAnimationInlineCss}</style>
      <EffectSwatches />

      <BattleBg />

      <CardHeader className='z-10'>
        <CardTitle className='text-center text-xl'>
          <strong className='text-2xl'>{user.myname}</strong> <em>vs</em> <strong className='text-2xl'>{cpu.name}</strong>
        </CardTitle>
      </CardHeader>

      <CardContent
        className='
          z-10 flex flex-row items-center justify-evenly gap-2
        '
      >
        <BattleCard
          monster={user}
          stats={userStats}
        />

        <div className='flex flex-row items-center justify-center gap-2'>
          &nbsp;
        </div>

        <BattleCard
          monster={cpu}
          stats={cpuStats}
        />
      </CardContent>

      <CardFooter className='z-10 flex flex-row items-center justify-center gap-2'>
        <BattleButton
          variant='neutral'
          cooldown={5000}
          onCooldownStart={() => {
            applyEffect('boost', userStats, setUserStats);
          }}
          onCooldownEnd={() => {
            removeEffect('boost', userStats, setUserStats);
          }}
        >
          Boost
        </BattleButton>

        <BattleButton
          variant='neutral'
          cooldown={10 * 1000}
          disabled={userStats.hp >= userStats.maxHp}
          onCooldownStart={() => {
            applyEffect('heal', userStats, setUserStats);
          }}
        >
          Heal
        </BattleButton>
      </CardFooter>
    </Card>
  );
}

const initMonsterStats = (stats?: MonsterStats) => {
  return {
    ...stats,
    hp: 25,
    maxHp: 25,
    speed: 1000,
    dmg: [1, 10] as [number, number],
    def: 1,
    hit: 1,
    evasion: 1,
    power: 1,
    effects: new Set<string>(),
  };
};
