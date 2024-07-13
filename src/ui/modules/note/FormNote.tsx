import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { DataUserContext } from "../../../context/DataUserContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { FormMatiereValues, FormNoteValues } from "../../../types/crud-props";
import { url_api } from "../../../utils/url-api";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaNote } from "../validation-schemas-yup/ValidationSchemasYup";

interface Props {
  idEt: number | undefined;
}

export default function FormNote({ idEt }: Props) {
  const { dataUser } = useContext(DataUserContext);

  const { listEtudiantById, listNoteById } = useContext(DataFetcherByIdContext);

  const { isOpenFormNote, toggleFormNote } = useContext(ShowFormContext);

  const [listOfMatiere, setListOfMatiere] = useState([]);

  const { isEditNoteForm, toggleEditNoteForm } = useContext(
    ToggleEditFormContext
  );

  useEffect(() => {
    if (dataUser.statut === "enseignant") {
      axios
        .get(`${url_api}/matiere/nom/${dataUser.id}/${listEtudiantById.niveau}`)
        .then((response) => {
          setListOfMatiere(response.data);
        });
    }
  }, [listEtudiantById.niveau, dataUser.id, dataUser.statut]);

  // valeur initial dans le formulaire
  let initialValues: FormNoteValues;

  if (isEditNoteForm) {
    initialValues = {
      id_et: listNoteById.EtudiantId,
      id_mat: listNoteById.MatiereId,
      note: listNoteById.note,
    };
  } else {
    initialValues = {
      id_et: idEt,
      id_mat: "",
      note: "",
    };
  }

  const handleClick = () => {
    toggleFormNote();
    if (isEditNoteForm) {
      toggleEditNoteForm();
    }
  };

  const onSubmit = (
    data: FormNoteValues,
    actions: FormikHelpers<FormNoteValues>
  ) => {
    if (!isEditNoteForm) {
      axios
        .post(`${url_api}/note`, data)
        .then((res) => {
          if (res.data.error === "error") {
            toast.error(
              "Vous avez déjà attribuer une note à ce matière pour cette étudiant !"
            );
          } else {
            toast.success("La note a été ajouter avec succès");
            //toggleFormNote();
            actions.resetForm();
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    } else {
      axios
        .put(`${url_api}/note/${listNoteById.id}`, data)
        .then(() => {
          toast.success("La note de cette étudiant a été modifié avec succès");
          // Pour effacer fermer le formulaire
          toggleFormNote();
          // Pour remettre à false isEditModuleForm
          toggleEditNoteForm();
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
  };

  return (
    <>
      {isOpenFormNote && (
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
              validationSchema={validationSchemaNote}
            >
              <Form className="flex flex-col gap-2">
                <Typography variant="h4" component="h4" className="text-center">
                  {isEditNoteForm ? "Modifier la note" : "Ajouter une note"}
                </Typography>

                <Input name="id_et" type="hidden" classNameSpan="hidden" />

                <Select label="Matiere" name="id_mat" disabled={isEditNoteForm}>
                  <option value="">Choisir un Matiere</option>
                  {listOfMatiere.map((item: FormMatiereValues) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.nom_mat}
                      </option>
                    );
                  })}
                </Select>

                <Input
                  label="Note"
                  name="note"
                  type="number"
                  min={0}
                  max={20}
                  placeholder="ex. 12"
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
