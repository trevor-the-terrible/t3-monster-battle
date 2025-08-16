import type { Monster } from '@/app/@types';
import { startBattle } from '@/app/dash/_comps/battle-engine';

const monsterA: Monster = {
  id: '1',
  name: 'Monster A',
  currentStats: {
    hp: 25,
    speed: 3000,
    dmg: [5, 5],
    def: 2,
    hit: 1,
    evasion: 1,
    power: 1,
    effects: [],
  },
};

const monsterB: Monster = {
  id: '2',
  name: 'Monster B',
  currentStats: {
    hp: 25,
    speed: 1000,
    dmg: [1, 5],
    def: 0,
    hit: 1,
    evasion: 2,
    power: 1,
    effects: [],
  },
};

startBattle(monsterA, monsterB, (event) => {
  const summary: Record<string, number | string> = {};

  summary[monsterA.name] = monsterA.currentStats?.hp;
  summary[monsterB.name] = monsterB.currentStats?.hp;
  summary.event = event.event;

  const icons = {
    hit: '💥',
    miss: '💨',
    over: '🏆',
  };
  const icon = icons[event.event as keyof typeof icons];

  if (event.event === 'hit') {
    const nameOfMonsterHit =
      event.monster.name === monsterA.name
        ? monsterB.name
        : monsterA.name
    ;
    summary[nameOfMonsterHit] = `${summary[nameOfMonsterHit]} ${icon}`;
  } else {
    summary[event.monster.name] = `${summary[event.monster.name]} ${icon}`;
  }

  console.table(summary);
});
