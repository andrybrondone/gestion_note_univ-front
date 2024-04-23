import * as Yup from "yup";

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
    .oneOf(["IG", "GB", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
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
export const validationSchemaPersonne = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  prenom: Yup.string()
    .min(3, "Un prénom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
  email: Yup.string()
    .email("Entrez une adresse mail valide")
    .required("Ce champ est obligatoire"),
  adresse: Yup.string()
    .min(4, "Une adresse doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  lieu_nais: Yup.string()
    .min(4, "Une ville doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  date_nais: Yup.date().required("Ce champ est obligatoire"),
  mdp: Yup.string().required("Ce champ est obligatoire"),
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
  email: Yup.string()
    .email("Entrez une adresse mail valide")
    .required("Ce champ est obligatoire"),
  adresse: Yup.string()
    .min(4, "Une adresse doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  lieu_nais: Yup.string()
    .min(4, "Une ville doit contenir au moin 4 caractères")
    .required("Ce champ est obligatoire"),
  date_nais: Yup.date().required("Ce champ est obligatoire"),
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
    .oneOf(["IG", "GB", "ASR", "GID", "OCC"], "Veuillez choisir le parcours")
    .required("Ce champ est obligatoire"),
  grade: Yup.string()
    .min(3, "Un nom doit contenir au moin 3 caractères")
    .required("Ce champ est obligatoire"),
});
