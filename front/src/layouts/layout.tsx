import { PropsWithChildren } from "react";
import Navbar from "../components/navbar/navbar";

type PublicLayoutProps = PropsWithChildren;

function Layout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
