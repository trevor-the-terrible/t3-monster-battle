import fs from 'node:fs/promises';
import path from 'node:path';
import superJSON from 'superjson';
import type { Monster } from '@/app/@types';
import tryCatch from '@/utils/try-catch';

const cachePath = path.join(process.cwd(), 'public', 'cache', 'monsters.json');

export const monsterCloset = {
  async load() {
    const [error, monsters] = await tryCatch(async () => {
      const data = await fs.readFile(cachePath, 'utf-8');
      const monsters = superJSON.parse<Monster[]>(data);
      return monsters;
    });

    if (error) {
      return [];
    }

    return monsters;
  },
  async set(data: Monster[]) {
    await tryCatch(fs.mkdir(path.dirname(cachePath), { recursive: true }));
    const [error] = await tryCatch(fs.writeFile(cachePath, superJSON.stringify(data)));

    if (error) {
      console.error(error);
    }
  },
};

export default monsterCloset;
