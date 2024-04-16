import clsx from "clsx";
import { useContext, useEffect } from "react";
import { RiMoonClearLine, RiSunFill } from "react-icons/ri";
import { DarkModeContext } from "./DarkModeGlobal";

export const ToggleBtn = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const element = document.querySelector(".toogle-anim");

    element?.classList.add("toogle-animated");

    const timeOut = setTimeout(() => {
      element?.classList.remove("toogle-animated");
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isDarkMode]);

  return (
    <div className={clsx(isDarkMode && "dark")}>
      <div className="cursor-pointer" onClick={toggleDarkMode}>
        <div className="toogle-anim">
          {isDarkMode ? (
            <RiMoonClearLine className="text-2xl text-secondary-300" />
          ) : (
            <RiSunFill className="text-alert-warning text-2xl" />
          )}
        </div>
      </div>
    </div>
  );
};
