'use client';

import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import { ChevronRight } from 'lucide-react';
import NextLink from 'next/link';
import { type Monster } from '@/app/@types';
import { Loader } from '@/app/shared-components/loader';
import ldb from '@/app/services/ldb';
import { Button } from '@/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
} from '@/shadcn/components/ui/card';

export default function Pick() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [availablePicks, setAvailablePicks] = useState<Monster[]>([]);
  const [firstPick, setFirstPick] = useState<Monster | null>(ldb.getFirstPick());
  const { data } = api.pick.fetchMonsters.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });
  useEffect(() => {
    setMonsters(data?.monsters.map(m => m) ?? []);
  }, [data]);

  // persist
  useEffect(() => {
    if (!firstPick) {
      return;
    }

    ldb.setFirstPick(firstPick);
  }, [firstPick]);

  useEffect(() => {
    if (!monsters?.length) {
      return;
    }

    ldb.populateMonsterList(monsters);
    setAvailablePicks(ldb.getAvailablePicks());
  }, [monsters]);
  // persist

  const selectedClassName = `
    !bg-red-200
    !hover:bg-red-300
    !border-violet-500
    !shadow-violet-500
    !hover:shadow-violet-500
    !text-red-900
  `;

  const handleSelect = (monster: Monster) => {
    setFirstPick(monster);
  };

  return (
    <div className="
      flex flex-col items-center justify-center gap-4
      h-screen w-screen
    ">
      <h1 className="text-4xl font-bold text-center">
        Pick 1
      </h1>

      <div
        className={`
          ${
            availablePicks?.[0]
              ? 'grid grid-cols-4'
              : 'flex flex-col items-center justify-center'
          }
          my-4 gap-4
          overflow-y-auto
          p-4
          transition-opacity duration-700
        `}
      >
        {
          !availablePicks?.[0] &&
            <Loader message="Catching some monsters..." />

        }

        {availablePicks.map((monster) =>
          <Card
            onClick={() => handleSelect(monster)}
            key={monster.id}
            className={`
              flex flex-col items-center justify-center
              border-3 bg-green-50
              p-2
              cursor-pointer
              rounded-md
              transition-all
              border-green-500 shadow-green-500
              hover:border-violet-500 hover:shadow-violet-500
              shadow-[4px_4px_0px_0px_#000]
              hover:shadow-[0px_0px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1
              ${firstPick?.id === monster.id ? selectedClassName : ''}
            `}
          >
            <CardContent>
              <img
                loading="lazy"
                src={monster.imageUrl}
                alt={monster.name}
                className="w-36 h-36 object-contain"
              />
            </CardContent>

            <CardDescription className='text-pretty'>
              <h4 className="capitalize text-black">
                {monster.name}
              </h4>
            </CardDescription>
          </Card>
        )}
      </div>

      {monsters?.[0] &&
          <NextLink
            href={`/detail/${firstPick?.id}`}
          >
            <Button
              variant="default"
              className="
                p-10 gap-4 flex flex-row items-center justify-center
                cursor-pointer
              "
              disabled={!firstPick}
            >
              {
                firstPick &&
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      src={firstPick.gifUrl}
                      // fallback to image if gif is not available
                      onError={(e) => {
                        e.currentTarget.src = firstPick.imageUrl;
                      }}
                      alt={firstPick.name}
                      className="h-12 w-12 object-contain"
                    />

                    Name it!
                  </>

              }

              <ChevronRight className="w-10 h-10 inline-block" />
            </Button>
          </NextLink>
      }
    </div>
  );
}
