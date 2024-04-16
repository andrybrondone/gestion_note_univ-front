import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ShowFormContext = createContext({
  isOpenFormEt: false,
  toggleFormEt: () => {},
  isOpenFormEns: false,
  toggleFormEns: () => {},
});

export const ShowFormProvider = ({ children }: Props) => {
  const [isOpenFormEt, setIsOpenFormEt] = useState(false);
  const [isOpenFormEns, setIsOpenFormEns] = useState(false);

  const toggleFormEt = () => {
    setIsOpenFormEt(!isOpenFormEt);
  };
  const toggleFormEns = () => {
    setIsOpenFormEns(!isOpenFormEns);
  };

  return (
    <ShowFormContext.Provider
      value={{ isOpenFormEt, toggleFormEt, isOpenFormEns, toggleFormEns }}
    >
      {children}
    </ShowFormContext.Provider>
  );
};
