import axios, { AxiosResponse } from "axios";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
import { AuthContext } from "../../../context/AuthContext";
import useToggle from "../../../hook/useToggle";
import { Input } from "../../components/form/Input";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

interface LoginProps {
  email: string;
  mdp: string;
}

interface AxiosResponseProps {
  error: string;
  nom: string;
  token: string;
  id: number;
  statut: string;
  niveau: string;
  matricule: string;
  parcours: string;
}

export default function FormLogin() {
  const { setAuthState } = useContext(AuthContext);
  const { value: eyeClick, toggleValue: toggleEyeClick } = useToggle(false);
  const navigate = useNavigate();
  let typePwd: string = "password";

  if (eyeClick) {
    typePwd = "text";
  }

  const initialValues: LoginProps = {
    email: "",
    mdp: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Ce champ est obligatoire"),
    mdp: Yup.string().required("Ce champ est obligatoire"),
  });

  const onSubmit = (data: LoginProps) => {
    axios
      .post("http://localhost:3001/personne/login", data)
      .then((res: AxiosResponse<AxiosResponseProps>) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          localStorage.setItem("accessToken", res.data.token);
          setAuthState({
            nom: res.data.nom,
            id: res.data.id,
            statut: res.data.statut,
            statusAuth: true,
            niveau: res.data.niveau,
            matricule: res.data.matricule,
            parcours: res.data.parcours,
          });
          navigate("/accueil");
        }
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          toast.message("Verifier votre connexion internet !");
        }
      });
  };

  return (
    <div className="bg-gray-400 relative dark:bg-black px-8 py-10 rounded shadow-lg">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-2">
          <Typography variant="h3" component="h3" className="text-center mb-10">
            Connexion
          </Typography>

          <Input
            label="Adresse e-mail"
            name="email"
            type="text"
            placeholder="ex. andry.brondone@gmail.com"
          />

          <Input
            label="Mot de passe"
            name="mdp"
            type={typePwd}
            placeholder="ex. Mot de passe"
          />

          {eyeClick ? (
            <div
              onClick={toggleEyeClick}
              className="absolute right-8 bottom-[123px] cursor-pointer p-3 pr-4"
            >
              <RiEyeLine className=" text-lg text-secondary-600 dark:text-secondary-300" />
            </div>
          ) : (
            <div
              onClick={toggleEyeClick}
              className="absolute right-8 bottom-[123px]  cursor-pointer p-3 pr-4"
            >
              <RiEyeOffLine className=" text-lg text-secondary-600 dark:text-secondary-300" />
            </div>
          )}

          <div className="flex justify-center items-center h-14">
            <Button type="submit" variant="accent" className=" w-36">
              Se connecter
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
