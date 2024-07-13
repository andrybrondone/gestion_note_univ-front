import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import InfoCompteAdmin from "../ui/modules/admin/InfoCompteAdmin";
import InfoCompteEns from "../ui/modules/enseignant/InfoCompteEns";
import InfoCompteEtudiant from "../ui/modules/etudiant/InfoCompteEtudiant";

export default function InfoCompte() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut === "") {
      navigate("/");
    }
  }, [dataUser.statut, navigate]);

  return (
    <>
      {dataUser.statut === "etudiant" && <InfoCompteEtudiant />}
      {dataUser.statut === "enseignant" && <InfoCompteEns />}
      {dataUser.statut === "administrateur" && <InfoCompteAdmin />}
    </>
  );
}
