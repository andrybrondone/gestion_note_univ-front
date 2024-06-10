import axios from "axios";
import { createContext, useState } from "react";
import { FormModuleValues, ListeNoteValues } from "../types/crud-props";

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
  parcours: string;
}

interface InfoAllUserProps {
  id?: number;
  PersonneId?: number;
  matricule?: string;
  moyenne_pratique?: number;
  niveau: string;
  statut: string;
  parcours: string;
  grade: string;
  Personne: {
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    adresse: string;
    lieu_nais: string;
    date_nais: string;
  };
}

interface PersonnesProps {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  adresse: string;
  lieu_nais: string;
  date_nais: string;
  photo: string;

  Etudiants?: [
    {
      matricule: string;
      niveau: string;
      parcours: string;
      statut: string;
    }
  ];

  Enseignants?: [
    {
      grade: string;
    }
  ];
}

interface FormPersonneValues {
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  adresse: string;
  lieu_nais: string;
  date_nais: string;
  photo: string;
}

export const DataFetcherByIdContext = createContext({
  // Personne
  listPersonneById: {} as FormPersonneValues,
  getListPersonneById: Function(),
  // PersonneEt
  listPersonneEtById: {} as PersonnesProps,
  getListPersonneEtById: Function(),
  // PersonneEns
  listPersonneEnsById: {} as PersonnesProps,
  getListPersonneEnsById: Function(),
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
  // Note
  listNoteById: {} as ListeNoteValues,
  getListNoteById: Function(),
});

export const DataFetcherByIdProvider = ({ children }: Props) => {
  const [listPersonneById, setPersonneListById] = useState(
    {} as FormPersonneValues
  );
  const [listPersonneEtById, setPersonneEtListById] = useState(
    {} as PersonnesProps
  );
  const [listPersonneEnsById, setPersonneEnsListById] = useState(
    {} as PersonnesProps
  );
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
  const [listNoteById, setNoteListById] = useState({} as ListeNoteValues);

  const getListPersonneById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/personne/byId/${id}`)
      .then((response) => {
        setPersonneListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListPersonneEtById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/personne/etudiant/byId/${id}`)
      .then((response) => {
        setPersonneEtListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListPersonneEnsById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/personne/enseignant/byId/${id}`)
      .then((response) => {
        setPersonneEnsListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const getListNoteById = (id: number | undefined) => {
    return axios
      .get(`http://localhost:3001/note/byId/${id}`)
      .then((response) => {
        setNoteListById(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DataFetcherByIdContext.Provider
      value={{
        listPersonneById,
        getListPersonneById,
        listPersonneEtById,
        getListPersonneEtById,
        listPersonneEnsById,
        getListPersonneEnsById,
        listEtudiantById,
        getListEtudiantById,
        listEnseignantById,
        getListEnseignantById,
        listModuleById,
        getListModuleById,
        listMatiereById,
        getListMatiereById,
        listNoteById,
        getListNoteById,
      }}
    >
      {children}
    </DataFetcherByIdContext.Provider>
  );
};
