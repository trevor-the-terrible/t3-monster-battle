# battle timer / engine

- attack rate (SPEED)
  > ms interval an attack is made
  - buffs/debuffs
    - double time
    - half time

- dmg range (DMG)
  > min-max dmg, random? limit steps to integers, odds: 1-6 => [1, [3, 5], 6]
  - buffs/debuffs:
    - always min
    - always max

- dmg bonus
  > POWER: raises min/max by amount, every point over 1, BONUS: (POWER - 1)
  DMG: [1,3,5] + (POWER: 2) => [2,4,6]

- hit percentage (HIT/EVASION)
  > odds a hit will land, 1-99, 0 miss, 100 hit
  > SUCCESS: (rng(0, 100) + HIT) > (rng(0, 100) + EVASION)


```typescript
const monster_a = {
  hit: 1,
  evasion: 1,
  power: 1, // 0
  dmg: [1,3,5],
  speed: 3 * 1000,
  hp: 100,
};
const monster_b = {
  hit: 1,
  evasion: 1,
  power: 1, // 0
  dmg: [1,3,5],
  speed: 3 * 1000,
  hp: 100,
};
const intervals = [];
const history = [];
const monster_a_interval = (() => {
  const isHit = getIstHit(monster_a, monster_b);
  if (!isHit) {
    doEffect('miss', monster_a, monster_b, history);
    return;
  }

  const dmg = getDmg(monster_a, monster_b); // add DEF stat
  doEffect('hit', dmg, monster_a, monster_b, history);
  monster_a.hp = Math.max(monster_a.hp - dmg, 0);
  if (monster_a.hp < 1) {
    doEffect('lose', monseter_a, monster_b, history);
    intervals.forEach(clearIntervals);
    showResults(history);
  }
}, monster.speed);

intervals.push(monster_a_interval);
// intervals.push(monster_b_interval);
```
