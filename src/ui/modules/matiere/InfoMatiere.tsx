import axios from "axios";
import { useEffect, useState } from "react";
import {
  RiAddCircleLine,
  RiDeleteBin2Fill,
  RiPencilFill,
} from "react-icons/ri";
import { FormMatiereValues } from "../../../types/crud-props";
import { Typography } from "../../design-system/typography/Typography";

export default function InfoMatiere() {
  const [listOfMatiere, setListOfMatiere] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/matiere").then((response) => {
      setListOfMatiere(response.data);
    });
  }, []);

  return (
    <>
      <button className="rounded-full text-5xl text-secondary">
        <Typography variant="caption3" component="p">
          Ajouter une matière
        </Typography>
        <RiAddCircleLine />
      </button>
      <div className="h-[380px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
        <table className="w-[900px] max-sm:text-caption4">
          <thead>
            <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
              <th className="py-4">Nom</th>
              <th>Niveau</th>
              <th>Crédit</th>
              <th>Enseignant</th>
              <th>Module</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {listOfMatiere.map((value: FormMatiereValues) => {
              return (
                <tr
                  key={value.id_mat}
                  className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                >
                  <td className="py-2"> {value.nom_mat}</td>
                  <td>{value.niveau_mat}</td>
                  <td>{value.credit}</td>
                  <td>{value.id_ens}</td>
                  <td>{value.id_module}</td>
                  <td className="flex items-center justify-center py-2 text-3xl gap-2 max-sm:text-2xl">
                    <RiPencilFill className="text-alert-warning cursor-pointer" />
                    <RiDeleteBin2Fill className="text-alert-danger cursor-pointer" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
