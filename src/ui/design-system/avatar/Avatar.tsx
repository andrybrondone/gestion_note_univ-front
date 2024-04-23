import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large" | "very-large";
  src: string;
  alt: string;
}

export const Avatar = ({ size = "medium", src, alt }: Props) => {
  let sizeStyle: string;

  switch (size) {
    case "small":
      sizeStyle = "w-[40px] h-[40px]";
      break;
    case "medium": //default
      sizeStyle = "w-[60px] h-[60px]";
      break;
    case "large":
      sizeStyle = "w-[80px] h-[80px]";
      break;
    case "very-large":
      sizeStyle = "w-[130px] h-[130px]";
      break;
  }

  return (
    <div className={clsx(sizeStyle, "bg-gray-300 rounded-full relative")}>
      <img
        src={src}
        alt={alt}
        className={clsx(
          sizeStyle,
          "rounded-full object-cover object-center absolute"
        )}
      />
    </div>
  );
};
