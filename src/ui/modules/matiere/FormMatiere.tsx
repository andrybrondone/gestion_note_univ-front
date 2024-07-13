import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import {
  FormMatiereValues,
  FormModuleValues,
  InfoEnsProps,
} from "../../../types/crud-props";
import { CheckBox } from "../../components/form/CheckBox";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaMatiere } from "../validation-schemas-yup/ValidationSchemasYup";
import { url_api } from "../../../utils/url-api";

const parcoursOptions = [
  { value: "IG", label: "IG" },
  { value: "GBD", label: "GBD" },
  { value: "ASR", label: "ASR" },
  { value: "GID", label: "GID" },
  { value: "OCC", label: "OCC" },
];

export default function FormMatiere() {
  const { isOpenFormMatiere, toggleFormMatiere } = useContext(ShowFormContext);
  // Récupérer les nom de tous les enseignants
  const [nameOfEnseignant, setNameOfEnseignant] = useState([]);
  // Récupérer les nom de tous les modules
  const [listOfModule, setListOfModule] = useState([]);

  // Hook pour recupérer les données par son identifiant
  const { listMatiereById } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const { isEditMatiereForm, toggleEditMatiereForm } = useContext(
    ToggleEditFormContext
  );

  useEffect(() => {
    axios.get(`${url_api}/enseignant`).then((response) => {
      setNameOfEnseignant(response.data);
    });
    axios.get(`${url_api}/module`).then((response) => {
      setListOfModule(response.data);
    });
  }, []);

  // valeur initial dans le formulaire
  let initialValues: FormMatiereValues;

  if (isEditMatiereForm) {
    initialValues = {
      id_ens: listMatiereById.EnseignantId,
      id_module: listMatiereById.ModuleId,
      nom_mat: listMatiereById.nom_mat,
      credit: listMatiereById.credit,
      niveau_mat: listMatiereById.niveau_mat,
      parcours: listMatiereById.parcours,
    };
  } else {
    initialValues = {
      id_ens: "",
      id_module: "",
      nom_mat: "",
      credit: "",
      niveau_mat: "",
      parcours: "",
    };
  }

  const handleClick = () => {
    toggleFormMatiere();
    if (isEditMatiereForm) {
      toggleEditMatiereForm();
    }
  };

  const onSubmit = (
    data: FormMatiereValues,
    actions: FormikHelpers<FormMatiereValues>
  ) => {
    if (!isEditMatiereForm) {
      axios
        .post(`${url_api}/matiere`, data)
        .then((res) => {
          if (res.data.error === "error") {
            toast.error("Ce matière est déjà associé à ce module");
          } else {
            toast.success("Le matière a été ajouter avec succès");
            actions.resetForm();
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    } else {
      axios
        .put(`${url_api}/matiere/${listMatiereById.id}`, data)
        .then((res) => {
          if (res.data.error === "error") {
            toast.error("Ce matière est déjà associé à ce module");
          } else {
            toast.success("Le matière a été modifié avec succès");
            // Pour effacer fermer le formulaire
            toggleFormMatiere();
            // Pour remettre à false isEditModuleForm
            toggleEditMatiereForm();
          }
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
  };

  return (
    <>
      {isOpenFormMatiere && (
        <>
          <div
            className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed"
            onClick={handleClick}
          ></div>

          <div className="fixed w-[550px] max-sm:w-[90%] top-5 left-1/2 -translate-x-1/2  bg-white dark:bg-gray rounded shadow-xl p-6 z-50">
            <RiCloseFill
              className="text-xl bg-gray-500 rounded-full absolute top-2 right-2 cursor-pointer dark:bg-gray-800"
              onClick={handleClick}
            />

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchemaMatiere}
            >
              {({ values, handleChange }) => (
                <Form className="flex flex-col gap-2">
                  <Typography
                    variant="h5"
                    component="h5"
                    className="text-center"
                  >
                    {isEditMatiereForm
                      ? "Modifier la matière"
                      : "Ajouter une matière"}
                  </Typography>

                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Nom de la matière"
                      name="nom_mat"
                      type="text"
                      placeholder="ex. IHM"
                    />
                    <Select label="Module" name="id_module">
                      <option value="">Choisir un module</option>
                      {listOfModule.map((item: FormModuleValues) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.nom_module}
                          </option>
                        );
                      })}
                    </Select>
                  </div>

                  <Select label="Niveau" name="niveau_mat">
                    <option value="">Choisir un niveau pour la matière</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </Select>

                  <p>
                    Parcours <span className="text-alert-danger">*</span>
                  </p>
                  <div className="flex items-center justify-between">
                    {parcoursOptions.map((option) => (
                      <div key={option.value}>
                        <CheckBox
                          label={option.label}
                          type="checkbox"
                          id={option.value}
                          htmlFor={option.value}
                          name="parcours"
                          value={option.value}
                          checked={values.parcours.includes(option.value)}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>

                  <Input
                    label="Crédits"
                    name="credit"
                    type="number"
                    min={0}
                    placeholder="ex. 12"
                  />

                  <Select label="Enseignant" name="id_ens">
                    <option value="">Choisir un enseignant</option>
                    {nameOfEnseignant.map((item: InfoEnsProps) => {
                      return (
                        <option
                          key={item.id}
                          value={item.id}
                          className=" capitalize"
                        >
                          {`${item.Personne.nom} ${item.Personne.prenom}`}
                        </option>
                      );
                    })}
                  </Select>

                  <div className="flex justify-center items-center mt-2">
                    <Button type="submit" variant="accent" className=" w-36">
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
