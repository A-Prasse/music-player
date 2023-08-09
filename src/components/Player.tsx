import { PlayIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid";

export default function Player() {
  return (
    <div className="h-20 flex flex-col items-center justify-between">
      <div className="w-1/2 flex items-center">
        <p className="text-center">Start Time</p>
        <input type="range" className="range range-secondary ml-3 mr-3" />
        <p className="text-center">End Time</p>
      </div>
      <div className="w-1/3 flex justify-between items-center p-4">
        <BackwardIcon className="h-6 w-6 text-secondary cursor-pointer" />
        <PlayIcon className="h-6 w-6 text-secondary cursor-pointer" />
        <ForwardIcon className="h-6 w-6 text-secondary cursor-pointer" />
      </div>
    </div>
  );
}
