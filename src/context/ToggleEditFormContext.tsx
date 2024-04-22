import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const ToggleEditFormContext = createContext({
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
