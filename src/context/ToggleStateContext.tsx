import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ToggleStateContext = createContext({
  isState: false,
  toggleState: () => {},
});

export const ToggleStateProvider = ({ children }: Props) => {
  const [isState, setIsState] = useState(false);

  const toggleState = () => {
    setIsState(!isState);
  };
  return (
    <ToggleStateContext.Provider value={{ isState, toggleState }}>
      {children}
    </ToggleStateContext.Provider>
  );
};
