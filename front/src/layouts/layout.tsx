import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import NavbarItem from "../components/navbar/NavbarItem";
import { Home, Calendar, UserPen, Globe, ClipboardList, Lock } from "lucide-react";
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
          <NavbarItem
            icon={<Lock size={20} />}
            text="Administration"
            path={MyPaths.ADMIN}
            active={location.pathname === MyPaths.ADMIN}
          />
          <NavbarItem
            icon={<UserPen size={20} />}
            text="Clients"
            path={MyPaths.CLIENT}
            active={location.pathname === MyPaths.CLIENT}
          />
          <NavbarItem
            icon={<ClipboardList size={20} />}
            text="Commandes"
            path={MyPaths.ORDERS}
            active={location.pathname === MyPaths.ORDERS}
          />
          <NavbarItem
            icon={<Globe size={20} />}
            text="Site Web"
            path={MyPaths.MANAGE_WEBSITE}
            active={location.pathname === MyPaths.MANAGE_WEBSITE}
          />
          <NavbarItem
            icon={<Globe size={20} />}
            text="Produits"
            path={MyPaths.PRODUCTS}
            active={location.pathname === MyPaths.PRODUCTS}
          />
        </Navbar>
        {children}
      </div>
    </>
  );
}

export default Layout;
