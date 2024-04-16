import axios from "axios";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ListVehiculeContext = createContext({
  listOfVehicule: [],
  showListOfVehicule: () => {},
});

export const ListVehiculeProvider = ({ children }: Props) => {
  const [listOfVehicule, setListOfVehicule] = useState([]);

  const showListOfVehicule = () => {
    axios.get("http://localhost:3001/vehicules").then((response) => {
      setListOfVehicule(response.data);
    });
  };

  return (
    <ListVehiculeContext.Provider
      value={{ listOfVehicule, showListOfVehicule }}
    >
      {children}
    </ListVehiculeContext.Provider>
  );
};
