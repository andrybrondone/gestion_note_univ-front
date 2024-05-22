import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReleverNote from "../ui/modules/note/ReleverNote";

export default function ReleverNotePage() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut === "") {
      navigate("/");
    }
  }, [authState.statut, navigate]);

  return <>{authState.statut === "administrateur" && <ReleverNote />}</>;
}
