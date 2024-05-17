import * as Yup from "yup";

///^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const phoneRegex = /^(03[234])(?:\d{7}|\s?\d{2}\s?\d{3}\s?\d{2})$/;

// Enseignant
export const validationSchemaEns = Yup.object().shape({
  grade: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  id_pers: Yup.string()
    .notOneOf(
      ["Choisir une personne"],
      "Veuillez choisir un module pour la matière"
    )
    .required("Ce champ est obligatoire"),
});

// Etudiant
export const validationSchemaEtudiant = Yup.object().shape({
  matricule: Yup.string()
    .min(4, "Un matricule doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  niveau: Yup.string()
    .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
    .required("Ce champ est obligatoire"),
  statut: Yup.string()
    .oneOf(["Passant", "Redoublant", "Diplômé"], "Veuillez choisir le statut")
    .required("Ce champ est obligatoire"),
  parcours: Yup.string()
    .oneOf(["IG", "GBD", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
    .required("Ce champ est obligatoire"),
  id_pers: Yup.string()
    .notOneOf(
      ["Choisir une personne"],
      "Veuillez choisir un module pour la matière"
    )
    .required("Ce champ est obligatoire"),
});

// Matiere
export const validationSchemaMatiere = Yup.object().shape({
  nom_mat: Yup.string()
    .min(2, "Le nom d'une matière doit contenir au moin 2 caractères")
    .required("Ce champ est obligatoire"),
  credit: Yup.number()
    .integer("Des nombres entier seulement")
    .min(1, "Le crédit doit être superieur à 0")
    .required("Ce champ est obligatoire"),
  id_ens: Yup.string()
    .notOneOf(
      ["Choisir un enseignant"],
      "Veuillez choisir un enseignant pour la matière"
    )
    .required("Ce champ est obligatoire"),
  id_module: Yup.string()
    .notOneOf(
      ["Choisir un module"],
      "Veuillez choisir un module pour la matière"
    )
    .required("Ce champ est obligatoire"),
  niveau_mat: Yup.string()
    .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
    .required("Ce champ est obligatoire"),
  parcours: Yup.array()
    .of(
      Yup.string().oneOf(
        ["IG", "GBD", "ASR", "GID", "OCC"],
        "Veuillez choisir le parcours"
      )
    )
    .min(1, "Sélectionnez au moins un parcours")
    .max(5, "Vous ne pouvez sélectionner que 5 parcours maximum"),
});

// Module
export const validationSchemaModule = Yup.object().shape({
  nom_module: Yup.string()
    .min(4, "Le nom d'un module doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
});

// Note
export const validationSchemaNote = Yup.object().shape({
  note: Yup.number()
    .integer("Des nombres entier seulement")
    .min(0, "Une note ne doit pas être negative")
    .max(20, "Une note ne doit pas être supérieur à 20")
    .required("Ce champ est obligatoire"),
  id_et: Yup.string()
    .notOneOf(
      ["Choisir un Etudiant"],
      "Veuillez choisir un Etudiant pour la matière"
    )
    .required("Ce champ est obligatoire"),
  id_mat: Yup.string()
    .notOneOf(
      ["Choisir un Matiere"],
      "Veuillez choisir un Matiere pour la matière"
    )
    .required("Ce champ est obligatoire"),
});

// Personne
/*export const validationSchemaPersonne = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  phone: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(
      phoneRegex,
      "Veuillez entrer un numéro de téléphone malagasy valide"
    ),
  email: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(emailRegex, "Veuillez entrer une adresse e-mail valide"),
  adresse: Yup.string()
    .min(4, "Une adresse doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  lieu_nais: Yup.string()
    .min(4, "Une ville doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  date_nais: Yup.date()
    .required("Ce champ est obligatoire")
    .test("age", "Vous devez avoir entre 18 et 65 ans", function (value) {
      const now = new Date();
      const birthDate = new Date(value);
      const age = now.getFullYear() - birthDate.getFullYear();
      const minAge = 18;
      const maxAge = 65;

      if (isNaN(age)) {
        return false; // La date n'est pas valide
      }

      return age >= minAge && age <= maxAge;
    }),
  mdp: Yup.string(),
  statue: Yup.string()
    .oneOf(
      ["etudiant", "enseignant", "administrateur"],
      "Veuillez choisir le statut"
    )
    .required("Ce champ est obligatoire"),
});*/
export const validationSchemaPersonne = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moins 3 caractères")
    .required("Ce champ est obligatoire"),
  phone: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(
      phoneRegex,
      "Veuillez entrer un numéro de téléphone malagasy valide"
    ),
  email: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(emailRegex, "Veuillez entrer une adresse e-mail valide"),
  adresse: Yup.string()
    .min(4, "Une adresse doit contenir au moins 4 caractères")
    .required("Ce champ est obligatoire"),
  lieu_nais: Yup.string()
    .min(4, "Une ville doit contenir au moins 4 caractères")
    .required("Ce champ est obligatoire"),
  date_nais: Yup.date()
    .required("Ce champ est obligatoire")
    .test(
      "age",
      "Veuillez entrer une année valide",
      function (value, { parent }) {
        const now = new Date();
        const birthDate = new Date(value);
        const age = now.getFullYear() - birthDate.getFullYear();
        const minAge = parent.statue === "etudiant" ? 10 : 18; // Change minimum age based on statue

        if (isNaN(age)) {
          return false; // La date n'est pas valide
        }

        return age >= minAge;
      }
    ),
  mdp: Yup.string(),
  statue: Yup.string()
    .oneOf(
      ["etudiant", "enseignant", "administrateur"],
      "Veuillez choisir le statut"
    )
    .required("Ce champ est obligatoire"),
});

// AllInfoUser
export const validationSchemaAllInfoUser = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  phone: Yup.string()
    .required("Ce champ est obligatoire")
    .matches(
      phoneRegex,
      "Veuillez entrer un numéro de téléphone malagasy valide"
    ),
  email: Yup.string()
    .email("Entrez une adresse mail valide")
    .required("Ce champ est obligatoire"),
  adresse: Yup.string()
    .min(4, "Une adresse doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  lieu_nais: Yup.string()
    .min(4, "Une ville doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  date_nais: Yup.date()
    .required("Ce champ est obligatoire")
    .test("age", "Vous devez avoir entre 18 et 65 ans", function (value) {
      const now = new Date();
      const birthDate = new Date(value);
      const age = now.getFullYear() - birthDate.getFullYear();
      const minAge = 18;
      const maxAge = 65;

      if (isNaN(age)) {
        return false; // La date n'est pas valide
      }

      return age >= minAge && age <= maxAge;
    }),
  matricule: Yup.string()
    .min(4, "Un matricule doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  niveau: Yup.string()
    .oneOf(["L1", "L2", "L3", "M1", "M2"], "Veuillez choisir le niveau")
    .required("Ce champ est obligatoire"),
  statut: Yup.string()
    .oneOf(["Passant", "Redoublant", "Diplômé"], "Veuillez choisir le statut")
    .required("Ce champ est obligatoire"),
  parcours: Yup.string()
    .oneOf(["IG", "GBD", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
    .required("Ce champ est obligatoire"),
  grade: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
});
