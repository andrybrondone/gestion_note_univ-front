import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import ListeEtudiant from "../ui/modules/etudiant/ListeEtudiant";

export default function Etudiant() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut === "") {
      navigate("/");
    }
  }, [dataUser.statut, navigate]);

  return <>{dataUser.statut !== "" && <ListeEtudiant />}</>;
}
