"use client";

import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { songAtom } from "~/atoms/song";

import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
const WaveForm = dynamic(
  () =>
    import("~/components/client/waveForm").then((module) => module.WaveForm),
  {
    loading: () => <Skeleton className="w-full h-20" />,
    ssr: false,
  }
);
export const AudioPlayer = () => {
  const [song, setSong] = useAtom(songAtom);
  const [playing, setPlaying] = useState(false);
  const startPlaying = useRef<(() => void) | null>(null);
  const stopPlaying = useRef<(() => void) | null>(null);
  return (
    <section className="flex m-2 gap-5 flex-row items-center justify-center h-[100px] w-full bg-transparent">
      <div className="flex justify-center items-center">
        {!playing ? (
          <button
            onClick={() => {
              if (startPlaying.current) startPlaying.current();
            }}
            className="bg-gray-700 text-white p-2 rounded-full"
            disabled={!song}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 4v16l13-8L5 4z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => {
              if (stopPlaying.current) stopPlaying.current();
            }}
            className="bg-gray-700 text-white p-2 rounded-full"
            disabled={!song}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          </button>
        )}
      </div>
      {song ? (
        <WaveForm
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onStop={() => setPlaying(false)}
          startPlaying={(fn) => {
            if (startPlaying.current == null) startPlaying.current = fn;
          }}
          stopPlaying={(fn) => {
            if (stopPlaying.current == null) stopPlaying.current = fn;
          }}
          url={song.song.file}
        />
      ) : (
        <div className="w-full"></div>
      )}
    </section>
  );
};
