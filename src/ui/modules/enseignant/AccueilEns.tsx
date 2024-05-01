import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Header from "../../components/header/Header";

export default function AccueilEns() {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Header
        name={authState.nom.toUpperCase()}
        info="En tant qu'enseignant de l'ENI, vous avez les droits d'ajouter les notes de chaque étudiant qui sont inscrit aux matières que vous enseignez !"
      />
    </>
  );
}
