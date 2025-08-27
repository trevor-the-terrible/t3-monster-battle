'use client';

import { useEffect, useState } from 'react';
import type { MonsterStats } from '@/app/@types';
import * as effects from './effects'

let user: BattleMonster;
let cpu: BattleMonster;

export function BattleClock({
  user,
  cpu,
}: {
  user: BattleMonster;
  cpu: BattleMonster;
}) {
  const incr = 100;
  const [userSpeedCheck, setUserSpeedCheck] = useState(0);
  const [cpuSpeedCheck, setCpuSpeedCheck] = useState(0);
  const [running, setRunning] = useState(false);
  const [battleTick, setBattleTick] = useState(-1);

  useEffect(() => {
    if (!running) {
      return;
    }

    const isOver = checkIfOver(user.stats, cpu.stats, []);
    if (isOver) {
      user.stats.effects.clear();
      cpu.stats.effects.clear();
      user.setStats({ ...user.stats });
      cpu.setStats({ ...cpu.stats });
      return;
    }

    // after an attack is allowed to be made, reset the timer per monster
    console.log(user.stats.speed, user.stats.hp);
    const [doUserAttack, userTimer] = doAttack(user.stats, userSpeedCheck + incr);
    const [doCpuAttack, cpuTimer] = doAttack(cpu.stats, cpuSpeedCheck + incr);
    setUserSpeedCheck(userTimer);
    setCpuSpeedCheck(cpuTimer);

    if (doUserAttack) {
      const userStats = user.stats
      const cpuStats = cpu.stats
      attack(userStats, cpuStats, []);
      user.setStats(userStats);
    }

    if (doCpuAttack) {
      const userStats = user.stats
      const cpuStats = cpu.stats
      attack(cpuStats, userStats, []);
      cpu.setStats(cpuStats);
    }

    const timeoutId = setTimeout(() => {
      setBattleTick(battleTick + 1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [battleTick]);

  return {
    start: () => {
      if (running) {
        return;
      }

      setRunning(true);
      setBattleTick(0);
    },
    stop: () => {
      if (!running) {
        return;
      }

      setRunning(false);
      setBattleTick(-1);
    },
  };
}

const checkIfOver = (
  userStats: MonsterStats,
  cpuStats: MonsterStats,
  history: any[],
) => {
  if (history.some((event) => event.id === 'over')) {
    return true;
  }

  const monsters = [userStats, cpuStats];

  if (!monsters.some((currentStats) => currentStats.hp <= 0)) {
    return false;
  }

  const winner = monsters.reduce((prev, current) =>
    current.hp > prev.hp ? current : prev,
  );

  const loser = monsters.reduce((prev, current) =>
    current.hp < prev.hp ? current : prev,
  );

  history.push({
    id: 'over',
    from: winner,
    to: loser,
  });

  // todo: tie breaker?

  return true;
};

const doAttack = (m: MonsterStats, timer: number):[boolean, number] => {
  // higher speed stat means faster attacks
  // const speed = 1000 - (m.speed * 1000);
  const speed = m.speed;
  if (timer > speed) {
    return [true, 0];
  }
  return [false, timer];
}

const attack = (
  from: MonsterStats,
  to: MonsterStats,
  history: any[],
) => {
  if (from.hp < 1 || to.hp < 1) {
    return;
  }

  const isHit = getIstHit(from, to);
  if (!isHit) {
    history.push({
      id: 'miss',
      from,
      to,
    });
    return;
  }

  const dmg = getDmg(from, to);
  applyEffect('hit', to);
  applyDmg(to, dmg);
  history.push({
    id: 'hit',
    from,
    to,
    value: dmg,
  });
};

const applyEffect = (effectid:string, stats:MonsterStats) => {
  const effect = effects.availableEffects.find(ef => ef.id === effectid);
  if (!effect) {
    console.warn('unknown effect', effectid);
    return;
  }

  stats.effects.add('hit');

  if (effect.duration === 'manual') {
    console.warn(effect.id, 'manual duration');
    return;
  }

  setTimeout(() => {
    stats.effects.delete(effect.id)
  }, effect.duration);
}

const getIstHit = (statsA: MonsterStats, statsB: MonsterStats) => {
  const monsterAHit = Math.floor(Math.random() * 100) + statsA.hit;
  const monsterBEvasion = Math.floor(Math.random() * 100) + statsB.evasion;
  return monsterAHit > monsterBEvasion;
};

const getDmg = (statsA: MonsterStats, statsB: MonsterStats) => {
  const dmgRange = getDmgRange(statsA);
  const dmg = sample(dmgRange) ?? 0;
  return Math.max(dmg - statsB.def, 1);
};

const getDmgRange = (stats: MonsterStats) => {
  const [min, max] = stats.dmg;
  const range = [];
  let step = 1;
  while (step < max) {
    step += 1;

    if (step % 2 !== 0) {
      range.push(step);
    }
  }
  return [min, ...range, max];
};

const applyDmg = (monster: MonsterStats, dmg: number) => {
  monster.hp = Math.max(monster.hp - dmg, 0);
};

const sample = <T = unknown>(array: T[]): T | undefined => {
  return array[Math.floor(Math.random() * array.length)];
};

export type BattleMonster = {
  id: string;
  stats: MonsterStats;
  setStats: (stats:MonsterStats) => void;
}
