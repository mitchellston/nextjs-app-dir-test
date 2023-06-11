import { atom } from "jotai";

export const searchAtom = atom<{
  song: string | null;
  artist: string | null;
} | null>(null);
