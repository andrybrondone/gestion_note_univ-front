import { DarkModeContext } from "@/ui/components/darkMode/DarkModeGlobal";
import clsx from "clsx";
import { useContext } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  padding_x?: string;
  padding_y?: string;
}

export const Box = ({
  children,
  className,
  padding_x = "px-9",
  padding_y = "py-9",
}: Props) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={clsx(
        isDarkMode && "dark",
        "border border-gray-400 shadow rounded dark:border-gray-800  dark:shadow dark:shadow-gray-800",
        padding_x,
        padding_y,
        className
      )}
    >
      {children}
    </div>
  );
};
