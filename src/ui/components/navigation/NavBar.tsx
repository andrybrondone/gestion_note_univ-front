import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RiAccountPinCircleLine, RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { DataUserContext } from "../../../context/DataUserContext";
import { ToggleNavContext } from "../../../context/ToggleNavContext";
import { ToggleStateContext } from "../../../context/ToggleStateContext";
import useToggle from "../../../hook/useToggle";
import { url_api } from "../../../utils/url-api";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";
import LinkMobile from "./LinkMobile";

interface PhotoProps {
  photo: string;
}

export default function NavBar() {
  const { isMobile, toggleNav } = useContext(ToggleNavContext);
  const { isState } = useContext(ToggleStateContext);

  const [photoById, setPhotoById] = useState({} as PhotoProps);

  const { value: menu, toggleValue: toggleMenu } = useToggle(false);
  const { getListPersonneEtById, getListPersonneEnsById, getListPersonneById } =
    useContext(DataFetcherByIdContext);
  const { setToken } = useContext(AuthContext);
  const { dataUser, setDataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  const handleClickShowProfile = async (id: number) => {
    if (dataUser.statut === "etudiant") {
      await getListPersonneEtById(id);
      toggleMenu();
    } else if (dataUser.statut === "enseignant") {
      await getListPersonneEnsById(id);
      toggleMenu();
    } else if (dataUser.statut === "administrateur") {
      await getListPersonneById(id);
      toggleMenu();
    } else {
      null;
    }
  };

  const logOut = () => {
    setToken(null);
    setDataUser({
      nom: "",
      id: 0,
      statut: "",
      statusAuth: false,
      niveau: "",
      matricule: "",
      parcours: "",
    });
    toggleMenu();
    navigate("/");
  };

  useEffect(() => {
    if (dataUser.id !== 0) {
      axios
        .get(`${url_api}/personne/photo/${dataUser.id}`)
        .then(async (response) => {
          setPhotoById(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dataUser.id, isState]);

  const clickMenuBurger = () => {
    const menutoggel = document.getElementById("menuBurger");
    menutoggel?.classList.toggle("active");
    toggleNav();
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
            <Logo size="small" className="max-md:w-[33px]" />
            <div className="flex flex-col">
              <Typography
                weight="bold"
                variant="h4"
                component="h2"
                className="text-gray dark:text-white max-[418px]:hidden"
              >
                Gestion de note
              </Typography>
              <Typography
                variant="caption2"
                component="p"
                className="text-gray-600 dark:text-gray-600 max-md:hidden"
              >
                D'un établissement universitaire
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <ToggleBtn />

            <Typography
              weight="medium"
              variant="caption1"
              component="div"
              className="flex items-center gap-5 dark:text-white max-md:hidden"
            >
              {dataUser.statusAuth && (
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
            {dataUser.statusAuth && (
              <div className="flex items-center gap-5">
                {/* <div className="relative cursor-pointer text-[23px] dark:text-white">
                  <RiNotification3Line />
                  <p className="absolute  -top-1 -right-1 text-[10px] px-[5px] py-[0.3px] text-white bg-alert-danger rounded-full">
                    1
                  </p>
                </div> */}
                <div>
                  <div onClick={() => handleClickShowProfile(dataUser.id)}>
                    <Avatar
                      size="small"
                      src={`${url_api}/images/${photoById.photo}`}
                      alt=""
                      className="cursor-pointer"
                    />
                  </div>
                  {menu && (
                    <Typography
                      variant="caption1"
                      component="div"
                      className="absolute dark:bg-black bg-white/80 px-6 py-2 shadow rounded flex flex-col gap-2.5 right-2 z-[100]"
                    >
                      <Link to="/information-compte" onClick={toggleMenu}>
                        <p className="flex items-center gap-2 hover:text-secondary-600 transition">
                          <RiAccountPinCircleLine className="text-base" /> Mon
                          compte
                        </p>
                      </Link>
                      <p
                        className="cursor-pointer flex items-center gap-2 hover:text-secondary-600 transition"
                        onClick={logOut}
                      >
                        <RiLogoutCircleLine className="text-base" />
                        Déconnexion
                      </p>
                    </Typography>
                  )}
                </div>
                <div
                  id="menuBurger"
                  className="toggle z-50 md:hidden"
                  onClick={clickMenuBurger}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
      {isMobile && dataUser.statusAuth && <LinkMobile />}
    </>
  );
}
