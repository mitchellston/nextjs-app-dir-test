import { Suspense } from "react";
import { FetchSong } from "~/components/server/fetchSong";
import { db } from "~/server/db/db";
import { artist, song } from "~/server/db/schema";
import { sql } from "drizzle-orm";
import { SongCard } from "~/components/client/songCard";
import { Skeleton } from "~/components/ui/skeleton";
import { SearchSong } from "~/components/client/searchSong";

type props = {
  searchParams: {
    test?: string;
  };
};
export default async function Page(props: props) {
  const count = await db
    .select({ count: sql<string>`count(*)` })
    .from(song)
    .execute();
  const songs = parseInt(count[0].count);
  return (
    <section className="m-2 ">
      <div className="flex">
        <h1 className="font-bold text-2xl">Choose a song to play</h1>
        <div className="flex justify-end flex-grow">
          <SearchSong />
        </div>
      </div>

      <div className="flex gap-1 justify-center m-2 mt-4 flex-wrap">
        {songs != 0 && count[0]?.count && (
          <>
            {[...Array(songs)].map((c, i) => (
              <Suspense
                key={i}
                fallback={<Skeleton className="w-[200px] h-[250px]"></Skeleton>}
              >
                <FetchSong index={i}>
                  {(song) => <SongCard {...song} />}
                </FetchSong>
              </Suspense>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
