import { Shell, Sun, Moon, BellRing } from "lucide-react";
import { useAppStore } from "../store";

type Props = {};

const Header = (props: Props) => {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  return (
    <header className="">
      <div className="bg-white dark:bg-slate-800 mx-auto flex flex-none h-16 min-w-sm max-w-md items-center gap-6 px-4 sm:px-6 justify-between border-b border-gray-100 dark:border-slate-700">
        {/* logo */}
        <div className="flex font-medium text-2xl font-pacifico ml-2">
          <BellRing size={30} className="text-slate-700 dark:text-slate-500 rotate-15" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-500 dark:to-white from-black to-slate-500">
            remind.me
          </span>
        </div>

        <button
          className="items-center justify-end cursor-pointer rounded-full flex gap-2 dark:text-white text-black"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun /> : <Moon />}
          <span className="text-xs hidden md:block">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
