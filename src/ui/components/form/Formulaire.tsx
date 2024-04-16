import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import * as Yup from "yup";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import { Input } from "./Input";

export default function Formulaire() {
  const [eyeClick, setEyeClick] = useState(false);
  let typePwd: string = "password";

  if (eyeClick) {
    typePwd = "text";
  }

  const handleClickEye = () => {
    setEyeClick(!eyeClick);
  };

  const initialValues = {
    identifiant: "",
    mdp: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    identifiant: Yup.string().required("Ce champ est obligatoire"),
    mdp: Yup.string().required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: object) => {
    axios.post("http://localhost:3001/locations", data).then(() => {
      console.log(data);
      console.log("ok");
    });
  };

  return (
    <div className="bg-gray-400 relative dark:bg-black p-8 rounded shadow-lg">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-2">
          <Typography variant="h3" component="h3" className="text-center mb-4">
            Connexion
          </Typography>

          <Input
            label="E-mail ou N° Matricule"
            name="identifiant"
            type="text"
            placeholder="ex. 1332 H-F ou andry.brondone@gmail.com"
          />

          <Input
            label="Mot de passe"
            name="mdp"
            type={typePwd}
            placeholder="ex. Mot de passe"
          />

          {eyeClick ? (
            <div
              onClick={handleClickEye}
              className="absolute right-8 bottom-[111.5px] cursor-pointer p-3 pr-4"
            >
              <RiEyeLine className=" text-sm text-secondary-600" />
            </div>
          ) : (
            <div
              onClick={handleClickEye}
              className="absolute right-8 bottom-[111.5px]  cursor-pointer p-3 pr-4"
            >
              <RiEyeOffLine className=" text-sm text-secondary-600" />
            </div>
          )}

          <div className="flex justify-center items-center mt-2">
            <Button type="submit" variant="accent" className=" w-36">
              Se connecter
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
