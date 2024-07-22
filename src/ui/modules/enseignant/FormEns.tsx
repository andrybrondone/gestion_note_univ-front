import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormPersonneValues } from "../../../types/crud-props";
import { url_api } from "../../../utils/url-api";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaEns } from "../validation-schemas-yup/ValidationSchemasYup";

interface FormValues {
  grade: string;
  id_pers: string;
}

export default function FormEns() {
  const { isOpenFormEns, toggleFormEns } = useContext(ShowFormContext);
  const [listOfPersonne, setListOfPersonne] = useState(
    {} as FormPersonneValues
  );

  // Recuperation de la dernière personne qui a été ajoutée
  useEffect(() => {
    if (isOpenFormEns) {
      axios.get(`${url_api}/personne`).then((response) => {
        setListOfPersonne(response.data);
      });
    }
  }, [isOpenFormEns]);

  const initialValues: FormValues = {
    grade: "",
    id_pers: "",
  };

  const onSubmit = (
    data: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    axios
      .post(`${url_api}/enseignant`, data)
      .then(() => {
        toast.success("L'enseignant a été ajouter avec succès");
        toggleFormEns();
      })
      .catch((error) => {
        console.error("Error : ", error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      {isOpenFormEns && (
        <>
          <div className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed"></div>

          <div className="fixed w-[550px] max-sm:w-[90%] top-20 left-1/2 -translate-x-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchemaEns}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <Typography
                    variant="lead"
                    component="h4"
                    className="text-center mb-5"
                  >
                    Ajout d'autre information sur l'enseignant
                  </Typography>

                  <Select label="Nom" name="id_pers">
                    <option value="">Choisir une personne</option>
                    <option key={listOfPersonne.id} value={listOfPersonne.id}>
                      {`${listOfPersonne.nom} ${listOfPersonne.prenom}`}
                    </option>
                  </Select>

                  <Input
                    label="Grade"
                    name="grade"
                    type="text"
                    placeholder="ex. Maître de conférence"
                  />

                  <div className="flex justify-center items-center mt-5">
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      variant="accent"
                      className=" w-36"
                    >
                      Enregistrer
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
}
