import { ChangeEvent } from "react";
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";
//Importing Interfaces
import { ISongInfo } from "./interfaces";
interface Props {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  songInfo: ISongInfo;
  setSongInfo: React.Dispatch<React.SetStateAction<ISongInfo>>;
}

export default function Player({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}: Props) {
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
  return (
    <div className="h-20 flex flex-col items-center justify-between">
      <div className="w-1/2 flex items-center">
        <p className="text-center">{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
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
    </div>
  );
}
