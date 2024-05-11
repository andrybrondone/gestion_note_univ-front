import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { onSubmitPersonne } from "../../../api/OnSubmitForm";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormPersonneValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import FormEns from "../enseignant/FormEns";
import FormEtudiant from "../etudiant/FormEtudiant";
import { validationSchemaPersonne } from "../validation-schemas-yup/ValidationSchemasYup";

export default function FormPersonne() {
  const { toggleFormEt, toggleFormEns } = useContext(ShowFormContext);

  const initialValues: FormPersonneValues = {
    nom: "",
    prenom: "",
    phone: "",
    email: "",
    adresse: "",
    lieu_nais: "",
    date_nais: "",
    mdp: "",
    photo: "",
    statue: "",
  };

  const onSubmit = (
    data: FormPersonneValues,
    actions: FormikHelpers<FormPersonneValues>
  ) => {
    onSubmitPersonne(data, actions, toggleFormEt, toggleFormEns);
  };

  return (
    <>
      <div className="bg-gray-400 dark:bg-black p-8 rounded w-[900px] text-caption1 shadow-lg">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchemaPersonne}
        >
          {({ isSubmitting, setFieldValue, handleChange }) => (
            <Form className="flex flex-col gap-5">
              <Typography
                variant="h4"
                component="h4"
                className="text-center mb-5"
              >
                Ajouter une personne
              </Typography>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <Input
                    label="Nom"
                    name="nom"
                    type="text"
                    placeholder="ex. ANDRIAMBOLOLOMANANA"
                  />

                  <Input
                    label="Prénom"
                    name="prenom"
                    type="text"
                    placeholder="ex. Brondone"
                  />

                  <Input
                    label="Numéro de téléphone"
                    name="phone"
                    type="text"
                    placeholder="ex. 034 91 572 36"
                  />

                  <Input
                    label="E-mail"
                    name="email"
                    type="email"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("mdp", e.target.value); // Répliquer la valeur dans le champ "Mot de passe"
                    }}
                    placeholder="ex. andry.brondone@gmail.com"
                  />

                  <Input name="mdp" type="text" classNameSpan="hidden" />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    label="Adresse"
                    name="adresse"
                    type="text"
                    placeholder="ex. Soatsihadino"
                  />

                  <Input
                    label="Date de naissance"
                    name="date_nais"
                    type="date"
                    placeholder="ex. 17/02/2004"
                  />

                  <Input
                    label="Lieu de naissance"
                    name="lieu_nais"
                    type="text"
                    placeholder="ex. Manakara"
                  />

                  <Select label="Statut de la personne" name="statue">
                    <option value="">Choisir le statut</option>
                    <option value="etudiant">Etudiant</option>
                    <option value="enseignant">Enseignant</option>
                    <option value="administrateur">Administrateur</option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <Button
                  disabled={isSubmitting}
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
      <FormEtudiant />
      <FormEns />
    </>
  );
}
