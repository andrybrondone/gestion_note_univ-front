export interface FormMatiereValues {
  id?: number;
  id_ens: string;
  id_module: string;
  nom_mat: string;
  credit: string;
  niveau_mat: string;
  parcours: string;
  prenom_ens?: string;
}

export interface ListeMatiereValues {
  id: number;
  nom_mat: string;
  credit: string;
  niveau_mat: string;
  parcours: [];
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

export interface ListeNoteValues {
  id: number;
  note: string;
  MatiereId: string;
  EtudiantId: number;
  Etudiant: {
    id: number;
    matricule: string;
    parcours: string;
    Personne: {
      nom: string;
      prenom: string;
    };
  };
  Matiere: {
    nom_mat: string;
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
  phone: string;
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
  id_et: number | undefined;
  id_mat: string;
  note: string;
}

export interface FormAllUsersValues {
  id?: string;
  nom: string;
  prenom: string;
  phone: string;
  email: string;
  adresse: string;
  lieu_nais: string;
  date_nais: string;
  matricule?: string;
  statut?: string;
  niveau?: string;
  parcours?: string;
  grade?: string;
}
