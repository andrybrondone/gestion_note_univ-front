import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import InfoCompteAdmin from "../ui/modules/admin/InfoCompteAdmin";
import InfoCompteEns from "../ui/modules/enseignant/InfoCompteEns";
import InfoCompteEtudiant from "../ui/modules/etudiant/InfoCompteEtudiant";

export default function InfoCompte() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut === "") {
      navigate("/");
    }
  }, [authState.statut, navigate]);

  return (
    <>
      {authState.statut === "etudiant" && <InfoCompteEtudiant />}
      {authState.statut === "enseignant" && <InfoCompteEns />}
      {authState.statut === "administrateur" && <InfoCompteAdmin />}
    </>
  );
}
