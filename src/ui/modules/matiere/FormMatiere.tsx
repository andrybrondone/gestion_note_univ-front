import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  FormMatiereValues,
  FormModuleValues,
  InfoEnsProps,
} from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

export default function FormMatiere() {
  const [listOfEnseignant, setListOfEnseignant] = useState([]);
  const [listOfModule, setListOfModule] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/enseignant").then((response) => {
      setListOfEnseignant(response.data);
    });
    axios.get("http://localhost:3001/module").then((response) => {
      setListOfModule(response.data);
    });
  }, []);

  const initialValues: FormMatiereValues = {
    id_ens: "",
    id_module: "",
    nom_mat: "",
    credit: "",
    niveau_mat: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    nom_mat: Yup.string()
      .min(2, "Le nom d'une matière doit contenir au moin 2 caractères")
      .required("Ce champ est obligatoire"),
    credit: Yup.number()
      .integer("Des nombres entier seulement")
      .min(1, "Le crédit doit être superieur à 0")
      .required("Ce champ est obligatoire"),
    id_ens: Yup.string()
      .notOneOf(
        ["Choisir un enseignant"],
        "Veuillez choisir un enseignant pour la matière"
      )
      .required("Ce champ est obligatoire"),
    id_module: Yup.string()
      .notOneOf(
        ["Choisir un module"],
        "Veuillez choisir un module pour la matière"
      )
      .required("Ce champ est obligatoire"),
    niveau_mat: Yup.string()
      .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: FormMatiereValues) => {
    axios
      .post("http://localhost:3001/matiere", data)
      .then(() => {
        toast.success("La matière a été ajouter avec succès");
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
            Ajouter Matière
          </Typography>

          <Input
            label="Nom de la matière"
            name="nom_mat"
            type="text"
            placeholder="ex. IHM"
          />

          <Input
            label="Crédits"
            name="credit"
            type="number"
            placeholder="ex. 12"
          />

          <Select label="Niveau" name="niveau_mat">
            <option value="">Choisir un niveau pour la matière</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
          </Select>

          <Select label="Enseignant" name="id_ens">
            <option value="">Choisir un enseignant</option>
            {listOfEnseignant.map((item: InfoEnsProps) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.Personne.prenom}
                </option>
              );
            })}
          </Select>

          <Select label="Module" name="id_module">
            <option value="">Choisir un module</option>
            {listOfModule.map((item: FormModuleValues) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.nom_module}
                </option>
              );
            })}
          </Select>

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
