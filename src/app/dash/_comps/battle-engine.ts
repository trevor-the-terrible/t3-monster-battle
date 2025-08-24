import type { Monster } from '@/app/@types';

export const startBattle = (
  monsterA: Monster,
  monsterB: Monster,
  emit: (event: BattleEvent) => void,
) => {
  const battleState: BattleState = {
    monsterA,
    monsterB,
    history: [],
    intervals: [],
    trackEvent: (event: BattleEvent) => {
      battleState.history.push(event);
      emit(event);
    },
    cleanup: () => {
      battleState.intervals.forEach(clearInterval);
      battleState.intervals = [];
    },
  };

  initMonster(monsterA);
  initMonster(monsterB);

  battleState.intervals.push(setInterval(() => {
    watchBattle(battleState);
  }, 500));
  battleState.intervals.push(startInterval(monsterA, monsterB, battleState));
  battleState.intervals.push(startInterval(monsterB, monsterA, battleState));
};

const watchBattle = (battleState: BattleState) => {
  const monsters = [battleState.monsterA, battleState.monsterB];

  if (!monsters.some(monster => monster.currentStats.hp <= 0)) {
    return;
  }

  const winner = monsters.reduce((prev, current) =>
    current.currentStats.hp > prev.currentStats.hp ? current : prev
  );
  const loser = monsters.reduce((prev, current) =>
    current.currentStats.hp < prev.currentStats.hp ? current : prev
  );

  // todo: tie breaker?

  battleState.trackEvent({
    event: 'over',
    monsterFrom: winner,
    monsterTo: loser,
  });

  battleState.cleanup();
};

export const startInterval = (
  monsterA: Monster,
  monsterB: Monster,
  battleState: BattleState
) => {
  const intervalId = setInterval(() => {
    if (monsterA.currentStats.hp < 1) {
      return;
    }

    const isHit = getIstHit(monsterA, monsterB);
    if (!isHit) {
      battleState.trackEvent({
        event: 'miss',
        monsterFrom: monsterA,
        monsterTo: monsterB,
      });
      return;
    }

    const dmg = getDmg(monsterA, monsterB);
    applyDmg(monsterB, dmg);
    battleState.trackEvent({
      event: 'hit',
      monsterFrom: monsterA,
      monsterTo: monsterB,
      value: dmg,
    });
  }, monsterA.currentStats.speed);

  return intervalId;
};

const getIstHit = (monsterA: Monster, monsterB: Monster) => {
  const monsterAHit = Math.floor(Math.random() * 100) + monsterA.currentStats.hit;
  const monsterBEvasion = Math.floor(Math.random() * 100) + monsterB.currentStats.evasion;
  return monsterAHit > monsterBEvasion;
};

const getDmg = (monsterA: Monster, monsterB: Monster) => {
  const dmgRange = getDmgRange(monsterA);
  const dmg = sample(dmgRange) ?? 0;
  return Math.max(dmg - monsterB.currentStats.def, 1);
};

const getDmgRange = (monster: Monster) => {
  const [min, max] = monster.currentStats.dmg;
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

const applyDmg = (monster: Monster, dmg: number) => {
  monster.currentStats.hp = Math.max(monster.currentStats.hp - dmg, 0);
};

const sample = <T = unknown>(array: T[]): T | undefined => {
  return array[Math.floor(Math.random() * array.length)];
};

const initMonster = (monster: Monster) => {
  monster.baseStats = {
    hp: 25,
    speed: 1000,
    dmg: [1, 10],
    def: 1,
    hit: 1,
    evasion: 1,
    power: 1,
    effects: [],
    // ...monster?.currentStats,
  };
  monster.currentStats = {...monster.baseStats};
};

type BattleState = {
  monsterA: Monster;
  monsterB: Monster;
  history: BattleEvent[];
  intervals: NodeJS.Timeout[];
  trackEvent: (event: BattleEvent) => void;
  cleanup: () => void;
}

export type BattleEvent = {
  event: string;
  monsterFrom: Monster;
  monsterTo: Monster;
  value?: number;
}
