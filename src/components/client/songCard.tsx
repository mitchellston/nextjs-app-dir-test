"use client";
import { useAtom } from "jotai";
import Image from "next/image";
import { searchAtom } from "~/atoms/search";
import { songAtom } from "~/atoms/song";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
type props = {
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
};
export const SongCard = (props: props) => {
  const [song, setSong] = useAtom(songAtom);
  const [search, setSearch] = useAtom(searchAtom);
  if (search && (search.song || search.artist)) {
    // check if search.song is inside props.song.name
    if (
      !(
        search.song &&
        props.song.name.toLowerCase().includes(search.song.toLowerCase())
      ) &&
      !(
        search.artist &&
        props.artist?.name.toLowerCase().includes(search.artist.toLowerCase())
      )
    ) {
      return null;
    }
  }
  return (
    <button onClick={() => setSong(props)}>
      <Card>
        <CardHeader className="flex  justify-center items-center">
          <Image
            src={props.song.cover}
            alt="song cover"
            width={236}
            height={450}
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <h1 className="font-bold first-letter:uppercase">
            {props.song.name}
          </h1>
          <h2 className="font-bold first-letter:uppercase">
            Made by {props.artist?.name}
          </h2>
        </CardContent>
      </Card>
    </button>
  );
};
