import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ShowFormContext = createContext({
  // etudiant
  isOpenFormEt: false,
  toggleFormEt: () => {},
  //Enseignant
  isOpenFormEns: false,
  toggleFormEns: () => {},
  // Matière
  isOpenFormMatiere: false,
  toggleFormMatiere: () => {},
  // Module
  isOpenFormModule: false,
  toggleFormModule: () => {},
  // Note
  isOpenFormNote: false,
  toggleFormNote: () => {},
});

export const ShowFormProvider = ({ children }: Props) => {
  const [isOpenFormEt, setIsOpenFormEt] = useState(false);
  const [isOpenFormEns, setIsOpenFormEns] = useState(false);
  const [isOpenFormMatiere, setIsOpenFormMatiere] = useState(false);
  const [isOpenFormModule, setIsOpenFormModule] = useState(false);
  const [isOpenFormNote, setIsOpenFormNote] = useState(false);

  const toggleFormEt = () => {
    setIsOpenFormEt(!isOpenFormEt);
  };
  const toggleFormEns = () => {
    setIsOpenFormEns(!isOpenFormEns);
  };
  const toggleFormMatiere = () => {
    setIsOpenFormMatiere(!isOpenFormMatiere);
  };
  const toggleFormModule = () => {
    setIsOpenFormModule(!isOpenFormModule);
  };
  const toggleFormNote = () => {
    setIsOpenFormNote(!isOpenFormNote);
  };

  return (
    <ShowFormContext.Provider
      value={{
        isOpenFormEt,
        toggleFormEt,
        isOpenFormEns,
        toggleFormEns,
        isOpenFormMatiere,
        toggleFormMatiere,
        isOpenFormModule,
        toggleFormModule,
        isOpenFormNote,
        toggleFormNote,
      }}
    >
      {children}
    </ShowFormContext.Provider>
  );
};
