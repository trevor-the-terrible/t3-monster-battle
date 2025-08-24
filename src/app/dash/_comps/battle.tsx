import type { Monster, MonsterUser, Buff, Effect, BaseStats } from '@/app/@types';
import { cn } from '@/app/utils/styles';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BattleButton } from './battle-button';
import { useState, useMemo, useEffect, type Dispatch, type SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import * as effects from '@/app/services/effects';
import { doEffect, stopEffect } from '@/app/services/effects';
import { startBattle, type BattleEvent } from './battle-engine';
import { Stats } from './stats';

export default function Battle({
  monsterUser,
  monster,
  details,
}: {
  monsterUser: MonsterUser;
  monster: MonsterUser;
  details: {
    buffs: Buff[];
    debuffs: Buff[];
  };
}) {
  const [userCss, setUserCss] = useState<string>('');
  const [cpuCss, setCpuCss] = useState<string>('');
  const [userStats, setUserStats] = useState(monsterUser.currentStats);
  const [cpuStats, setCpuStats] = useState(monsterUser.currentStats);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    onStartClick();
  }, []);
  const onStartClick = () => {
    if (started) {
      return;
    }

    setStarted(true);

    const setStatsByMonster = (monsterId:string|number, stats:BaseStats) => {
      if (monsterId === monsterUser.id) {
        setUserStats(stats);
        return;
      }
      setCpuStats(stats);
    };
    const setCssByMonster = (monsterId:string|number, css:string) => {
      if (monsterId === monsterUser.id) {
        setUserCss(css);
        return;
      }
      setCpuCss(css);
    };
    const getCssByMonster = (monsterId:string|number) => {
      if (monsterId === monsterUser.id) {
        return userCss;
      }
      return cpuCss;
    };

    startBattle(monsterUser, monster, (be:BattleEvent) => {
      const effect = effects.effects.find(ef => ef.id = be.event);
      if (!effect) {
        return;
      }

      if (be.event === 'over') {
        setStarted(false);
        return;
      }

      if (effect.id === 'hit') {
        // add animation
        setCssByMonster(be.monsterTo.id, 'battle-image-shake');

        if (effect.duration === 'none') {
          return console.warn('effect:duration:none');
        }

        // unset animation
        setTimeout(() => {
          const css = getCssByMonster(be.monsterTo.id).replace('battle-image-shake', '').trim();
          setCssByMonster(be.monsterTo.id, css);
        }, effect.duration);
        return;
      }

      setStatsByMonster(be.monsterFrom.id, be.monsterFrom.currentStats);
      setStatsByMonster(be.monsterTo.id, be.monsterTo.currentStats);
    });
  };

  const healEffect = effects.getHealEffect(useState<boolean>(false));
  const boostEffect = effects.getBoostEffect(useState<boolean>(false));
  const boostCssUser = useMemo(() => {
    return boostEffect.state?.[0] ? 'animate-bounce' : '-';
  }, [boostEffect.state]);
  const healCssUser = useMemo(() => {
    return healEffect.state?.[0] ? 'animate-spin' : '-';
  }, [healEffect.state]);

  const onConcede = () => {
    const confirmed = confirm('Concede?');
    if (!confirmed) {
      return;
    }
  };

  const hitAnimationCss = `
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
    <Card className="bg-violet-300 w-full">
      <style>{hitAnimationCss}</style>

      <CardHeader>
        <CardTitle className="text-center">
          <strong>{monsterUser.myname}</strong> vs <strong>{monster.name}</strong>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-row gap-2 items-center justify-evenly">
          <li
            className={cn(
              boostCssUser,
              healCssUser,
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={monsterUser?.gifUrl}
              onError={(ev) => {
                ev.currentTarget.src = 'm-backup.jpg';
              }}
              alt={monsterUser.myname}
              className={cn(
                'w-48 h-48 object-contain',
                'transform-gpu transition-all duration-300',
                userCss,
                // ...monsterUser.effects.map(e => e.css),
              )}
            />

            <Stats
              stats={userStats}
            />
          </li>

          <li>
            {/* <div className="
              -animate-bounce
              text-9xl
              flex flex-col items-center justify-center
            ">
              <div className="relative w-44">
                <span className="absolute">⚡</span>
                <span className="absolute">VS</span>
                &nbsp;
              </div>
            </div> */}

            <div className="
              animate-pulse
              text-8xl
              flex flex-col items-center justify-center
              p-12 overflow-hidden
              max-w-8
            ">
              <span className="relative">
                ⚡
                <span className="absolute top-0 left-0 animate-ping">⚡</span>

                {/* <span className="absolute -top-2 -left-2 text-yellow-400 animate-bounce w-[2px] h-[2px]">
                  ✨
                </span> */}
              </span>
            </div>
          </li>

          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={monster?.gifUrl}
              onError={(ev) => {
                ev.currentTarget.src = 'm-backup.jpg';
              }}
              alt={monster?.name}
              className={cn(
                'w-48 h-48 object-contain',
                cpuCss,
              )}
            />

            <Stats
              stats={cpuStats}
            />
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex flex-row gap-2 items-center justify-center">
        <Button
          variant="default"
          onClick={onStartClick}
          disabled={started}
          className={cn({
            'disabled': started,
          })}
        >
          Start
        </Button>

        <BattleButton
          variant="neutral"
          cooldown={5000}
          onCooldownStart={() => {
            doEffect(boostEffect);
          }}
          onCooldownEnd={() => {
            stopEffect(boostEffect);
          }}
        >
          Boost
        </BattleButton>

        <BattleButton
          variant="neutral"
          cooldown={10 * 1000}
          onCooldownStart={() => {
            doEffect(healEffect);
          }}
        >
          Heal
        </BattleButton>

        <Button
          variant="neutral"
          onClick={onConcede}
        >
          Concede
        </Button>
      </CardFooter>
    </Card>
  );
}
