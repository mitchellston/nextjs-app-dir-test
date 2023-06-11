"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { searchAtom } from "~/atoms/search";
export const SearchSong = () => {
  const [search, setSearch] = useAtom(searchAtom);
  const [artist, setArtist] = useDebouncedState(search?.artist ?? "", 200);
  const [song, setSong] = useDebouncedState(search?.song ?? "", 200);
  useEffect(() => {
    const artistIs = artist === "" ? null : artist;
    const songIs = song === "" ? null : song;
    setSearch({ artist: artistIs, song: songIs });
  }, [artist, song]);
  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-10  rounded-full p-0">
                <Settings2 className="h-4 w-4" />
                <span className="sr-only">Search songs/ artists menu</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search songs/ artists</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-blend-darken">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search</h4>
            <p className="text-sm text-muted-foreground">
              Search for songs or artists
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Song name</Label>
              <Input
                id="width"
                placeholder="Song name"
                defaultValue={song}
                onInput={(e) => setSong(e.currentTarget.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Artist name</Label>
              <Input
                id="maxWidth"
                onInput={(e) => setArtist(e.currentTarget.value)}
                placeholder="Artist name"
                defaultValue={artist}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
