import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AccueilAdmin from "../ui/modules/admin/AccueilAdmin";
import AccueilEns from "../ui/modules/enseignant/AccueilEns";
import AccueilEtudiant from "../ui/modules/etudiant/AccueilEtudiant";

export default function Accueil() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut === "") {
      navigate("/");
    }
  }, [authState.statut, navigate]);

  return (
    <>
      {authState.statut === "etudiant" && <AccueilEtudiant />}
      {authState.statut === "enseignant" && <AccueilEns />}
      {authState.statut === "administrateur" && <AccueilAdmin />}
    </>
  );
}
