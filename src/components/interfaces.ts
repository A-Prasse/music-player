export interface ISong {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  id: string;
  active: boolean;
}
export interface ICurrentSong extends ISong {}

export interface ISongs extends Array<ISong> {}
export interface ISongInfo {
  currentTime: number;
  duration: number;
}
