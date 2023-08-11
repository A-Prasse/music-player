import LibrarySong from "./LibrarySong";

//Importing Interfaces
import { ISong, ISongs, ICurrentSong } from "./interfaces";

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>;
  songs: ISongs;
  setSongs: React.Dispatch<React.SetStateAction<ISongs>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong | ICurrentSong>>;
  isPlaying: boolean;
}

export default function Library({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}: Props) {
  return (
    <div className="fixed top-0 left-0 w-80 h-full overflow-scroll">
      <h2 className="text-center text-4xl text-secondary">Library</h2>
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
