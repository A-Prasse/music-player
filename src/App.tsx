import { useState } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
//Importing Data
import data from "./data";
//Importing Interfaces
import { ICurrentSong } from "./components/interfaces";

export default function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState<ICurrentSong>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  return (
    <>
      <div className="App min-h-screen">
        <Song currentSong={currentSong} />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </>
  );
}
