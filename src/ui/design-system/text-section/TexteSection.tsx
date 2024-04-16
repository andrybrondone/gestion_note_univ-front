import clsx from "clsx";
import { Typography } from "../typography/Typography";

interface Props {
  title: string;
  className?: string;
}

export const TexteSection = ({ title, className }: Props) => {
  return (
    <Typography
      variant="h1"
      component="h1"
      theme="gray"
      className={clsx(className, "text-center")}
    >
      {title}
    </Typography>
  );
};
