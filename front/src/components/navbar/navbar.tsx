import logoHorizontal from "../../assets/Logos/horizontal-logo.png";
import { ChevronFirst, ChevronLast, User } from "lucide-react";
import { createContext, useState } from "react";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../contexts/AuthContext";

interface NavbarContextType {
  expanded: boolean;
  toggleExpanded: () => void; // Function to toggle the expanded state
}

export const NavbarContext = createContext<NavbarContextType>({
  expanded: true, // Default value for expanded
  toggleExpanded: () => {}, // Placeholder function
});

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(true);
  const loggedUserName = localStorage.getItem("name");
  const { logout } = useAuth();

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r dark:border-neutral-900 shadow-sm dark:bg-neutral-800">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src={logoHorizontal} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <NavbarContext.Provider value={{ expanded, toggleExpanded: () => setExpanded((curr) => !curr) }}>
          <ul className="flex-1 px-3">{children}</ul>
        </NavbarContext.Provider>
        <NavbarContext.Provider value={{ expanded, toggleExpanded: () => setExpanded((curr) => !curr) }}>
          <ToggleDarkModeButton />
        </NavbarContext.Provider>

        <div className="border-t dark:border-neutral-900 flex py-2 px-3">
          <a
            href=""
            className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
          >
            <div className="rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 p-1 border-2  border-neutral-400">
              <User size={12} />
            </div>
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}
            >
              <div className="leading-4 flex justify-between w-full">
                <h4 className="font-semibold text-neutral-700 dark:text-neutral-400">{loggedUserName}</h4>
                <div>
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="hover:text-neutral-800 dark:hover:text-neutral-200 dark:text-neutral-400"
                    onClick={logout}
                  />
                </div>
              </div>
            </div>
            {!expanded && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-400 text-sm invisible opacity-20-translate-x-3 w-auto transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap`}
              >
                {loggedUserName}
              </div>
            )}
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
