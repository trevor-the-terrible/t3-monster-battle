import { HydrateClient } from "@/trpc/server";
import PickPage from "./pick/page";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="
        flex min-h-screen flex-col items-center justify-center
      ">
        <PickPage />
      </main>
    </HydrateClient>
  );
}
