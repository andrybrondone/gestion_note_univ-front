import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ToggleNavContext = createContext({
  isMobile: false,
  toggleNav: () => {},
});

export const ToggleNavProvider = ({ children }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleNav = () => {
    setIsMobile(!isMobile);
  };
  return (
    <ToggleNavContext.Provider value={{ isMobile, toggleNav }}>
      {children}
    </ToggleNavContext.Provider>
  );
};
