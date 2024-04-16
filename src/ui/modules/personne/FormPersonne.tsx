import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormPersonneValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import FormEns from "../enseignant/FormEns";
import FormEtudiant from "../etudiant/FormEtudiant";

export default function FormPersonne() {
  const { toggleFormEt, toggleFormEns } = useContext(ShowFormContext);

  const initialValues: FormPersonneValues = {
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    lieu_nais: "",
    date_nais: "",
    mdp: "",
    photo: "",
    statue: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    nom: Yup.string()
      .min(3, "Un nom doit contenir au moin 3 caractères")
      .required("Ce champ est obligatoire"),
    prenom: Yup.string()
      .min(3, "Un prénom doit contenir au moin 3 caractères")
      .required("Ce champ est obligatoire"),
    email: Yup.string()
      .email("Entrez une adresse mail valide")
      .required("Ce champ est obligatoire"),
    adresse: Yup.string()
      .min(4, "Une adresse doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    lieu_nais: Yup.string()
      .min(4, "Une ville doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    date_nais: Yup.date().required("Ce champ est obligatoire"),
    mdp: Yup.string().required("Ce champ est obligatoire"),
    statue: Yup.string()
      .oneOf(
        ["etudiant", "enseignant", "administrateur"],
        "Veuillez choisir le statut"
      )
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (
    data: FormPersonneValues,
    actions: FormikHelpers<FormPersonneValues>
  ) => {
    axios
      .post("http://localhost:3001/personne", data)
      .then(() => {
        toast.success("La personne a été ajouter avec succès");

        // Pour afficher les formulaire etudiant et enseignant
        if (data.statue == "etudiant") {
          toggleFormEt();
        }
        if (data.statue == "enseignant") {
          toggleFormEns();
        }

        // Pour effacer les champs dans le formulaire
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <>
      <div className="bg-gray-400 dark:bg-black p-8 rounded w-[900px] text-caption1 shadow-lg">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
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
                  label="E-mail"
                  name="email"
                  type="email"
                  placeholder="ex. andry.brondone@gmail.com"
                />

                <Input
                  label="Mot de passe par défaut"
                  name="mdp"
                  type="text"
                  placeholder="ex. 123456"
                />
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

                <Select label="Statut" name="statue">
                  <option value="">Choisir le statut</option>
                  <option value="etudiant">Etudiant</option>
                  <option value="enseignant">Enseignant</option>
                  <option value="administrateur">Administrateur</option>
                </Select>
              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              <Button type="submit" variant="accent" className=" w-36">
                Enregistrer
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
      <FormEtudiant />
      <FormEns />
    </>
  );
}
