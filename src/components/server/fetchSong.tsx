"use server";

import { db } from "~/server/db/db";
import { Song, artist, song } from "~/server/db/schema";

import { eq } from "drizzle-orm";

type props = {
  children: (fetchedSong: {
    song: {
      id: string;
      name: string;
      cover: string;
      file: string;
    };
    artist: {
      id: string;
      name: string;
    } | null;
  }) => React.ReactNode;
} & (
  | {
      index: number;
    }
  | { id: string }
);
export const FetchSong = async (props: props) => {
  const fetchSong = db.select().from(song);
  if ("index" in props) {
    fetchSong.limit(1).offset(props.index);
  } else {
    fetchSong.where(eq(song.id, props.id));
  }

  const fetchedSongs = await fetchSong
    .leftJoin(artist, eq(song.artist, artist.id))
    .execute();
  if (fetchedSongs.length != 1)
    return (
      <div>
        Oh no this isn{"'"}t good :{"("}
      </div>
    );
  return <>{props.children(fetchedSongs[0])}</>;
};
