"use client";
import { use, useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
type props = {
  url: string;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  startPlaying?: (startPlaying: () => void) => void;
  stopPlaying?: (stopPlaying: () => void) => void;
};
export const WaveForm = (props: props) => {
  const WaveContainer = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState<WaveSurfer | null>(null);
  useEffect(() => {
    if (!WaveContainer.current) return;
    if (wave) return;
    WaveContainer.current.innerHTML = "";
    setWave(
      WaveSurfer.create({
        container: WaveContainer.current,
        barWidth: 3,
        cursorWidth: 1,
        backend: "WebAudio",
        height: 40,
        progressColor: "#2D5BFF",
        responsive: true,
        waveColor: "#EFEFEF",
        cursorColor: "transparent",
      })
    );
  }, [props.url, wave]);
  useEffect(() => {
    if (!wave) return;
    wave.load(props.url);
    wave.on("ready", () => {
      wave.play();
    });
    wave.on("play", () => {
      if (props.onPlay) props.onPlay();
    });
    wave.on("pause", () => {
      if (props.onPause) props.onPause();
    });
    wave.on("stop", () => {
      if (props.onStop) props.onStop();
    });
    wave.on("finish", () => {
      if (props.onStop) props.onStop();
    });
  }, [wave, props.url]);
  const pause = useCallback(() => {
    if (!wave) return;
    wave.pause();
  }, [wave]);
  const play = useCallback(() => {
    if (!wave) return;
    wave.play();
  }, [wave]);
  useEffect(() => {
    if (!wave) return;
    if (props.startPlaying) props.startPlaying(play);
    if (props.stopPlaying) props.stopPlaying(pause);
  }, [wave, props.startPlaying, props.stopPlaying, play, pause, props]);
  return <div className="w-full " ref={WaveContainer}></div>;
};
