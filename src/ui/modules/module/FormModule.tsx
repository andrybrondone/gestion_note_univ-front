import axios from "axios";
import { Form, Formik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { FormModuleValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

export default function FormModule() {
  const initialValues: FormModuleValues = {
    nom_module: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    nom_module: Yup.string()
      .min(4, "Le nom d'un module doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: FormModuleValues) => {
    axios
      .post("http://localhost:3001/module", data)
      .then(() => {
        toast.success("Le module a été ajouter avec succès");
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
        <Form className="flex flex-col gap-5">
          <Typography variant="h3" component="h3" className="text-center mb-5">
            Ajouter Matière
          </Typography>

          <Input
            label="Nom du module"
            name="nom_module"
            type="text"
            placeholder="ex. IHM"
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
