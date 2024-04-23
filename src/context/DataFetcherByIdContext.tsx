import axios from "axios";
import { createContext, useState } from "react";
import { FormModuleValues } from "../types/crud-props";

interface Props {
  children: React.ReactNode;
}

interface ListMatiereProps {
  id?: number;
  EnseignantId: string;
  ModuleId: string;
  nom_mat: string;
  credit: string;
  niveau_mat: string;
}

interface InfoAllUserProps {
  id?: number;
  PersonneId?: number;
  matricule?: string;
  niveau: string;
  statut: string;
  parcours: string;
  grade: string;
  Personne: {
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    lieu_nais: string;
    date_nais: string;
  };
}

export const DataFetcherByIdContext = createContext({
  // Etudiant
  listEtudiantById: {} as InfoAllUserProps,
  getListEtudiantById: Function(),
  // Enseignant
  listEnseignantById: {} as InfoAllUserProps,
  getListEnseignantById: Function(),
  // Module
  listModuleById: {} as FormModuleValues,
  getListModuleById: Function(),
  // Matiere
  listMatiereById: {} as ListMatiereProps,
  getListMatiereById: Function(),
});

export const DataFetcherByIdProvider = ({ children }: Props) => {
  const [listEtudiantById, setEtudiantListById] = useState(
    {} as InfoAllUserProps
  );
  const [listEnseignantById, setEnseignantListById] = useState(
    {} as InfoAllUserProps
  );
  const [listModuleById, setModuleListById] = useState({} as FormModuleValues);
  const [listMatiereById, setMatiereListById] = useState(
    {} as ListMatiereProps
  );

  const getListEtudiantById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/etudiant/byId/${id}`)
      .then((response) => {
        setEtudiantListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListEnseignantById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/enseignant/byId/${id}`)
      .then((response) => {
        setEnseignantListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListModuleById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/module/byId/${id}`)
      .then((response) => {
        setModuleListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListMatiereById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/matiere/byId/${id}`)
      .then((response) => {
        setMatiereListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DataFetcherByIdContext.Provider
      value={{
        listEtudiantById,
        getListEtudiantById,
        listEnseignantById,
        getListEnseignantById,
        listModuleById,
        getListModuleById,
        listMatiereById,
        getListMatiereById,
      }}
    >
      {children}
    </DataFetcherByIdContext.Provider>
  );
};
