import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ListeEtudiant from "../ui/modules/etudiant/ListeEtudiant";

export default function Etudiant() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut === "") {
      navigate("/");
    }
  }, [authState.statut, navigate]);

  return <>{authState.statut !== "" && <ListeEtudiant />}</>;
}
