import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormPersonneValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

interface FormValues {
  id_pers: string;
  matricule: string;
  niveau: string;
  parcours: string;
}

export default function FormEtudiant() {
  const { isOpenFormEt, toggleFormEt } = useContext(ShowFormContext);
  const [listOfPersonne, setListOfPersonne] = useState([]);

  // Recuperation de la dernière personne qui a été ajoutée
  useEffect(() => {
    if (isOpenFormEt) {
      axios.get("http://localhost:3001/personne").then((response) => {
        setListOfPersonne(response.data);
      });
    }
  }, [isOpenFormEt]);

  // Les valeurs initiale des champs dans les formulaire
  const initialValues: FormValues = {
    id_pers: "",
    matricule: "",
    niveau: "",
    parcours: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    matricule: Yup.string()
      .min(4, "Un matricule doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    niveau: Yup.string()
      .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
      .required("Ce champ est obligatoire"),
    parcours: Yup.string()
      .oneOf(["IG", "GB", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
      .required("Ce champ est obligatoire"),
    id_pers: Yup.string()
      .notOneOf(
        ["Choisir une personne"],
        "Veuillez choisir un module pour la matière"
      )
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: FormValues) => {
    axios
      .post("http://localhost:3001/etudiant", data)
      .then(() => {
        toast.success("L'étudiant a été ajouter avec succès");
        toggleFormEt();
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <>
      {isOpenFormEt && (
        <>
          <div className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed"></div>

          <div className="fixed w-[550px] max-sm:w-[90%] top-8 left-1/2 -translate-x-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="flex flex-col gap-5">
                <Typography
                  variant="lead"
                  component="h4"
                  className="text-center"
                >
                  Ajout d'autre information sur l'étudiant
                </Typography>

                <Select label="Nom" name="id_pers">
                  <option value="">Choisir une personne</option>
                  {listOfPersonne.map((item: FormPersonneValues) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {`${item.nom} ${item.prenom}`}
                      </option>
                    );
                  })}
                </Select>

                <Input
                  label="Matricule"
                  name="matricule"
                  type="text"
                  placeholder="ex. 1332 H-F"
                />

                <Select label="Niveau" name="niveau">
                  <option value="">Choisir le niveau</option>
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                  <option value="M1">M1</option>
                  <option value="M2">M2</option>
                </Select>

                <Select label="Parcours" name="parcours">
                  <option value="">Choisir le parcours</option>
                  <option value="IG">IG</option>
                  <option value="GB">GB</option>
                  <option value="ASR">ASR</option>
                  <option value="GID">GID</option>
                  <option value="OCC">OCC</option>
                </Select>

                <div className="flex justify-center items-center mt-5">
                  <Button type="submit" variant="accent" className=" w-36">
                    Enregistrer
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </>
      )}
    </>
  );
}
