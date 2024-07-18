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
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointertransition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-gray-600"} `}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20-translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </a>
  );
};

export default NavbarItem;
