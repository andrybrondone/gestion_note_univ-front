import clsx from "clsx";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext } from "react";
import { onSubmitPersonne } from "../../../api/OnSubmitForm";
import { ShowFormContext } from "../../../context/ShowFormContext";
import useToggle from "../../../hook/useToggle";
import { FormPersonneValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { validationSchemaAllInfoUser } from "../validation-schemas-yup/ValidationSchemasYup";

export default function AllInfoUser() {
  const { toggleFormEt, toggleFormEns } = useContext(ShowFormContext);
  const { value: disabled, toggleValue: toggleDisabled } = useToggle(true);

  let className: string;

  if (disabled) {
    className =
      "border-none rounded focus:outline-none focus:ring-1 dark:text-primary-200 dark:bg-gray-800 placeholder-gray-700 dark:placeholder-primary-300";
  }

  const initialValues: FormPersonneValues = {
    nom: "Andriambololomanana",
    prenom: "",
    email: "",
    adresse: "",
    lieu_nais: "",
    date_nais: "",
    mdp: "",
    photo: "",
    statue: "",
  };

  const onSubmit = (
    data: FormPersonneValues,
    actions: FormikHelpers<FormPersonneValues>
  ) => {
    onSubmitPersonne(data, actions, toggleFormEt, toggleFormEns);
  };
  return (
    <Container className=" select-none">
      <div className="bg-gray-00 dark:bg-black p-8 w-full text-caption1">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchemaAllInfoUser}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex justify-center items-center">
                <Avatar
                  src={`http://localhost:3001/images/default_photo.jpg`}
                  alt=""
                  size="very-large"
                />
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <Input
                    label="N° matricule :"
                    name="matricule"
                    type="text"
                    placeholder="ex. 1332H-F"
                    className={clsx(className)}
                    classNameSpan={clsx(disabled && "hidden")}
                    disabled={disabled}
                  />

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
                    label="E-mail :"
                    name="email"
                    type="email"
                    placeholder="ex. andry.brondone@gmail.com"
                    className={clsx(className)}
                    classNameSpan={clsx(disabled && "hidden")}
                    disabled={disabled}
                  />

                  <Select label="Niveau" name="niveau">
                    <option value="">Choisir le niveau</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Select label="Parcours" name="parcours">
                    <option value="">Choisir le parcours</option>
                    <option value="IG">IG</option>
                    <option value="GB">GB</option>
                    <option value="ASR">ASR</option>
                    <option value="GID">GID</option>
                    <option value="OCC">OCC</option>
                  </Select>

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

                  <Select label="Statut de l'étudiant" name="statut">
                    <option value="">Choisir le statut</option>
                    <option value="Passant">Passant</option>
                    <option value="Redoublant">Redoublant</option>
                    <option value="Diplômé">Diplômé</option>
                  </Select>
                </div>
              </div>

              <div onClick={toggleDisabled}>
                <Typography
                  variant="body-sm"
                  component="p"
                  theme="secondary"
                  className="cursor-pointer inline-block"
                >
                  Faire de modification ?
                </Typography>
              </div>

              {!disabled && (
                <div className="flex justify-center items-center mt-5">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="accent"
                    className=" w-36"
                  >
                    Enregistrer
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
