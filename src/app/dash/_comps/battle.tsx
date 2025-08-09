import type { Monster, MonsterUser, Buff, Effect } from "@/app/@types";
import { cn } from "@/app/utils/styles";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BattleButton } from "./battle-button";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import * as effects from "@/app/services/effects";
import { doEffect, stopEffect } from "@/app/services/effects";

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
  const healEffect = effects.getHealEffect(useState<boolean>(false));
  const boostEffect = effects.getBoostEffect(useState<boolean>(false));
  const boostCss = useMemo(() => {
    return boostEffect.state?.[0] ? "animate-pulse" : "-";
  }, [boostEffect.state]);

  const onConcede = () => {
    const confirmed = confirm('Concede?');
    if (!confirmed) {
      return;
    }
  };

  return (
    <Card className="bg-violet-300 w-full">
      <CardHeader>
        <CardTitle className="text-center">
          <strong>{monsterUser.myname}</strong> vs <strong>{monster.name}</strong>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-row gap-2 items-center justify-evenly">
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={monsterUser?.gifUrl}
              alt={monsterUser.myname}
              className={cn(
                "w-48 h-48 object-contain",
                boostCss,
                healEffect.state?.[0] ? 'animate-bounce' : '',
              )}
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

          {/* <li>
            <ul>
            {
              details.buffs.concat(details.debuffs).map(buff => (
                <li key={buff.name}>
                  {buff.name}
                </li>
              ))
            }
            </ul>
            &nbsp;
          </li> */}

          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={monster?.gifUrl}
              alt={monster?.name}
              className="w-48 h-48 object-contain"
            />
          </li>
        </ul>
      </CardContent>

      <CardFooter className="flex flex-row gap-2 items-center justify-center">
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
