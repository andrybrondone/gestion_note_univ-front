import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import * as Yup from "yup";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { FormModuleValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

export default function FormModule() {
  const { isOpenFormModule, toggleFormModule } = useContext(ShowFormContext);

  const initialValues: FormModuleValues = {
    nom_module: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    nom_module: Yup.string()
      .min(4, "Le nom d'un module doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
  });

  const onSubmit = (
    data: FormModuleValues,
    actions: FormikHelpers<FormModuleValues>
  ) => {
    axios
      .post("http://localhost:3001/module", data)
      .then(() => {
        toast.success("Le module a été ajouter avec succès");

        // Pour effacer les champs dans le formulaire
        actions.resetForm();
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <>
      {isOpenFormModule && (
        <>
          <div
            className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed"
            onClick={toggleFormModule}
          ></div>

          <div className="fixed w-[550px] max-sm:w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <RiCloseFill
              className="text-xl bg-gray-500 rounded-full absolute top-2 right-2 cursor-pointer dark:bg-gray-800"
              onClick={toggleFormModule}
            />
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
                  Ajouter une module
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
        </>
      )}
    </>
  );
}
