import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useScreenSize } from "../../../hook/useScreenSize";
import { LinkType } from "../../../lib/link-type";
import { IconProps } from "../../../types/iconProps";
import { Spinner } from "../spinner/Spinner";

interface Props {
  variant?:
    | "accent"
    | "secondary"
    | "outline"
    | "disabled"
    | "ico"
    | "warning"
    | "update"
    | "delete"
    | "blue";
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
  const size = useScreenSize();

  let sizeForScreen;
  switch (size) {
    case "lg": // default
      sizeForScreen = "large";
      break;
    case "md":
      sizeForScreen = "medium";
      break;
    case "sm":
      sizeForScreen = "small";
      break;
  }

  const sizeAdjusted = sizeForScreen; // Taille ajustée en fonction de la taille de l'écran

  let variantStyle: string = "",
    sizeStyle: string = "",
    icoSize: number = 0;

  if (disabled) {
    variant = "disabled";
  }

  switch (variant) {
    case "accent": // default
      variantStyle =
        "bg-primary hover:bg-primary-400 border border-primary  dark:bg-primary-400 text-white rounded dark:hover:shadow-primary-400";
      break;

    case "secondary":
      variantStyle =
        "text-primary dark:text-primary-300 hover:bg-primary-400 dark:hover:bg-primary-400 dark:hover:text-white hover:text-white rounded border border-primary dark:border-primary-300 dark:hover:border-primary-400";
      break;

    case "warning":
      variantStyle =
        "text-alert-warning rounded border border-alert-warning hover:bg-alert-warning hover:text-white dark:text-white dark:border-gray-700 dark:hover:shadow-darkgray";
      break;

    case "outline":
      variantStyle =
        "bg-white hover:bg-gray-400/60 border border-gray-600 text-gray-900 rounded";
      break;

    case "disabled":
      variantStyle =
        "bg-gray-400 border border-gray-500 text-gray-600 rounded cursor-not-allowed dark:bg-gray-700 dark:border-gray-600/20 dark:text-white/50";
      break;

    case "update":
      variantStyle =
        "border border-alert-warning text-alert-warning hover:bg-alert-warning hover:text-white  rounded py-2 px-3 cursor-pointer";
      break;
    case "delete":
      variantStyle =
        "border border-alert-danger text-alert-danger hover:bg-alert-danger hover:text-white rounded py-2 px-3 cursor-pointer";
      break;
    case "blue":
      variantStyle =
        "border border-secondary-blue text-secondary-blue hover:bg-secondary-blue hover:text-white rounded py-2 px-3 cursor-pointer";
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

  switch (
    sizeAdjusted // Utilisation de la taille ajustée
  ) {
    case "small":
      sizeStyle = `text-caption3 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[50px] h-[50px]"
          : "flex justify-center items-center h-[42px] px-[12px]"
      }`;
      variant === "ico" ? (icoSize = 22) : (icoSize = 19);
      break;

    case "medium": // Default
      sizeStyle = `text-caption2 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[54px] h-[54px]"
          : "flex justify-center items-center h-[45px] px-[16px]"
      }`;
      variant === "ico" ? (icoSize = 24) : (icoSize = 21);
      break;

    case "large":
      sizeStyle = `text-caption1 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[58px] h-[58px]"
          : "flex justify-center items-center px-[17px] h-[47px]"
      }`;
      variant === "ico" ? (icoSize = 26) : (icoSize = 22);
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
