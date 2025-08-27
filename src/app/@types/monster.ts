import type { Effect } from './effects';

export type SourceMonster = {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
  gifUrl: string;
  details?: {
    sprites?: {
      fron?: string,
      shiny?: string,
      home?: string,
      official?: string,
      showdown?: string,
    }
  };
}

export type MonsterStats = {
  hp: number;
  maxHp: number;
  speed: number;

  dmg: [number, number];
  def: number;

  hit: number;
  evasion: number;

  power: number;
  effects: Set<string>;
}

export type Monster = SourceMonster & {
  mysteryName: string;
  baseStats: MonsterStats;
  currentStats: MonsterStats;
}

export type MonsterUser = Monster & {
  myname: string;
}
