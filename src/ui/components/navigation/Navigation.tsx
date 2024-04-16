import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  const location = useLocation();

  const isConnexion: boolean = useMemo(() => {
    return location.pathname !== "/";
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <Outlet />

      {isConnexion && <Footer />}
    </>
  );
};
