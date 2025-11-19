# Monster Battle

Spike to better understand more "complex" React interactions and
native state managment.

I used [T3 Stack](https://create.t3.gg/) to build.
  - Provides a well-defined Next/React starting point.
  - tRPC simplifies server/client side calls and let me focus on client-side code.

ShadCn
  - Provides well-defined components that are easy to customize per project.
  - Easy to override styles let me define a look ideal for the project

# Running project
> NOTE: I generally use `pnpm` for most internal projects as it installs
to a system-wide shared cache. With some exceptions testing `bun`
```sh
pnpm run ci;
pnpm run dev;
```

Via NPM

```sh
npm i;
npm run dev;
```

# Structure
> Deviations from T3 Stack.

### src
- app
  - [Page]
    - page.tsx (root content)
    - router.ts (related tRPC api calls)
  - utils (utils for app folder)
- @types (types for app)
- shadcn (shadcn installed components)
- utils (utils for project)
- spike (code used for exploring concepts)

# TODO
- [ ] Finish implementing game loop (win/lose/retry)
  - Add money + points
  - Select more than one monster
  - Add a fail state: out of money + out of monsters
- [ ] Add cypress E2E tests
- [ ] Add SVG based animations
  - hit
  - heal
- [ ] Try out hosting + deployment
