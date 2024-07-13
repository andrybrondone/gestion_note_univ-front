import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import ListeEns from "../ui/modules/enseignant/ListeEns";

export default function Enseignant() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut === "") {
      navigate("/");
    }
  }, [dataUser.statut, navigate]);

  return <>{dataUser.statut !== "" && <ListeEns />}</>;
}
