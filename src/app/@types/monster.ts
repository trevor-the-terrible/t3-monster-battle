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

export type BaseStats = {
  hp: number;
  speed: number;

  dmg: [number, number];
  def: number;

  hit: number;
  evasion: number;

  power: number;
  effects: Effect[];
}

export type Monster = SourceMonster & {
  mysteryName: string;
  baseStats: BaseStats;
  currentStats: BaseStats;
  effects: Map<string, Effect>
}

export type MonsterUser = Monster & {
  myname: string;
}
