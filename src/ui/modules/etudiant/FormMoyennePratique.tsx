import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { url_api } from "../../../utils/url-api";
import { Input } from "../../components/form/Input";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaMoyennePratique } from "../validation-schemas-yup/ValidationSchemasYup";

interface Props {
  idEt: number | undefined;
}

interface MoyennePratiqueProps {
  id_et?: number;
  moyenne_pratique: string;
}

export default function FormMoyennePratique({ idEt }: Props) {
  const { listNoteById, listEtudiantById } = useContext(DataFetcherByIdContext);
  const { toggleFromMoyennePratique } = useContext(ShowFormContext);
  const { isEditNoteForm, toggleEditNoteForm } = useContext(
    ToggleEditFormContext
  );

  // valeur initial dans le formulaire
  let initialValues: MoyennePratiqueProps;

  if (isEditNoteForm) {
    initialValues = {
      id_et: listNoteById.EtudiantId,
      moyenne_pratique: listNoteById.Matiere.nom_mat,
    };
  } else {
    initialValues = {
      id_et: idEt,
      moyenne_pratique: "",
    };
  }

  const handleClick = () => {
    toggleFromMoyennePratique();
    if (isEditNoteForm) {
      toggleEditNoteForm();
    }
  };

  const onSubmit = (
    data: MoyennePratiqueProps,
    { setSubmitting }: FormikHelpers<MoyennePratiqueProps>
  ) => {
    // Convertir la virgule en point avant d'envoyer les données à la base de données
    const convertedData = {
      ...data,
      moyenne_pratique: data.moyenne_pratique.replace(",", "."),
    };

    if (!isEditNoteForm) {
      if (listEtudiantById.moyenne_pratique === null) {
        axios
          .put(`${url_api}/etudiant/moyenne-pratique`, convertedData)
          .then(() => {
            toast.success("La moyenne pratique a été ajoutée avec succès");
            toggleFromMoyennePratique();
          })
          .catch((error) => {
            console.error("Error : ", error);
          })
          .finally(() => setSubmitting(false));
      } else {
        toast.error(
          "Vous avez déjà attribuer la moyenne pratique de cette étudiant"
        );
      }
    } else {
      axios
        .put(`${url_api}/note/${listNoteById.id}`, convertedData)
        .then(() => {
          toast.success("La note de cet étudiant a été modifiée avec succès");
          toggleFromMoyennePratique();
          toggleEditNoteForm();
        })
        .catch((error) => {
          console.error("Error : ", error);
        })
        .finally(() => setSubmitting(false));
    }
  };

  return (
    <>
      <div
        className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed z-50"
        onClick={handleClick}
      ></div>

      <div className="fixed w-[550px] max-sm:w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
        <RiCloseFill
          className="text-xl bg-gray-500 rounded-full absolute top-2 right-2 cursor-pointer dark:bg-gray-800"
          onClick={handleClick}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchemaMoyennePratique}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-2">
              <Typography variant="h4" component="h4" className="text-center">
                {isEditNoteForm
                  ? "Modifier la moyenne pratique"
                  : "Ajouter une moyenne pratique"}
              </Typography>

              <Input name="id_et" type="hidden" classNameSpan="hidden" />
              <Input
                label="Moyenne pratique"
                name="moyenne_pratique"
                type="text"
                placeholder="ex. 16.53"
              />

              <div className="flex justify-center items-center mt-4">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  variant="accent"
                  className="w-36"
                >
                  Enregistrer
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
