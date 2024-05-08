import { useContext } from "react";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { Container } from "../../components/container/Container";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import RowsTr from "../components/RowsTr";

export default function InfoCompteAdmin() {
  const { listPersonneById } = useContext(DataFetcherByIdContext);

  return (
    <>
      <Container>
        <Typography
          weight="bold"
          theme="gray"
          component="h1"
          variant="display"
          className="text-center mt-6 max-sm:text-6xl max-sm:font-bold"
        >
          Vos informations
        </Typography>
        <table className="flex items-center justify-center bg-gray-300 dark:bg-black rounded shadow-sm py-8 mt-3">
          <tbody>
            <RowsTr title="Nom :" value={listPersonneById.nom.toUpperCase()} />
            <RowsTr title="Prénom :" value={listPersonneById.prenom} />
            <RowsTr
              title="Numéro de téléphone :"
              value={listPersonneById.phone}
            />
            <RowsTr title="Adresse e-mail :" value={listPersonneById.email} />
            <RowsTr
              title="Date et lieu de naissance :"
              value={`${listPersonneById.date_nais} à ${listPersonneById.lieu_nais}`}
            />
            <RowsTr title="Adresse :" value={listPersonneById.adresse} />
          </tbody>
        </table>
        <div className="mt-10 flex items-center justify-center gap-7 max-sm:gap-5 max-sm:flex-col">
          <Button
            variant="update"
            icon={{ icon: RiPencilLine }}
            iconPosition="left"
            className="max-sm:w-full"
          >
            Changer de mot de passe
          </Button>
          <Button
            variant="delete"
            icon={{ icon: RiDeleteBin2Line }}
            iconPosition="left"
            className="max-sm:w-full"
          >
            Supprimer votre compte
          </Button>
        </div>
      </Container>
    </>
  );
}
