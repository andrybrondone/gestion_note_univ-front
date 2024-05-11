import clsx from "clsx";
import { useContext } from "react";
import { DarkModeContext } from "../../components/darkMode/DarkModeGlobal";

interface Props {
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?:
    | "black"
    | "white"
    | "gray"
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning";
  weight?: "regular" | "medium" | "bold";
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  variant = "h3",
  component: Component = "div",
  theme = "black",
  weight = "medium",
  className,
  children,
}: Props) => {
  const { isDarkMode } = useContext(DarkModeContext);

  let variantStyles: string = "",
    colorStyles: string = "",
    font: string = "";

  switch (variant) {
    case "display":
      variantStyles = "text-8xl max-lg:text-7xl max-sm:text-6xl";
      break;
    case "h1":
      variantStyles = "text-7xl max-lg:text-6xl max-sm:text-5xl";
      break;
    case "h2":
      variantStyles = "text-6xl max-lg:text-5xl max-sm:text-4xl";
      break;
    case "h3": //Default
      variantStyles = "text-5xl max-lg:text-4xl max-sm:text-3xl";
      break;
    case "h4":
      variantStyles = "text-4xl max-lg:text-3xl max-sm:text-2xl";
      break;
    case "h5":
      variantStyles = "text-3xl max-lg:text-2xl max-sm:text-lg";
      break;
    case "lead":
      variantStyles = "text-2xl max-lg:text-lg max-sm:text-base";
      break;
    case "body-lg":
      variantStyles = "text-lg max-lg:text-base max-sm:text-sm";
      break;
    case "body-base":
      variantStyles = "text-base max-lg:text-sm max-sm:text-caption1";
      break;
    case "body-sm":
      variantStyles = "text-sm max-lg:text-caption1 max-sm:text-caption2";
      break;
    case "caption1":
      variantStyles = "text-caption1 max-sm:text-caption2";
      break;
    case "caption2":
      variantStyles = "text-caption2 max-sm:text-caption3";
      break;
    case "caption3":
      variantStyles = "text-caption3 max-sm:text-caption4";
      break;
    case "caption4":
      variantStyles = "text-caption4";
      break;
  }
  switch (theme) {
    case "black": // Default
      colorStyles = "text-gray dark:text-white";
      break;
    case "gray":
      colorStyles = "text-gray-700";
      break;
    case "white":
      colorStyles = "text-white";
      break;
    case "primary":
      colorStyles = "text-primary";
      break;
    case "secondary":
      colorStyles = "text-secondary";
      break;
    case "danger":
      colorStyles = "text-alert-danger";
      break;
    case "success":
      colorStyles = "text-alert-success";
      break;
    case "warning":
      colorStyles = "text-alert-warning";
      break;
  }
  switch (weight) {
    case "regular": // Default
      font = "font-normal";
      break;
    case "medium":
      font = "font-medium";
      break;
    case "bold":
      font = "font-bold";
      break;
  }

  return (
    <Component
      className={clsx(
        variantStyles,
        colorStyles,
        font,
        className,
        isDarkMode && "dark"
      )}
    >
      {children}
    </Component>
  );
};
