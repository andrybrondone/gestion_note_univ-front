import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataUserContext } from "../context/DataUserContext";
import { Container } from "../ui/components/container/Container";
import { Typography } from "../ui/design-system/typography/Typography";
import FormLogin from "../ui/modules/components/FormLogin";
import LogoENI from "/assets/images/logoENI.png";

export default function Login() {
  const { dataUser } = useContext(DataUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser.statut !== "") {
      navigate("/accueil");
    }
  }, [dataUser.statut, navigate]);

  return (
    <>
      {dataUser.statut === "" && (
        <Container className="dark:text-white grid grid-cols-2 max-md:grid-cols-1 items-center gap-10 max-lg:gap-3 pt-14 pb-6  max-[500px]:px-5">
          <div className="flex items-center gap-4 flex-col text-center max-md:hidden">
            <div className="w-40 h-36">
              <img src={LogoENI} alt="Logo ENI" width={150} />
            </div>
            <Typography
              variant="body-sm"
              component="p"
              className="max-[900px]:text-caption1"
            >
              Bienvenue sur cette application de gestion de note pour un
              établissement universitaire. <br />
              L'Ecole Nationale d'Informatique (ENI), qui fait partie de
              l'université de Fianarantsoa a été choisi pour la réalisation de
              ce projet .
            </Typography>
            <span className="text-start text-caption4 leading-6 font-bold mt-5 max-md:hidden">
              PS : Pour accéder a l'application <br />
              e-mail: brondone@gmail.com | mot de passe : admin123
            </span>
          </div>
          <FormLogin />
          <span className="text-start text-caption4 leading-6 font-bold mt-5 md:hidden">
            PS : Pour acceder au l'application <br />
            e-mail: brondone@gmail.com | mot de passe : admin123
          </span>
        </Container>
      )}
    </>
  );
}
