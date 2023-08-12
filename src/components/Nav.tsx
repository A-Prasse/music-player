//Import Icon
import { MusicalNoteIcon } from "@heroicons/react/24/solid";

interface Props {
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ libraryStatus, setLibraryStatus }: Props) {
  return (
    <nav className="h-1/5 flex justify-around items-center">
      <button
        onClick={() => setLibraryStatus(!libraryStatus)}
        className="btn bg-secondary z-0"
      >
        Library
        <MusicalNoteIcon className="h-6 w-6 text-primary" />
      </button>
    </nav>
  );
}
