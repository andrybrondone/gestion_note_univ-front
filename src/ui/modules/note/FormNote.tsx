import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FormMatiereValues,
  FormNoteValues,
  InfoEnsProps,
} from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaNote } from "../validation-schemas-yup/ValidationSchemasYup";

export default function FormNote() {
  const [listOfEtudiant, setListOfEtudiant] = useState([]);
  const [listOfMatiere, setListOfMatiere] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/etudiant").then((response) => {
      setListOfEtudiant(response.data);
    });
    axios.get("http://localhost:3001/matiere/nom").then((response) => {
      setListOfMatiere(response.data);
    });
  }, []);

  const initialValues: FormNoteValues = {
    id_et: "",
    id_mat: "",
    note: "",
  };

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
        validationSchema={validationSchemaNote}
      >
        <Form className="flex flex-col gap-2">
          <Typography variant="h4" component="h4" className="text-center mb-4">
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
