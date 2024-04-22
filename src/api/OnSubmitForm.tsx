import axios from "axios";
import { FormikHelpers } from "formik";
import { toast } from "sonner";
import { FormPersonneValues } from "../types/crud-props";

export const onSubmitPersonne = (
  data: FormPersonneValues,
  actions: FormikHelpers<FormPersonneValues>,
  toggleFormEt: () => void,
  toggleFormEns: () => void
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
      if (error.message === "Network Error") {
        toast.message("Verifier votre connexion internet !");
      } else {
        console.error("Error : ", error);
      }
    });
};
