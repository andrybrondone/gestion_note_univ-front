import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  FormMatiereValues,
  FormNoteValues,
  InfoEnsProps,
} from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

export default function FormNote() {
  const [listOfEtudiant, setListOfEtudiant] = useState([]);
  const [listOfMatiere, setListOfMatiere] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/etudiant").then((response) => {
      setListOfEtudiant(response.data);
    });
    axios.get("http://localhost:3001/matiere").then((response) => {
      setListOfMatiere(response.data);
    });
  }, []);

  const initialValues: FormNoteValues = {
    id_et: "",
    id_mat: "",
    note: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    note: Yup.number()
      .integer("Des nombres entier seulement")
      .min(0, "Une note ne doit pas être negative")
      .max(20, "Une note ne doit pas être supérieur à 20")
      .required("Ce champ est obligatoire"),
    id_et: Yup.string()
      .notOneOf(
        ["Choisir un Etudiant"],
        "Veuillez choisir un Etudiant pour la matière"
      )
      .required("Ce champ est obligatoire"),
    id_mat: Yup.string()
      .notOneOf(
        ["Choisir un Matiere"],
        "Veuillez choisir un Matiere pour la matière"
      )
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: FormNoteValues) => {
    axios
      .post("http://localhost:3001/note", data)
      .then(() => {
        toast.success("La note a été ajouter avec succès");
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <div className="bg-gray-400 dark:bg-black p-8 rounded w-[600px] text-caption1 shadow-lg">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-2">
          <Typography variant="h3" component="h3" className="text-center mb-4">
            Ajouter une note
          </Typography>

          <Select label="Etudiant" name="id_et">
            <option value="">Choisir un Etudiant</option>
            {listOfEtudiant.map((item: InfoEnsProps) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.Personne.prenom}
                </option>
              );
            })}
          </Select>

          <Select label="Matiere" name="id_mat">
            <option value="">Choisir un Matiere</option>
            {listOfMatiere.map((item: FormMatiereValues) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.nom_mat}
                </option>
              );
            })}
          </Select>

          <Input
            label="Note"
            name="note"
            type="number"
            min={0}
            max={20}
            placeholder="ex. 12"
          />

          <div className="flex justify-center items-center mt-4">
            <Button type="submit" variant="accent" className=" w-36">
              Enregistrer
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
