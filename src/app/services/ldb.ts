'use client';

import { ulid } from 'ulid';
import * as localCache from '../utils/local-cache';
import type { Monster, MonsterUser } from '@/app/@types';

class LocalDB {
  private monsterList: Map<string, MonsterUser>;

  constructor() {
    this.monsterList = new Map();
    const cachedMonsters = localCache.getLocalCache<MonsterUser[]>('monsterList');
    this.monsterList = new Map(cachedMonsters?.map(m => [m.id, m]) ?? []);
  }

  populateMonsterList(monsterList: Monster[]) {
    this.monsterList = new Map(monsterList.map(m => {
      return [m.id, {
        // myname: m.name,
        ...m,
        ...this.getMonster(m.id),
      } as MonsterUser];
    }));
    this.saveMonsterList();
  }

  getAvailablePicks(limit = 8) {
    const cachedPicks = localCache.getLocalCache<MonsterUser[]>('picks');
    const picks = cachedPicks?.length
      ? cachedPicks
      : (
        Array.from(this.monsterList.values())
        .filter(m => !m.myname)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
      );

    if (!cachedPicks?.length) {
      localCache.setLocalCache('picks', picks);
    }

    return picks;
  }

  getRandomMysteryMonster() {
    const availablePicks = this.getAvailablePicks();

    return availablePicks
      .sort(() => Math.random() - 0.5)
      .slice(0, 1)[0]!;
  }

  getRandomMonster() {
    const cachedMonsters = localCache.getLocalCache<MonsterUser[]>('monsterList');
    const monsters = cachedMonsters?.length
      ? cachedMonsters
      : Array.from(this.monsterList.values());

    return monsters
      .sort(() => Math.random() - 0.5)
      .slice(0, 1)[0]!;
  }

  private saveMonsterList() {
    localCache.setLocalCache('monsterList', Array.from(this.monsterList.values()));
  }

  setFirstPick(monster: Monster | MonsterUser) {
    localCache.setLocalCache('firstPick', monster);
  }

  setPicks(monsters: MonsterUser[]) {
    localCache.setLocalCache('picks', monsters);
  }

  getFirstPick() {
    return localCache.getLocalCache<MonsterUser>('firstPick') ?? null;
  }

  getPicks() {
    return localCache.getLocalCache<MonsterUser[]>('picks') ?? [];
  }

  getMonster(id: string) {
    return this.monsterList.get(id) ?? null;
  }

  setMonster(monster: MonsterUser) {
    this.monsterList.set(monster.id, monster);
    localCache.setLocalCache('monsterList', Array.from(this.monsterList.values()));
  }

  // battle history
  getBattleHistory() {
    return localCache.getLocalCache<BattleHistory[]>('battleHistory') ?? [];
  }

  createBattle(monster: MonsterUser, opponent = this.getRandomMonster()) {
    const battle: BattleHistory = {
      id: ulid(),
      monster_id: monster.id,
      opponent_id: opponent.id,
      progress: 0,
      date: new Date(),
    };

    this.saveBattleHistory(battle);

    return battle;
  }

  // getBattleHistoryByMonsterId(monster_id: string) {
  //   return this.getBattleHistory().filter(h => h.monster_id === monster_id);
  // }

  // getBattleHistoryByOpponentId(opponent_id: string) {
  //   return this.getBattleHistory().filter(h => h.opponent_id === opponent_id);
  // }

  saveBattleHistory(battle: BattleHistory) {
    const history = localCache.getLocalCache<BattleHistory[]>('battleHistory') ?? [];

    const index = history.findIndex(h => h.id === battle.id);

    if (index === -1) {
      history.push(battle);
    } else {
      history[index] = battle;
    }

    localCache.setLocalCache('battleHistory', history);
  }
}

export const ldb = new LocalDB();
export default ldb;

export type BattleHistory = {
  id: string;
  date: Date;
  monster_id: string;
  opponent_id: string;
  result?: number; // 0%-100%
  progress: number; // 0%-100%
}
