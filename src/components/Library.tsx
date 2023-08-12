import LibrarySong from "./LibrarySong";

//Importing Interfaces
import { ISong, ISongs, ICurrentSong } from "./interfaces";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  songs: ISongs;
  setSongs: React.Dispatch<React.SetStateAction<ISongs>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong | ICurrentSong>>;
  isPlaying: boolean;
  libraryStatus: boolean;
}

export default function Library({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
}: Props) {
  return (
    <div
      className={`fixed top-0 left-0 w-60 h-full shadow-sm overflow-scroll translate-x-full opacity-0 ${
        libraryStatus ? "translate-x-0 opacity-100" : ""
      }`}
    >
      <div>
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
}
