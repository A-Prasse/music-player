//Importing Interfaces
import { ICurrentSong } from "./interfaces";
interface Props {
  currentSong: ICurrentSong;
}

export default function Song({ currentSong }: Props) {
  return (
    <div className="h-5/6 flex flex-col items-center justify-center">
      <img
        src={currentSong.cover}
        alt={currentSong.name}
        className="w-2/6 mt-6 rounded-full text-center"
      ></img>
      <h2 className="pt-8 pr-4 pb-4 pl-4 text-3xl text-secondary">
        {currentSong.name}
      </h2>
      <h3 className="mb-6 pr-4 pb-4 pl-4">{currentSong.artist}</h3>
    </div>
  );
}
