export interface ICurrentSong {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  id: string;
  active: boolean;
}
export interface ISongInfo {
  currentTime: number;
  duration: number;
}
