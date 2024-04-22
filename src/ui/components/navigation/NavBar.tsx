import { useMemo } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../../design-system/button/Button";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";

export default function NavBar() {
  const location = useLocation();

  const isConnexion: boolean = useMemo(() => {
    return location.pathname !== "";
  }, [location.pathname]);

  return (
    <div className="border-b-2 border-gray-400 dark:border-gray-800 dark:bg-gray-900">
      <Container className="flex items-center justify-between py-3 gap-7 transition">
        <NavLink to="/">
          <div className="flex items-center gap-2.5">
            <Logo size="small" />
            <div className="flex flex-col">
              <Typography
                variant="h4"
                component="h2"
                className="text-gray font-bold dark:text-white"
              >
                Gestion de note
              </Typography>
              <Typography
                variant="caption2"
                component="p"
                className="text-gray-600 dark:text-gray-600"
              >
                D'un établissement universitaire
              </Typography>
            </div>
          </div>
        </NavLink>
        <div className="flex items-center gap-8">
          <Typography
            variant="caption1"
            component="div"
            className="flex items-center gap-5 dark:text-white"
          >
            <ToggleBtn />

            {isConnexion && (
              <>
                <ActiveLink
                  href="/"
                  className="flex justify-center items-center"
                >
                  <AiOutlineHome className="relative bottom-[1px] right-1" />
                  Home
                </ActiveLink>
                <ActiveLink href="/voiture">Voiture</ActiveLink>
                <ActiveLink href="/contact">Contact</ActiveLink>
              </>
            )}
          </Typography>
          {isConnexion && (
            <div className="flex items-center gap-2">
              <Button baseUrl="/inscription" variant="secondary">
                S'inscrir
              </Button>
              <Button baseUrl="/connection">Se connecter</Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
