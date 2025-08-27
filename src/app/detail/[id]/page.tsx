'use client';

import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import ldb from '@/app/services/ldb';
import { cn } from '@/app/utils/styles';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { type MonsterUser } from '@/app/@types';
import { useDebouncedCallback } from 'use-debounce';

export default function Detail() {
  const { id } = useParams();
  const [myname, setMyName] = useState('');
  const [battleHover, setBattleHover] = useState(false);
  const [monster, setMonster] = useState<MonsterUser | null>(null);
  const namedCss = '!grayscale-0';

  useEffect(() => {
    const m =
      ldb.getFirstPick()
      ?? ldb.getMonster(id as string)
    ;
    setMonster(m);
    setMyName(m?.myname ?? '');
  }, [id]);

  const debouncedPersist = useDebouncedCallback(() => {
    if (!monster || myname?.trim() === monster.name) {
      return;
    }

    ldb.setFirstPick({
      ...monster,
      id: `u_${String(monster.id).replace(/^u_/, '')}`,
      myname: myname.trim(),
    });
  }, 100);
  useEffect(() => {
    debouncedPersist();
  }, [myname, monster, debouncedPersist]);

  return (
    <div className="
      h-screen w-screen
      flex flex-col items-center justify-center
      gap-4
    ">
      <div className="relative w-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={monster?.imageUrl}
          alt={myname || monster?.name}
          className={cn(
            'max-w-1/2 object-contain transition-all duration-1000',
            'grayscale-200',
            myname ? namedCss : '',
          )}
        />

        {
          battleHover &&
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={monster?.imageUrl}
                alt={myname || monster?.name}
                className={cn(
                  'max-w-1/2 object-contain transition-all duration-1000',
                  'grayscale-200',
                  myname ? namedCss : '',
                  'absolute animate-ping'
                )}
              />
            </>

        }
      </div>

      <Input
        type="text"
        placeholder={`Name your monster! ...${monster?.mysteryName}?`}
        className="w-1/2"
        value={myname}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setMyName(e.currentTarget.value);
        }}
      />

      <NextLink href={'/dashboard'} >
        <Button
          variant="default"
          className="cursor-pointer"
          disabled={!myname}
          onMouseDown={() => {
            setTimeout(() => {
              setBattleHover(true);
            }, 100);
          }}
        >
          Battle!
        </Button>
      </NextLink>
    </div>
  );
}
