import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { LinkType } from "../../../lib/link-type";
import { IconProps } from "../../../types/iconProps";
import { Spinner } from "../spinner/Spinner";

interface Props {
  size?: "small" | "medium" | "large";
  variant?:
    | "accent"
    | "secondary"
    | "outline"
    | "disabled"
    | "ico"
    | "warning"
    | "update"
    | "delete";
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
        "text-primary hover:bg-primary dark:hover:bg-gray-900 hover:text-white rounded border border-primary dark:text-white dark:border-gray-700 dark:hover:shadow-darkgray";
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
        "border text-alert-warning rounded py-2 px-3 cursor-pointer";
      break;
    case "delete":
      variantStyle =
        "border text-alert-danger hover:bg-alert-danger hover:text-white rounded py-2 px-3 cursor-pointer";
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
      sizeStyle = `text-caption3 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[40px] h-[40px]"
          : "flex justify-center items-center px-[14px] h-[40px]"
      }`;
      icoSize = 18;
      break;

    case "medium": // Default
      sizeStyle = `text-caption2 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[50px] h-[50px]"
          : "flex justify-center items-center h-[45px] px-[16px]"
      }`;
      icoSize = 22;
      break;

    case "large":
      sizeStyle = `text-caption1 font-medium ${
        variant === "ico"
          ? "flex items-center justify-center w-[60px] h-[60px]"
          : "flex justify-center items-center px-[20px] h-[50px]"
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
