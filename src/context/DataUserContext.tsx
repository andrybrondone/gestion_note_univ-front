import React, { createContext, SetStateAction, useState } from "react";

interface DataUser {
  id: number;
  nom: string;
  statut: "etudiant" | "enseignant" | "administrateur" | "";
  statusAuth: boolean;
  niveau: string;
  matricule: string;
  parcours: string;
}

interface DataUserContextProps {
  dataUser: DataUser;
  setDataUser: React.Dispatch<SetStateAction<DataUser>>;
}

interface Props {
  children: React.ReactNode;
}

export const DataUserContext = createContext<DataUserContextProps>({
  dataUser: {
    id: 0,
    nom: "",
    statut: "",
    statusAuth: false,
    niveau: "",
    matricule: "",
    parcours: "",
  },
  setDataUser: () => {},
});

export const DataUserProvider = ({ children }: Props) => {
  const [dataUser, setDataUser] = useState<DataUser>({
    id: 0,
    nom: "",
    statut: "",
    statusAuth: false,
    niveau: "",
    matricule: "",
    parcours: "",
  });

  return (
    <DataUserContext.Provider value={{ dataUser, setDataUser }}>
      {children}
    </DataUserContext.Provider>
  );
};
