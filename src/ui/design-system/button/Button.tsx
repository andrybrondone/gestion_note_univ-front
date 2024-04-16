import clsx from "clsx";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LinkType } from "../../../lib/link-type";
import { IconProps } from "../../../types/iconProps";
import { DarkModeContext } from "../../components/darkMode/DarkModeGlobal";
import { Spinner } from "../spinner/Spinner";

interface Props {
  size?: "small" | "medium" | "large";
  variant?: "accent" | "secondary" | "outline" | "disabled" | "ico";
  icon?: IconProps;
  iconTheme?: "accent" | "secondary" | "gray";
  iconPosition?: "left" | "right";
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  baseUrl?: string;
  linkType?: LinkType;
  action?: () => void;
  type?: "button" | "submit";
  fullWith?: boolean;
  className?: string;
}

export const Button = ({
  className,
  size = "medium",
  variant = "accent",
  icon,
  iconTheme = "accent",
  iconPosition = "right",
  disabled,
  isLoading,
  children,
  baseUrl,
  linkType = "internal",
  type = "button",
  fullWith = false,
  action = () => {},
}: Props) => {
  const { isDarkMode } = useContext(DarkModeContext);
  let variantStyle: string = "",
    sizeStyle: string = "",
    icoSize: number = 0;

  switch (variant) {
    case "accent": // default
      variantStyle =
        "bg-primary dark:bg-primary-400 text-white hover:bg-primary-400 rounded dark:hover:shadow-primary-400";
      break;

    case "secondary":
      variantStyle =
        "text-primary rounded border border-primary dark:text-white dark:border-gray-700 dark:hover:shadow-darkgray";
      break;

    case "outline":
      variantStyle =
        "bg-white hover:bg-gray-400/50 border border-gray-500 text-gray-900 rounded";
      break;

    case "disabled":
      variantStyle =
        "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600/20 dark:text-white/50";
      break;

    case "ico":
      if (iconTheme === "accent") {
        variantStyle =
          "bg-primary hover:bg-primary-400 text-white rounded-full dark:bg-dark-primary";
      }
      if (iconTheme === "secondary") {
        variantStyle =
          "bg-primary-200 hover:bg-primary-300/50 text-primary rounded-full";
      }
      if (iconTheme === "gray") {
        variantStyle = "bg-gray-800 hover:bg-gray-700 text-white rounded-full";
      }
      break;
  }

  switch (size) {
    case "small":
      sizeStyle = `text-caption4 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[40px] h-[40px]"
          : "px-[14px] h-[40px]"
      }`;
      icoSize = 18;
      break;

    case "medium": // Default
      sizeStyle = `text-caption3 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[50px] h-[50px]"
          : "h-[45px] px-[13px]"
      }`;
      icoSize = 24;
      break;

    case "large":
      sizeStyle = `text-caption2 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[60px] h-[60px]"
          : "px-[20px] h-[50px]"
      }`;
      icoSize = 26;
      break;
  }

  const hundleClick = () => {
    if (action) {
      action();
    }
  };

  const buttonContent = (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {variant === "accent" || variant === "ico" ? (
            <Spinner size="small" variant="white" />
          ) : (
            <Spinner size="small" />
          )}
        </div>
      )}

      <div className={clsx(isLoading && "invisible")}>
        {icon && variant === "ico" ? (
          <icon.icon size={icoSize} />
        ) : (
          <div className={clsx(icon && "flex items-center gap-1")}>
            {icon && iconPosition === "left" && <icon.icon size={icoSize} />}
            {children}
            {icon && iconPosition === "right" && <icon.icon size={icoSize} />}
          </div>
        )}
      </div>
    </>
  );

  const buttonElement = (
    <button
      type={type}
      className={clsx(
        isDarkMode && "dark",
        className,
        variantStyle,
        sizeStyle,
        icoSize,
        isLoading || (disabled && "cursor-not-allowed"),
        fullWith && "w-full",
        "relative transition"
      )}
      onClick={hundleClick}
      disabled={disabled || isLoading ? true : false}
    >
      {buttonContent}
    </button>
  );

  if (baseUrl) {
    if (linkType === LinkType.EXTERNAL) {
      return (
        <a href={baseUrl} target="_blank">
          {buttonElement}
        </a>
      );
    } else {
      return <NavLink to={baseUrl}>{buttonElement}</NavLink>;
    }
  }

  return buttonElement;
};
