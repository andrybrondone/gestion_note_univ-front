import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ToggleEditFormContext = createContext({
  // Etudiant
  isEditEtudiantForm: false,
  toggleEditEtudiantForm: () => {},
  // Enseignant
  isEditEnseignantForm: false,
  toggleEditEnseignantForm: () => {},
  // Module
  isEditModuleForm: false,
  toggleEditModuleForm: () => {},
  // Matiere
  isEditMatiereForm: false,
  toggleEditMatiereForm: () => {},
  // Confirm dialog
  isConfirmDialog: false,
  toggleConfirmDialog: () => {},
});

export const ToggleEditFormProvider = ({ children }: Props) => {
  //Etudiant
  const [isEditEtudiantForm, setIsEditEtudiantForm] = useState(false);
  const toggleEditEtudiantForm = () =>
    setIsEditEtudiantForm(!isEditEtudiantForm);

  // Enseignant
  const [isEditEnseignantForm, setIsEditEnseignantForm] = useState(false);
  const toggleEditEnseignantForm = () =>
    setIsEditEnseignantForm(!isEditEnseignantForm);

  // Module
  const [isEditModuleForm, setIsEditModuleForm] = useState(false);
  const toggleEditModuleForm = () => setIsEditModuleForm(!isEditModuleForm);

  // Module
  const [isEditMatiereForm, setIsEditMatiereForm] = useState(false);
  const toggleEditMatiereForm = () => setIsEditMatiereForm(!isEditMatiereForm);

  // Confirm Dialog
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const toggleConfirmDialog = () => setIsConfirmDialog(!isConfirmDialog);

  return (
    <ToggleEditFormContext.Provider
      value={{
        isEditEtudiantForm,
        toggleEditEtudiantForm,
        isEditEnseignantForm,
        toggleEditEnseignantForm,
        isEditModuleForm,
        toggleEditModuleForm,
        isEditMatiereForm,
        toggleEditMatiereForm,
        isConfirmDialog,
        toggleConfirmDialog,
      }}
    >
      {children}
    </ToggleEditFormContext.Provider>
  );
};
