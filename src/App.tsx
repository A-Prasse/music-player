import { useState, useRef, ChangeEvent } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
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

  const [libraryStatus, setLibraryStatus] = useState<boolean>(false);
  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  const handleSongEnd = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current?.play();
  };

  return (
    <>
      <div className="App min-h-screen">
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          songs={songs}
          setSongs={setSongs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <Library
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          libraryStatus={libraryStatus}
        />
        <audio
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={handleSongEnd}
        ></audio>
      </div>
    </>
  );
}
