/**
 * I initially tested here to balance starting stats.
 * I had hoped to build the engine outside of react.
 * But it became unreliable when pushing state back into the engine.
 */

// import type { Monster } from '@/app/@types';
// import { startBattle } from '@/app/dash/_comps/battle-engine';

// const monsterA: Monster = {
//   id: '1',
//   name: 'Monster A',
//   url: 'https://example.com',
//   imageUrl: 'https://example.com',
//   gifUrl: 'https://example.com',
//   mysteryName: 'Monster A',
//   baseStats: {
//     hp: 25,
//     speed: 3000,
//     dmg: [5, 5],
//     def: 2,
//     hit: 1,
//     evasion: 1,
//     power: 1,
//     effects: new Set(),
//   },
//   currentStats: {
//     hp: 25,
//     speed: 3000,
//     dmg: [5, 5],
//     def: 2,
//     hit: 1,
//     evasion: 1,
//     power: 1,
//     effects: new Set(),
//   },
// };

// const monsterB: Monster = {
//   id: '2',
//   name: 'Monster B',
//   url: 'https://example.com',
//   imageUrl: 'https://example.com',
//   gifUrl: 'https://example.com',
//   mysteryName: 'Monster B',
//   baseStats: {
//     hp: 25,
//     speed: 1000,
//     dmg: [1, 5],
//     def: 0,
//     hit: 1,
//     evasion: 2,
//     power: 1,
//     effects: new Set(),
//   },
//   currentStats: {
//     hp: 25,
//     speed: 1000,
//     dmg: [1, 5],
//     def: 0,
//     hit: 1,
//     evasion: 2,
//     power: 1,
//     effects: new Set(),
//   },
// };
// startBattle(monsterA, monsterB, (event) => {
//   const summary: Record<string, number | string> = {};

//   summary[monsterA.name] = monsterA.currentStats?.hp;
//   summary[monsterB.name] = monsterB.currentStats?.hp;
//   summary.event = event.event;

//   const icons = {
//     hit: '💥',
//     miss: '💨',
//     over: '🏆',
//   };
//   const icon = icons[event.event as keyof typeof icons];

//   if (event.event === 'hit') {
//     const nameOfMonsterHit =
//       event.monsterTo.name === monsterA.name ? monsterB.name : monsterA.name;
//     summary[nameOfMonsterHit] = `${summary[nameOfMonsterHit]} ${icon}`;
//   } else {
//     summary[event.monsterTo.name] = `${summary[event.monsterTo.name]} ${icon}`;
//   }

//   console.table(summary);
// });
