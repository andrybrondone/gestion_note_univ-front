import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "../../design-system/button/Button";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";

export default function NavBar() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      nom: "",
      id: 0,
      statut: "",
      statusAuth: false,
    });
    navigate("/");
  };

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

            {authState.statusAuth && (
              <>
                <ActiveLink
                  href="/accueil"
                  className="flex justify-center items-center gap-1"
                >
                  <AiOutlineHome />
                  Accueil
                </ActiveLink>
                <ActiveLink href="/etudiants">Etudiants</ActiveLink>
                <ActiveLink href="/enseignants">Enseignants</ActiveLink>
              </>
            )}
          </Typography>
          {authState.statusAuth && (
            <div className="flex items-center gap-2">
              <Button baseUrl="/inscription" variant="secondary">
                S'inscrir
              </Button>
              <Button
                variant="secondary"
                action={logOut}
                icon={{ icon: RiLogoutCircleLine }}
                iconPosition="left"
              >
                Deconnexion
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
