import { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { ToggleNavContext } from "../../../context/ToggleNavContext";
import ActiveLink from "./ActiveLink";

export default function LinkMobile() {
  const { toggleNav } = useContext(ToggleNavContext);

  const clickMenuBurger = () => {
    const menutoggel = document.getElementById("menuBurger");
    menutoggel?.classList.toggle("active");

    toggleNav();
  };

  return (
    <>
      <div
        className="anim-transition fixed top-0 left-0 w-full h-[100vh] z-40"
        onClick={clickMenuBurger}
      ></div>

      <div className="bg-gray-300/60 backdrop-blur-sm shadow-lg dark:bg-black/60 dark-transition absolute top-[75px] rounded flex flex-col items-center gap-6 py-6 px-10 anim-transition w-full z-50 animation-nav">
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
