import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Input } from "../../components/form/Input";
import { Select } from "../../components/form/Select";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

interface FormValues {
  matricule: string;
  nom_et: string;
  prenom_et: string;
  email_et: string;
  adr_et: string;
  lieu_nes_et: string;
  date_nes_et: string;
  niveau: string;
  parcours: string;
  photo: string;
}

export default function FormEt() {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const initialValues: FormValues = {
    matricule: "",
    nom_et: "",
    prenom_et: "",
    email_et: "",
    adr_et: "",
    lieu_nes_et: "",
    date_nes_et: "",
    niveau: "",
    parcours: "",
    photo: "",
  };

  // Validation des données dans le formulaire
  const validationSchema = Yup.object().shape({
    matricule: Yup.string()
      .min(4, "Un matricule doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    nom_et: Yup.string()
      .min(3, "Un nom doit contenir au moin 3 caractères")
      .required("Ce champ est obligatoire"),
    prenom_et: Yup.string()
      .min(3, "Un prénom doit contenir au moin 3 caractères")
      .required("Ce champ est obligatoire"),
    email_et: Yup.string()
      .email("Entrez une adresse mail valide")
      .required("Ce champ est obligatoire"),
    adr_et: Yup.string()
      .min(4, "Une adresse doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    lieu_nes_et: Yup.string()
      .min(4, "Une ville doit contenir au moin 4 caractères")
      .required("Ce champ est obligatoire"),
    date_nes_et: Yup.date().required("Ce champ est obligatoire"),
    niveau: Yup.string()
      .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
      .required("Ce champ est obligatoire"),
    parcours: Yup.string()
      .oneOf(["IG", "GB", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
      .required("Ce champ est obligatoire"),
    photo: Yup.string().required("L'image est obligatoire"),
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("matricule", data.matricule);
    formData.append("nom", data.nom_et);
    formData.append("prenom", data.prenom_et);
    formData.append("email", data.email_et);
    formData.append("adr", data.adr_et);
    formData.append("lieu_nes", data.lieu_nes_et);
    formData.append("date_nes", data.date_nes_et);
    formData.append("niveau", data.niveau);
    formData.append("parcours", data.parcours);
    if (file) {
      formData.append("photo", file);
    }

    axios
      .post("http://localhost:3001/etudiant", formData)
      .then(() => {
        console.log(formData);

        console.log("ok");
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  return (
    <div className="bg-gray-400 dark:bg-black p-8 rounded w-[950px] text-caption1 shadow-lg">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-5">
          <Typography variant="h3" component="h3" className="text-center">
            Ajouter étudiant
          </Typography>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Input
                label="Matricule"
                name="matricule"
                type="text"
                placeholder="ex. 1332 H-F"
              />

              <Input
                label="Nom"
                name="nom_et"
                type="text"
                placeholder="ex. ANDRIAMBOLOLOMANANA"
              />

              <Input
                label="Prénom"
                name="prenom_et"
                type="text"
                placeholder="ex. Brondone"
              />

              <Input
                label="E-mail"
                name="email_et"
                type="email"
                placeholder="ex. andry.brondone@gmail.com"
              />

              <Input
                label="Adresse"
                name="adr_et"
                type="text"
                placeholder="ex. Soatsihadino"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Input
                label="Date de naissance"
                name="date_nes_et"
                type="date"
                placeholder="ex. 17/02/2004"
              />

              <Input
                label="Lieu de naissance"
                name="lieu_nes_et"
                type="text"
                placeholder="ex. Manakara"
              />

              <Select label="Niveau" name="niveau">
                <option value="">Choisir le niveau</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </Select>

              <Select label="Parcours" name="parcours">
                <option value="">Choisir le parcours</option>
                <option value="IG">IG</option>
                <option value="GB">GB</option>
                <option value="ASR">ASR</option>
                <option value="GID">GID</option>
                <option value="OCC">OCC</option>
              </Select>

              <div className="flex flex-col gap-4">
                <label>Photo</label>
                <input type="file" name="photo" onChange={handleFile} />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <Button type="submit" variant="accent" className=" w-36">
              Enregistrer
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
