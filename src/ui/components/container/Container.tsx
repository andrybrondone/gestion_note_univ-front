import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({ children, className, id }: Props) => {
  return (
    <div
      id={id}
      className={clsx(className, "w-full max-w-7xl mx-auto px-5 lg:px-10")}
    >
      {children}
    </div>
  );
};
