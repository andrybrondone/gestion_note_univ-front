import React, { createContext, SetStateAction, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({
  authState: { nom: "", id: 0, statut: "", statusAuth: false },
  setAuthState: {} as React.Dispatch<
    SetStateAction<{
      nom: string;
      id: number;
      statut: string;
      statusAuth: boolean;
    }>
  >,
});

export const AuthProvider = ({ children }: Props) => {
  const [authState, setAuthState] = useState({
    nom: "",
    id: 0,
    statut: "",
    statusAuth: false,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
