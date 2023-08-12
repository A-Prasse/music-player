//Importing Interfaces
import { ISong, ICurrentSong, ISongs } from "./interfaces";
interface Props {
  songs: ISongs;
  setSongs: React.Dispatch<React.SetStateAction<ISongs>>;
  song: ISong;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong | ICurrentSong>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  id: string;
}

export default function LibrarySong({
  songs,
  setSongs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  id,
}: Props) {
  const handleSongSelect = async () => {
    await setCurrentSong(song);
    //Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) audioRef.current?.play();
  };

  return (
    <div
      onClick={handleSongSelect}
      className={`h-5/6 flex flex-col items-center justify-center cursor-pointer rounded-3xl hover:bg-primary ${
        song.active ? "bg-primary-focus" : ""
      }`}
    >
      <img
        src={song.cover}
        alt={song.name}
        className="w-2/6 mt-3 rounded-full text-center"
      ></img>
      <h3 className="p-2 text-2xl text-secondary">{song.name}</h3>
      <h4 className="mb-3 pr-2 pb-2 pl-2">{song.artist}</h4>
    </div>
  );
}
