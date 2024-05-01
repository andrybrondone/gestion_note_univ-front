import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ListeEns from "../ui/modules/enseignant/ListeEns";

export default function Enseignant() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut === "") {
      navigate("/");
    }
  }, [authState.statut, navigate]);

  return <>{authState.statut !== "" && <ListeEns />}</>;
}
