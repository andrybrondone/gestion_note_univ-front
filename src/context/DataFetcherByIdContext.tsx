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

export const DataFetcherByIdContext = createContext({
  // Module
  listModuleById: {} as FormModuleValues,
  getListModuleById: Function(),
  // Matiere
  listMatiereById: {} as ListMatiereProps,
  getListMatiereById: Function(),
});

export const DataFetcherByIdProvider = ({ children }: Props) => {
  const [listModuleById, setModuleListById] = useState({} as FormModuleValues);
  const [listMatiereById, setMatiereListById] = useState(
    {} as ListMatiereProps
  );

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
