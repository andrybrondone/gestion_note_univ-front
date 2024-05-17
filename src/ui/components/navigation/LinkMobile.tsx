import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { ToggleNavContext } from "../../../context/ToggleNavContext";
import { DarkModeContext } from "../darkMode/DarkModeGlobal";
import { ToggleBtn } from "../darkMode/ToggleBtn";
import ActiveLink from "./ActiveLink";

export default function LinkMobile() {
  const { toggleNav } = useContext(ToggleNavContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const clickMenuBurger = () => {
    const menutoggel = document.getElementById("menuBurger");
    menutoggel?.classList.toggle("active");

    toggleNav();
  };

  return (
    <>
      <div
        className="anim-transition absolute top-0 left-0 w-full h-[100vh] z-40"
        onClick={clickMenuBurger}
      ></div>

      <div className="bg-gray-300/60 backdrop-blur-sm shadow-lg dark:bg-black/60 dark-transition absolute top-[75px] rounded flex flex-col items-center gap-6 py-6 px-10 anim-transition w-full z-50 animation-nav">
        <div className="flex items-center gap-4 border-b-2 border-gray-700 pb-4">
          {isDarkMode ? (
            <h1>Passer en mode claire</h1>
          ) : (
            <h1>Passer en mode sombre</h1>
          )}

          <ToggleBtn />
        </div>

        <ActiveLink
          href="/accueil"
          className="flex justify-center items-center gap-1"
          onClick={clickMenuBurger}
        >
          <AiOutlineHome />
          Accueil
        </ActiveLink>
        <ActiveLink href="/etudiants" onClick={clickMenuBurger}>
          Etudiants
        </ActiveLink>
        <ActiveLink href="/enseignants" onClick={clickMenuBurger}>
          Enseignants
        </ActiveLink>
      </div>
    </>
  );
}
