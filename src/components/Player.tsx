import { ChangeEvent, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";
//Importing Interfaces
import { ICurrentSong, ISongInfo } from "./interfaces";
interface Props {
  currentSong: ICurrentSong;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
}: Props) {
  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);
  //Event Handlers
  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.play();
      setIsPlaying(!isPlaying);
    }
  };
  const handleTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  const handleDrag = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = Number(e.target.value);
    }
    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) });
  };
  const PlayPauseIcon = () => {
    if (isPlaying) {
      return (
        <PauseIcon
          onClick={handlePlaySong}
          className="h-6 w-6 text-secondary cursor-pointer"
        />
      );
    } else {
      return (
        <PlayIcon
          onClick={handlePlaySong}
          className="h-6 w-6 text-secondary cursor-pointer"
        />
      );
    }
  };
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //State
  const initSongInfo: ISongInfo = { currentTime: 0, duration: 0 };
  const [songInfo, setSongInfo] = useState<ISongInfo>(initSongInfo);
  return (
    <div className="h-20 flex flex-col items-center justify-between">
      <div className="w-1/2 flex items-center">
        <p className="text-center">{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={handleDrag}
          className="range range-secondary ml-3 mr-3"
        />
        <p className="text-center">{getTime(songInfo.duration)}</p>
      </div>
      <div className="w-1/3 flex justify-between items-center p-4">
        <BackwardIcon className="h-6 w-6 text-secondary cursor-pointer" />
        <PlayPauseIcon />
        <ForwardIcon className="h-6 w-6 text-secondary cursor-pointer" />
      </div>
      <audio
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}
