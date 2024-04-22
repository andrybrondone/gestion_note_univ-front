export interface FormMatiereValues {
  id?: number;
  id_ens: string;
  id_module: string;
  nom_mat: string;
  credit: string;
  niveau_mat: string;
  prenom_ens?: string;
}

export interface ListeMatiereValues {
  id: number;
  nom_mat: string;
  credit: string;
  niveau_mat: string;
  Enseignant: {
    Personne: {
      nom: string;
      prenom: string;
    };
  };
  Module: {
    nom_module: string;
  };
}

export interface InfoEnsProps {
  id: string;
  Personne: {
    prenom?: string;
    nom?: string;
  };
}

export interface FormModuleValues {
  id?: number;
  nom_module: string;
}

export interface FormPersonneValues {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
  lieu_nais: string;
  date_nais: string;
  mdp: string;
  photo: string;
  statue: string;
}

export interface FormNoteValues {
  id?: string;
  id_et: string;
  id_mat: string;
  note: string;
}
