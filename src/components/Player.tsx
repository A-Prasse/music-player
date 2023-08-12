import { ChangeEvent } from "react";
import { PlayIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";
//Importing Interfaces
import { ICurrentSong, ISongInfo, ISongs, ISong } from "./interfaces";
interface Props {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  songInfo: ISongInfo;
  setSongInfo: React.Dispatch<React.SetStateAction<ISongInfo>>;
  songs: ISongs;
  setSongs: React.Dispatch<React.SetStateAction<ISongs>>;
  currentSong: ICurrentSong;
  setCurrentSong: React.Dispatch<React.SetStateAction<ICurrentSong | ISong>>;
}

export default function Player({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
}: Props) {
  const handleActiveLibrary = (nextPrev: ISong) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  //Event Handlers
  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };
  const handleDrag = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current !== null) {
      audioRef.current.currentTime = Number(e.target.value);
    }
    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) });
  };
  const handleSkipTrack = async (direction: string) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      handleActiveLibrary(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1]);
        handleActiveLibrary(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        handleActiveLibrary(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (isPlaying) audioRef.current?.play();
  };
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  return (
    <div className="h-20 flex flex-col items-center justify-between">
      <div className="w-1/2 flex items-center ">
        <p className="text-center">{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={handleDrag}
          className="range ml-3 mr-3"
        />
        <p className="text-center">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="w-1/3 flex justify-between items-center p-4">
        <BackwardIcon
          onClick={() => handleSkipTrack("skip-back")}
          className="h-6 w-6 text-secondary cursor-pointer"
        />
        <PlayIcon
          onClick={handlePlaySong}
          className="h-6 w-6 text-secondary cursor-pointer"
        />
        <ForwardIcon
          onClick={() => handleSkipTrack("skip-forward")}
          className="h-6 w-6 text-secondary cursor-pointer"
        />
      </div>
    </div>
  );
}
