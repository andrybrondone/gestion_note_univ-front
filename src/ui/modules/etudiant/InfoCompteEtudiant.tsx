import { useContext } from "react";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { Container } from "../../components/container/Container";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import RowsTr from "../components/RowsTr";

export default function InfoCompteEtudiant() {
  const { listPersonneEtById } = useContext(DataFetcherByIdContext);

  return (
    <>
      <Container>
        <Typography
          weight="bold"
          theme="gray"
          component="h1"
          variant="display"
          className="text-center mt-6 max-sm:text-6xl max-sm:font-bold text-gray-600"
        >
          Vos informations
        </Typography>
        <table className="flex items-center justify-center bg-gray-300 dark:bg-black rounded shadow-sm py-8 mt-3">
          {listPersonneEtById.Etudiants?.map((value) => {
            return (
              <tbody key={value.matricule}>
                <RowsTr
                  title="Numéro matricule :"
                  value={value.matricule}
                  classNameIcon="hidden"
                />
                <RowsTr title="Nom :" value={listPersonneEtById.nom} />
                <RowsTr title="Prénom :" value={listPersonneEtById.prenom} />
                <RowsTr
                  title="Niveau :"
                  value={value.niveau}
                  classNameIcon="hidden"
                />
                <RowsTr
                  title="Parcours :"
                  value={value.parcours}
                  classNameIcon="hidden"
                />
                <RowsTr
                  title="Numéro de téléphone :"
                  value={listPersonneEtById.phone}
                />
                <RowsTr
                  title="Adresse e-mail :"
                  value={listPersonneEtById.email}
                />
                <RowsTr
                  title="Date et lieu de naissance :"
                  value={`${listPersonneEtById.date_nais} à ${listPersonneEtById.lieu_nais}`}
                />
                <RowsTr title="Adresse :" value={listPersonneEtById.adresse} />
                <RowsTr
                  title="Statut :"
                  value={value.statut}
                  classNameIcon="hidden"
                />
              </tbody>
            );
          })}
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
