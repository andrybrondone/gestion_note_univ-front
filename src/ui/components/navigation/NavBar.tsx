import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Button } from "../../design-system/button/Button";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";

export default function NavBar() {
  const { getListEtudiantById, getListEnseignantById } = useContext(
    DataFetcherByIdContext
  );
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClickShowProfile = async (id: number) => {
    if (authState.statut === "etudiant") {
      await getListEtudiantById(id);
    } else if (authState.statut === "enseignant") {
      getListEnseignantById(id);
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
    });
    navigate("/");
  };

  return (
    <div className="border-b-2 border-gray-400 dark:border-gray-800 dark:bg-gray-900">
      <Container className="flex items-center justify-between py-3 gap-7 transition">
        <div className="flex items-center gap-2.5">
          <Logo size="small" />
          <div className="flex flex-col">
            <Typography
              weight="bold"
              variant="h4"
              component="h2"
              className="text-gray dark:text-white"
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
            <div className="flex items-center gap-5">
              <div onClick={() => handleClickShowProfile(authState.id)}>
                <Link to="/information-compte">
                  <Avatar
                    size="small"
                    src="http://localhost:3001/images/default_photo.jpg"
                    alt=""
                    className="cursor-pointer"
                  />
                </Link>
              </div>
              <Button
                variant="update"
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
