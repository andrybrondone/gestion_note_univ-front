import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { RiArrowLeftLine, RiSave2Line } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { DataUserContext } from "../../../context/DataUserContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import useToggle from "../../../hook/useToggle";
import { FormAllUsersValues } from "../../../types/crud-props";
import { url_api } from "../../../utils/url-api";
import { Container } from "../../components/container/Container";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaAllInfoUser } from "../validation-schemas-yup/ValidationSchemasYup";

interface Props {
  statutPers: "etudiant" | "enseignant" | "administrateur";
}

export default function AllInfoUser({ statutPers }: Props) {
  const { dataUser } = useContext(DataUserContext);
  const { value: disabled, toggleValue: toggleDisabled } = useToggle(true);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const {
    isEditEnseignantForm,
    isEditEtudiantForm,
    toggleEditEnseignantForm,
    toggleEditEtudiantForm,
  } = useContext(ToggleEditFormContext);

  const { listEtudiantById, listEnseignantById } = useContext(
    DataFetcherByIdContext
  );

  let className: string = "";

  if (disabled) {
    className = "border-white ";
  }

  let initialValues: FormAllUsersValues;

  if (isEditEtudiantForm) {
    initialValues = {
      nom: listEtudiantById.Personne.nom,
      prenom: listEtudiantById.Personne.prenom,
      phone: listEtudiantById.Personne.phone,
      email: listEtudiantById.Personne.email,
      adresse: listEtudiantById.Personne.adresse,
      lieu_nais: listEtudiantById.Personne.lieu_nais,
      date_nais: listEtudiantById.Personne.date_nais,
      matricule: listEtudiantById.matricule,
      statut: listEtudiantById.statut,
      niveau: listEtudiantById.niveau,
      parcours: listEtudiantById.parcours,
      grade: "grade default",
    };
  } else if (isEditEnseignantForm) {
    initialValues = {
      nom: listEnseignantById.Personne.nom,
      prenom: listEnseignantById.Personne.prenom,
      phone: listEnseignantById.Personne.phone,
      email: listEnseignantById.Personne.email,
      adresse: listEnseignantById.Personne.adresse,
      lieu_nais: listEnseignantById.Personne.lieu_nais,
      date_nais: listEnseignantById.Personne.date_nais,
      grade: listEnseignantById.grade,
      matricule: "1332H-F",
      statut: "Passant",
      niveau: "L3",
      parcours: "IG",
    };
  } else {
    initialValues = {
      nom: "",
      prenom: "",
      phone: "",
      email: "",
      adresse: "",
      lieu_nais: "",
      date_nais: "",
      matricule: "",
      statut: "",
      niveau: "",
      parcours: "",
      grade: "",
    };
  }

  const onSubmit = (data: FormAllUsersValues) => {
    if (isEditEnseignantForm) {
      axios
        .put(`${url_api}/enseignant/${listEnseignantById.id}`, data)
        .then(() => {})
        .catch((error) => {
          console.error("Error : ", error);
        });
      axios
        .put(`${url_api}/personne/${listEnseignantById.PersonneId}`, data)
        .then(() => {
          toast.success(
            "Les informations sur l'enseignant ont été modifié avec succès"
          );
          toggleEditEnseignantForm();
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
    if (isEditEtudiantForm) {
      axios
        .put(`${url_api}/etudiant/${listEtudiantById.id}`, data)
        .then(() => {})
        .catch((error) => {
          console.error("Error : ", error);
        });
      axios
        .put(`${url_api}/personne/${listEtudiantById.PersonneId}`, data)
        .then(() => {
          toast.success(
            "Les informations sur l'étudiant ont été modifié avec succès"
          );
          toggleEditEtudiantForm();
        })
        .catch((error) => {
          console.error("Error : ", error);
        });
    }
  };

  const handleClickBack = () => {
    if (isEditEnseignantForm) {
      toggleEditEnseignantForm();
    }
    if (isEditEtudiantForm) {
      toggleEditEtudiantForm();
    }
  };

  return (
    <>
      {isEditEnseignantForm || isEditEtudiantForm ? (
        <>
          <div className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed z-40"></div>
          <Container className="select-none absolute top-7 left-0 right-0 z-50">
            <div className="bg-gray-00 dark:bg-black p-8 w-full text-caption1 bg-white rounded shadow-md">
              <div className="pb-8 flex items-center relative">
                <RiArrowLeftLine
                  className="text-lg cursor-pointer"
                  onClick={handleClickBack}
                />
                <Typography
                  variant="body-lg"
                  component="h5"
                  theme="gray"
                  className="text-center absolute left-1/2 -translate-x-1/2"
                >
                  {isEditEtudiantForm ? (
                    <>
                      Tous les informations consernant l'étudiant{" "}
                      <span className=" uppercase text-secondary-600">
                        {listEtudiantById.Personne.nom}
                      </span>
                    </>
                  ) : (
                    <>
                      Tous les informations consernant l'enseignant{" "}
                      <span className=" uppercase text-secondary-600">
                        {listEnseignantById.Personne.nom}
                      </span>
                    </>
                  )}
                </Typography>
              </div>
              <div className="flex justify-center items-center mb-5">
                {statutPers === "etudiant" && (
                  <Avatar
                    src={`${url_api}/images/${listEtudiantById.Personne.photo}`}
                    alt=""
                    size="very-large"
                  />
                )}
                {statutPers === "enseignant" && (
                  <Avatar
                    src={`${url_api}/images/${listEnseignantById.Personne.photo}`}
                    alt=""
                    size="very-large"
                  />
                )}
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchemaAllInfoUser}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1 max-sm:gap-0">
                      <div className="flex flex-col gap-2">
                        {statutPers === "etudiant" && (
                          <Input
                            label="N° matricule :"
                            name="matricule"
                            type="text"
                            placeholder="ex. 1332H-F"
                            className={clsx(className)}
                            classNameSpan={clsx(disabled && "hidden")}
                            disabled={disabled}
                          />
                        )}

                        <Input
                          label="Nom :"
                          name="nom"
                          type="text"
                          placeholder="ex. ANDRIAMBOLOLOMANANA"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        <Input
                          label="Prénom :"
                          name="prenom"
                          type="text"
                          placeholder="ex. Brondone"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        <Input
                          label="Numéro de téléphone :"
                          name="phone"
                          type="text"
                          placeholder="ex. 034 91 572 36"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        <Input
                          label="E-mail :"
                          name="email"
                          type="email"
                          placeholder="ex. andry.brondone@gmail.com"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        {statutPers === "etudiant" && (
                          <Select
                            label="Niveau :"
                            name="niveau"
                            className={clsx(
                              className,
                              disabled && "bg-gray-300"
                            )}
                            classNameSpan={clsx(disabled && "hidden")}
                            disabled={disabled}
                          >
                            <option value="">Choisir le niveau</option>
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                          </Select>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {statutPers === "etudiant" && (
                          <Select
                            label="Parcours :"
                            name="parcours"
                            className={clsx(
                              className,
                              disabled && "bg-gray-300"
                            )}
                            classNameSpan={clsx(disabled && "hidden")}
                            disabled={disabled}
                          >
                            <option value="">Choisir le parcours</option>
                            <option value="IG">IG</option>
                            <option value="GBD">GBD</option>
                            <option value="ASR">ASR</option>
                            <option value="GID">GID</option>
                            <option value="OCC">OCC</option>
                          </Select>
                        )}

                        {statutPers === "enseignant" && (
                          <Input
                            label="Grade :"
                            name="grade"
                            type="text"
                            placeholder="ex. Maître de conférences"
                            className={clsx(className)}
                            classNameSpan={clsx(disabled && "hidden")}
                            disabled={disabled}
                          />
                        )}

                        <Input
                          label="Adresse :"
                          name="adresse"
                          type="text"
                          placeholder="ex. Soatsihadino"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        <Input
                          label="Date de naissance :"
                          name="date_nais"
                          type="date"
                          placeholder="ex. 17/02/2004"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        <Input
                          label="Lieu de naissance :"
                          name="lieu_nais"
                          type="text"
                          placeholder="ex. Manakara"
                          className={clsx(className)}
                          classNameSpan={clsx(disabled && "hidden")}
                          disabled={disabled}
                        />

                        {statutPers === "etudiant" && (
                          <Select
                            label="Statut de l'étudiant :"
                            name="statut"
                            className={clsx(
                              className,
                              disabled && "bg-gray-300"
                            )}
                            classNameSpan={clsx(disabled && "hidden")}
                            disabled={disabled}
                          >
                            <option value="">Choisir le statut</option>
                            <option value="Passant">Passant</option>
                            <option value="Redoublant">Redoublant</option>
                            <option value="Diplômé">Diplômé</option>
                          </Select>
                        )}
                      </div>
                    </div>

                    {dataUser.statut === "administrateur" && (
                      <div className="flex justify-between items-center mt-5 gap-4">
                        <div onClick={toggleDisabled}>
                          <Typography
                            variant="body-sm"
                            component="p"
                            theme="warning"
                            className="cursor-pointer inline-block hover:underline"
                          >
                            {disabled
                              ? "Faire des modifications ?"
                              : "Annuler la modification ?"}
                          </Typography>
                        </div>
                        <div className="flex gap-3">
                          {!disabled && (
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              variant="secondary"
                              icon={{ icon: RiSave2Line }}
                              iconPosition="left"
                            >
                              Enregistrer
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            icon={{ icon: RiArrowLeftLine }}
                            iconPosition="left"
                            action={handleClickBack}
                          >
                            Retour
                          </Button>
                        </div>
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
}
