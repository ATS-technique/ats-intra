import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import NavbarItem from "../components/navbar/NavbarItem";
import { Home, Calendar, UserPen } from "lucide-react";
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
            text="Planning Atelier"
            path={MyPaths.PLANNING_ATELIER}
            active={location.pathname === MyPaths.PLANNING_ATELIER}
          />
          <NavbarItem
            icon={<Calendar size={20} />}
            text="Planning Pose"
            path={MyPaths.PLANNING_POSE}
            active={location.pathname === MyPaths.PLANNING_POSE}
          />
          <NavbarItem
            icon={<UserPen size={20} />}
            text="Administration"
            path={MyPaths.ADMIN}
            active={location.pathname === MyPaths.ADMIN}
          />
        </Navbar>
        {children}
      </div>
    </>
  );
}

export default Layout;
