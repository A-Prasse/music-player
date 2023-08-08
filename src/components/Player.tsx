import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid";

export default function Player() {
  return (
    <div className="player">
      <div className="time-controll">
        <p>Start Time</p>
        <input type="range" className="range range-secondary" />
        <p>End Time</p>
      </div>
      <div className="play-controll">
        <BackwardIcon className="skip-back h-6 w-6 text-secondary" />
        <PlayIcon className="play h-6 w-6 text-secondary" />
        <PauseIcon className="pause h-6 w-6 text-secondary" />
        <ForwardIcon className="skip-forward h-6 w-6 text-secondary" />
      </div>
    </div>
  );
}
