import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormPersonneValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaEtudiant } from "../validation-schemas-yup/ValidationSchemasYup";

interface FormValues {
  id_pers: string;
  matricule: string;
  niveau: string;
  parcours: string;
  statut: string;
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
    statut: "",
  };

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

          <div className="fixed w-[550px] max-sm:w-[90%] top-4 left-1/2 -translate-x-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchemaEtudiant}
            >
              <Form className="flex flex-col gap-2">
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
                  <option value="GBD">GBD</option>
                  <option value="ASR">ASR</option>
                  <option value="GID">GID</option>
                  <option value="OCC">OCC</option>
                </Select>

                <Select label="Statut de l'étudiant" name="statut">
                  <option value="">Choisir le statut</option>
                  <option value="Passant">Passant</option>
                  <option value="Redoublant">Redoublant</option>
                  <option value="Diplômé">Diplômé</option>
                </Select>

                <div className="flex justify-center items-center mt-2">
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
