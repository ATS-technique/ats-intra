import logoHorizontal from "../../assets/Logos/horizontal-logo.png";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState } from "react";
import userIcon from "../../assets/user-icon.png";

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
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src={logoHorizontal} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <NavbarContext.Provider value={{ expanded, toggleExpanded: () => setExpanded((curr) => !curr) }}>
          <ul className="flex-1 px-3">{children}</ul>
        </NavbarContext.Provider>

        <div className="border-t flex p-3">
          <img src={userIcon} className="w-10 h-10" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-700">Username</h4>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
