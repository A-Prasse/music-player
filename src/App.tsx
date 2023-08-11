import { useState, useRef, ChangeEvent } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
//Importing Data
import data from "./data";
//Importing Interfaces
import {
  ICurrentSong,
  ISongs,
  ISong,
  ISongInfo,
} from "./components/interfaces";

export default function App() {
  //States
  const [songs, setSongs] = useState<ISongs>(data());
  const [currentSong, setCurrentSong] = useState<ICurrentSong | ISong>(
    songs[0]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const initSongInfo: ISongInfo = { currentTime: 0, duration: 0 };
  const [songInfo, setSongInfo] = useState<ISongInfo>(initSongInfo);

  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  return (
    <>
      <div className="App min-h-screen">
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
        />
        <Library
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
        />
        <audio
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          ref={audioRef}
          src={currentSong.audio}
        ></audio>
      </div>
    </>
  );
}
