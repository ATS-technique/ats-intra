import React, { useContext } from "react";
import { NavbarContext } from "./Navbar";

interface NavbarItemProps {
  icon: React.ReactNode; // Peut être n'importe quel élément React, y compris les icônes de FontAwesome
  text: string; // Texte à afficher
  active?: boolean; // Optionnel, indique si l'élément est actif
  path?: string; // Optionnel, peut être un composant d'alerte ou tout autre élément React
}

const NavbarItem: React.FC<NavbarItemProps> = ({ icon, text, active, path }) => {
  const { expanded }: { expanded: boolean } = useContext(NavbarContext);
  return (
    <a href={path}>
      <li
        className={`relative flex items-center justify-center py-2 px-3 my-1 font-medium rounded-md cursor-pointertransition-colors group ${active ? "dark:bg-neutral-900 bg-neutral-200 text-neutral-800 dark:text-neutral-400" : "hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"} `}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-400 dark:text-neutral-200 text-sm invisible opacity-20-translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0  whitespace-nowrap`}
          >
            {text}
          </div>
        )}
      </li>
    </a>
  );
};

export default NavbarItem;
