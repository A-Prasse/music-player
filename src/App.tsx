import { useState } from "react";
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
//Importing Data
import data from "./data";

export default function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  return (
    <>
      <div className="App min-h-screen min-w-max">
        <Song currentSong={currentSong} />
        <Player />
      </div>
    </>
  );
}
