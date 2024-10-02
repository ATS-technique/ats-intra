import { useState, useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { NavbarContext } from "./Navbar";
import { FetchAPI } from "../methods/fetch";
import { updateScreenMode } from "../../constants/fetchMethods";

function ToggleDarkModeButton() {
  const screenMode = localStorage.getItem('screenMode');
  const isDark = screenMode === "dark" ? true : false;
  const loggedUser = localStorage.getItem("loggedUser");


  const [dark, setDark] = useState(!isDark);

  if(isDark){
    document.body.classList.add("dark");
  }

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
    localStorage.setItem("screenMode", dark ? "dark" : "light");
    
    updateDarkMode();

  };

  async function updateDarkMode(): Promise<void> {
    
        updateScreenMode.body.id = Number(loggedUser);
        updateScreenMode.body.screenMode = JSON.stringify(dark);
        await FetchAPI(updateScreenMode) as { message: string }[];    
    
  }

  const { expanded }: { expanded: boolean } = useContext(NavbarContext);

  return (
    <div className="flex px-3">
      <div
        onClick={() => darkModeHandler()}
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-neutral-100  dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400`}
      >
        {isDark ? <Moon size={24} /> : <Sun size={24} />}

        <div
          className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}
        >
          <div className="leading-4 font-medium">
            <span>{dark ? "Mode Sombre" : "Mode Clair"}</span>
          </div>
        </div>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-400 text-sm invisible opacity-20-translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0  whitespace-nowrap`}
          >
            <span>{dark ?"Mode Sombre" : "Mode Clair"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ToggleDarkModeButton;
