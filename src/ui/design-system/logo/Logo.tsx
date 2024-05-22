import clsx from "clsx";
import noteImg from "/assets/images/note.png";

interface Props {
  size?: "very-small" | "small" | "medium" | "large";
  className?: string;
}

export const Logo = ({ size = "medium", className }: Props) => {
  let sizeLogo: number;

  switch (size) {
    case "very-small":
      sizeLogo = 34;
      break;
    case "small":
      sizeLogo = 40;
      break;
    case "medium": //default
      sizeLogo = 88;
      break;
    case "large":
      sizeLogo = 140;
      break;
  }

  return (
    <>
      <img
        src={noteImg}
        alt="Logo note"
        width={sizeLogo}
        className={clsx(className)}
      />
    </>
  );
};
