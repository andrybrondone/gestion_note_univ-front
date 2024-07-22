import axios from "axios";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { FormAllUsersValues, FormPersonneValues } from "../types/crud-props";
import { url_api } from "../utils/url-api";

export const onSubmitPersonne = (
  data: FormPersonneValues,
  actions: FormikHelpers<FormPersonneValues>,
  toggleFormEt: () => void,
  toggleFormEns: () => void
) => {
  axios
    .post(`${url_api}/personne`, data)
    .then((res) => {
      if (res.data.error === "duplication") {
        toast.error("L'adresse e-mail existe déjà, veuillez le changer");
      } else {
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
      }
    })
    .catch((error) => {
      if (error.message === "Network Error") {
        toast.message("Verifier votre connexion internet !");
      } else {
        console.error("Error : ", error);
      }
    })
    .finally(() => actions.setSubmitting(false));
};

export const onSubmitUsersInfo = (
  data: FormAllUsersValues,
  actions: FormikHelpers<FormAllUsersValues>
) => {
  axios
    .post(`${url_api}/personne`, data)
    .then(() => {
      toast.success("La personne a été ajouter avec succès");

      // Pour effacer les champs dans le formulaire
      actions.resetForm();
    })
    .catch((error) => {
      if (error.message === "Network Error") {
        toast.message("Verifier votre connexion internet !");
      } else {
        console.error("Error : ", error);
      }
    })
    .finally(() => actions.setSubmitting(false));
};
