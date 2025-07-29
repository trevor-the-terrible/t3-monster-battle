import timers from "node:timers/promises";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import getName from "@/app/services/get-random-name";
import type { Monster, PokemonDetail } from "@/app/@types";

export const pickRouter = createTRPCRouter({
  fetchMonsters: publicProcedure
    // .input(z.object({
    //   limit: z.number().min(1).max(500).default(8),
    // }))
    .query(async ({ input }) => {
      const searchParams = new URLSearchParams({
        limit: '500',
        offset: '0',
      });
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${searchParams}`);

      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }

      const data = await response.json() as {
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      };

      // await timers.setTimeout(5 * 1000);

      const populateMonsters = data.results
        .map(async (monster) => {
          // trailing slash
          const [id] = monster.url.split('/').slice(-2) as [string];
          const details = await fetchMonsterDetails(id);
          const imageUrl = (
            details?.sprites?.official
            || details?.sprites?.home
          );
          const gifUrl = (
            details?.sprites?.showdown
            || details?.sprites?.shiny
            || details?.sprites?.front
            || details?.sprites?.official
          );

          return {
            id,
            name: getName(),
            mysteryName: monster.name,
            url: monster.url,
            imageUrl,
            gifUrl,
            details,
          } as Monster;
        });

      const monsters = await Promise.all(populateMonsters);
      console.dir(monsters, { depth: null });

      return {
        monsters,
      }
    }),
});

const fetchMonsterDetails = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon details');
  }

  const data = await response.json() as PokemonDetail;

  return {
    sprites: {
      front: data.sprites?.front_default ?? undefined,
      shiny: data.sprites?.front_shiny ?? undefined,
      home: data.sprites?.other?.home?.front_default ?? undefined,
      official: data.sprites?.other?.['official-artwork']?.front_default ?? undefined,
      showdown: data.sprites?.other?.showdown?.front_default ?? undefined,
    },
  };
};
