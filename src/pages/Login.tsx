import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Container } from "../ui/components/container/Container";
import { Typography } from "../ui/design-system/typography/Typography";
import FormLogin from "../ui/modules/components/FormLogin";
import LogoENI from "/assets/images/logoENI.png";

export default function Login() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.statut !== "") {
      navigate("/accueil");
    }
  }, [authState.statut, navigate]);

  return (
    <>
      {authState.statut === "" && (
        <Container className="dark:text-white grid grid-cols-2 max-md:grid-cols-1 items-center gap-10 max-lg:gap-3 py-24 max-md:py-16 max-md:px-10 max-[500px]:px-5">
          <div className="flex items-center gap-4 flex-col text-center">
            <img src={LogoENI} alt="Logo ENI" width={150} />
            <Typography
              variant="body-sm"
              component="p"
              className="max-md:hidden"
            >
              Bienvenue sur cette application de gestion de note pour un
              établissement universitaire. <br />
              L'Ecole Nationale d'Informatique (ENI), qui fait partie de
              l'université de Fianarantsoa a été choisi pour la réalisation de
              ce projet .
            </Typography>
          </div>
          <FormLogin />
        </Container>
      )}
    </>
  );
}
