import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import NavBar from "./NavBar";

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
