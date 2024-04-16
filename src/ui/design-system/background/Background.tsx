import { DarkModeContext } from "@/ui/components/darkMode/DarkModeGlobal";
import clsx from "clsx";
import { useContext } from "react";

export const Background = () => {
  const elements = Array(50).fill(null);
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className={clsx("background dark:bg-gray", isDarkMode && "dark")}>
      {elements.map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
};
