import React, { createContext, SetStateAction, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: true,
  setIsLoading: () => {},
});

export const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
