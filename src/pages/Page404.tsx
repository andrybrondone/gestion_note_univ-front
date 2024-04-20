import clsx from "clsx";
import { useContext } from "react";
import { DarkModeContext } from "../ui/components/darkMode/DarkModeGlobal";
import { Typography } from "../ui/design-system/typography/Typography";
import error404 from "/assets/images/error-404.png";

export function Page404() {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={clsx("py-10 flex flex-col items-center", isDarkMode && "dark")}
    >
      <img src={error404} alt="Page introuvable" className="w-[400px]" />
      <Typography variant="body-lg" component="p">
        Oops cette page n'existe pas !
      </Typography>
    </div>
  );
}
