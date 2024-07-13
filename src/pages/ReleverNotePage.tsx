import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import { ReleverNote } from "../ui/modules/note/ReleverNote";

export default function ReleverNotePage() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut === "") {
      navigate("/");
    }
  }, [dataUser.statut, navigate]);

  return (
    <>
      {dataUser.statut === "administrateur" && (
        <>
          <ReleverNote />
        </>
      )}
    </>
  );
}
