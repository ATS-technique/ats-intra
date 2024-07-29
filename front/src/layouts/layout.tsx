import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import NavbarItem from "../components/navbar/NavbarItem";
import { Home, Calendar } from "lucide-react";
import MyPaths from "../MyPaths";

type PublicLayoutProps = PropsWithChildren;

function Layout({ children }: PublicLayoutProps) {
  const location = useLocation();

  return (
    <>
      <div className="flex">
        <Navbar>
          <NavbarItem
            icon={<Home size={20} />}
            text="Accueil"
            path={MyPaths.ACCUEIL}
            active={location.pathname === MyPaths.ACCUEIL}
          />
          <NavbarItem
            icon={<Calendar size={20} />}
            text="Planning"
            path={MyPaths.PLANNING}
            active={location.pathname === MyPaths.PLANNING}
          />
        </Navbar>
        {children}
      </div>
    </>
  );
}

export default Layout;
