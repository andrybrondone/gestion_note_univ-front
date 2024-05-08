import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiAccountPinCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import useToggle from "../../../hook/useToggle";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";

export default function NavBar() {
  const { value: menu, toggleValue: toggleMenu } = useToggle(false);
  const { getListPersonneEtById, getListPersonneEnsById, getListPersonneById } =
    useContext(DataFetcherByIdContext);
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowProfile = async (id: number) => {
    if (authState.statut === "etudiant") {
      await getListPersonneEtById(id);
      toggleMenu();
    } else if (authState.statut === "enseignant") {
      await getListPersonneEnsById(id);
      toggleMenu();
    } else if (authState.statut === "administrateur") {
      await getListPersonneById(id);
      toggleMenu();
    } else {
      null;
    }
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      nom: "",
      id: 0,
      statut: "",
      statusAuth: false,
      niveau: "",
      matricule: "",
      parcours: "",
    });
    navigate("/");
  };

  return (
    <>
      {menu && (
        <div
          className="anim-transition top-0 left-0 w-full h-[100vh] absolute z-20"
          onClick={toggleMenu}
        ></div>
      )}
      <div className="border-b-2 border-gray-400 dark:border-gray-800 dark:bg-gray-900">
        <Container className="flex items-center justify-between py-3 max-sm:py-2 gap-7 transition">
          <div className="flex items-center gap-2.5 max-sm:gap-1.5">
            <Logo size="very-small" />
            <div className="flex flex-col">
              <Typography
                weight="bold"
                variant="h4"
                component="h2"
                className="text-gray dark:text-white max-sm:text-3xl max-sm:font-bold"
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
          <div className="flex items-center gap-5">
            <Typography
              weight="medium"
              variant="caption1"
              component="div"
              className="flex items-center gap-5 dark:text-white max-md:hidden"
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
              <div className="flex items-center gap-5">
                <div className="max-md:hidden">
                  <div onClick={() => handleClickShowProfile(authState.id)}>
                    <Avatar
                      size="small"
                      src="http://localhost:3001/images/default_photo.jpg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </div>
                  {menu && (
                    <div className="absolute text-caption1 bg-white/80 px-6 py-2 shadow rounded leading-8 z-30 right-2">
                      <Link to="/information-compte" onClick={toggleMenu}>
                        <p className="flex items-center gap-1 hover:text-secondary-600 transition">
                          <RiAccountPinCircleLine className="text-base" /> Mon
                          compte
                        </p>
                      </Link>
                      <p
                        className="cursor-pointer flex items-center gap-1 hover:text-secondary-600 transition"
                        onClick={logOut}
                      >
                        <RiLogoutCircleLine className="text-base" />
                        Déconnexion
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
