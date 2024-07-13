import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import AccueilAdmin from "../ui/modules/admin/AccueilAdmin";
import AccueilEns from "../ui/modules/enseignant/AccueilEns";
import AccueilEtudiant from "../ui/modules/etudiant/AccueilEtudiant";

export default function Accueil() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut === "") {
      navigate("/");
    }
  }, [dataUser.statut, navigate]);

  return (
    <>
      {dataUser.statut === "etudiant" && <AccueilEtudiant />}
      {dataUser.statut === "enseignant" && <AccueilEns />}
      {dataUser.statut === "administrateur" && <AccueilAdmin />}
    </>
  );
}
