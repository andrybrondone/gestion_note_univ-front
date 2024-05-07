import React, { createContext, SetStateAction, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({
  authState: {
    nom: "",
    id: 0,
    statut: "",
    statusAuth: false,
    niveau: "",
    matricule: "",
    parcours: "",
  },
  setAuthState: {} as React.Dispatch<
    SetStateAction<{
      nom: string;
      id: number;
      statut: string;
      statusAuth: boolean;
      niveau: string;
      matricule: string;
      parcours: string;
    }>
  >,
});

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState({
    nom: "",
    id: 0,
    statut: "",
    statusAuth: false,
    niveau: "",
    matricule: "",
    parcours: "",
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
