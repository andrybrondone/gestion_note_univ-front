import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Header from "../../components/header/Header";

export default function AccueilEtudiant() {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Header
        name={authState.nom.toUpperCase()}
        info="En tant qu'etudiant de l'ENI, vous avez les droits de consulter la liste des enseignants, de voir vos notes dès qu'ils sont disponnibles et aussi de générer votre relever de note !"
      />
    </>
  );
}
