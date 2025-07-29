export type MonsterUser = Monster & {
  myname: string;
}

export type PokeMonster = {
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

export type Monster = PokeMonster & {
  mysteryName: string;
}
