import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { FormModuleValues } from "../../../types/crud-props";
import { Input } from "../../components/form/Input";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaModule } from "../validation-schemas-yup/ValidationSchemasYup";

export default function FormModule() {
  const { isOpenFormModule, toggleFormModule } = useContext(ShowFormContext);

  // Hook pour recupérer les données par son identifiant
  const { listModuleById } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const { isEditModuleForm, toggleEditModuleForm } = useContext(
    ToggleEditFormContext
  );

  // valeur initial dans le formulaire
  let initialValues: FormModuleValues;

  if (isEditModuleForm) {
    initialValues = {
      nom_module: listModuleById.nom_module,
    };
  } else {
    initialValues = {
      nom_module: "",
    };
  }

  const handleClick = () => {
    toggleFormModule();
    if (isEditModuleForm) {
      toggleEditModuleForm();
    }
  };

  const onSubmit = (
    data: FormModuleValues,
    actions: FormikHelpers<FormModuleValues>
  ) => {
    if (!isEditModuleForm) {
      axios
        .post("http://localhost:3001/module", data)
        .then((res) => {
          if (res.data.Status === "Success") {
            toast.success("Le module a été ajouté avec succès");
            // Pour effacer les champs dans le formulaire
            actions.resetForm();
          } else {
            toast.error("Ce module existe déjà dans la base de données");
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    } else {
      axios
        .put(`http://localhost:3001/module/${listModuleById.id}`, data)
        .then((res) => {
          if (res.data.Status === "Success") {
            toast.success("Le module a été modifié avec succès");
            // Pour effacer fermer le formulaire
            toggleFormModule();
            // Pour remettre à false isEditModuleForm
            toggleEditModuleForm();
          } else {
            toast.error("Ce module existe déjà dans la base de données");
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
  };

  return (
    <>
      {isOpenFormModule && (
        <>
          <div
            className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed z-50"
            onClick={handleClick}
          ></div>

          <div className="fixed w-[550px] max-sm:w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <RiCloseFill
              className="text-xl bg-gray-500 rounded-full absolute top-2 right-2 cursor-pointer dark:bg-gray-800"
              onClick={handleClick}
            />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchemaModule}
            >
              <Form className="flex flex-col gap-5">
                <Typography
                  variant="h4"
                  component="h4"
                  className="text-center mb-5"
                >
                  {isEditModuleForm
                    ? "Modifier la module"
                    : "Ajouter une module"}
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
