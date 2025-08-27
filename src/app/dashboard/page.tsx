'use client';

import { page, cn } from '@/app/utils/styles';
import { useRouter } from 'next/navigation';
import ldb, { type BattleHistory } from '@/app/services/ldb';
import { useState, useEffect } from 'react';
import type { Monster, MonsterUser } from '@/app/@types';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import { BattleBoard } from './battle-board';

export default function Dash() {
  const [loading, setLoading] = useState(true);
  const [firstPick, setFirstPick] = useState<MonsterUser | null>(null);
  const [shadowMonster, setShadowMonster] = useState<Monster | null>(null);
  const [activeBattles, setActiveBattles] = useState<BattleHistory[]>([]);

  useEffect(() => {
    setLoading(false);

    const firstPick = ldb.getFirstPick();
    if (!firstPick) {
      setShadowMonster(ldb.getRandomMysteryMonster());
      return;
    }
    setFirstPick(firstPick);

    const battleHistory = ldb.getBattleHistory();
    const activeBattles = battleHistory.filter((h) => h.progress < 100);

    if (!activeBattles.length && !battleHistory.length) {
      const firstBattle = ldb.createBattle(firstPick);
      ldb.saveBattleHistory(firstBattle);
      setActiveBattles([firstBattle]);
      return;
      setActiveBattles(activeBattles);
    }

    setActiveBattles(activeBattles);
  }, []);

  if (loading) {
    return <>&nbsp;</>
  }

  if (!firstPick) {
    return (
      <div className={cn(page)}>
        {shadowMonster && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shadowMonster?.imageUrl}
              alt='mystery monster'
              className='w-32 object-contain brightness-[0]'
            />
          </>
        )}

        <p className='text-center'>Please pick a starting monster first.</p>

        <NextLink href='/pick'>
          <Button>Pick a monster</Button>
        </NextLink>
      </div>
    );
  }

  return (
    <div className={cn(page, 'p-12')}>
      {activeBattles.map((battle) => (
        <BattleBoard
          key={battle.id}
          user={firstPick}
          cpu={ldb.getMonster(battle.opponent_id)!}
        />
      ))}
    </div>
  );
}
