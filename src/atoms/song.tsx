import { atom } from "jotai";

export const songAtom = atom<{
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
} | null>(null);
