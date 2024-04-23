import { useContext } from "react";
import { RiAddLine, RiDeleteBin2Line } from "react-icons/ri";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import AllInfoUser from "./AllInfoUser";
import AllInfoUser2 from "./AllInfoUser2";

interface Props {
  photo: string | undefined;
  matricule?: string;
  grade?: string;
  nom: string;
  prenom: string;
  email: string;
  statut: "etudiant" | "enseignant" | "administrateur";
  idEt?: number;
  idEns?: number;
}

export default function ListInfoUser({
  photo,
  matricule,
  grade,
  nom,
  prenom,
  email,
  statut,
  idEt,
  idEns,
}: Props) {
  const { getListEtudiantById, getListEnseignantById } = useContext(
    DataFetcherByIdContext
  );

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton voir +
  const {
    toggleEditEnseignantForm,
    toggleEditEtudiantForm,
    isEditEnseignantForm,
    isEditEtudiantForm,
  } = useContext(ToggleEditFormContext);

  const handleClicEditEt = async (id: number | undefined) => {
    await getListEtudiantById(id);
    toggleEditEtudiantForm();
  };

  const handleClicEditEns = async (id: number | undefined) => {
    await getListEnseignantById(id);
    toggleEditEnseignantForm();
  };

  return (
    <>
      <div className="flex gap-5 mb-16">
        <Avatar
          src={`http://localhost:3001/images/${photo}`}
          alt=""
          size="very-large"
        />
        <div className="flex flex-col gap-2">
          {statut === "enseignant" && (
            <Typography
              variant="body-sm"
              theme="gray"
              component="div"
              className="flex items-center gap-3"
            >
              Grade :
              <Typography
                variant="body-sm"
                component="p"
                className="font-semibold capitalize"
              >
                {grade}
              </Typography>
            </Typography>
          )}

          {statut === "etudiant" && (
            <Typography
              variant="body-sm"
              theme="gray"
              component="div"
              className="flex items-center gap-3"
            >
              N° matricule :
              <Typography
                variant="body-sm"
                component="p"
                className="font-semibold uppercase"
              >
                {matricule}
              </Typography>
            </Typography>
          )}

          <Typography
            variant="body-sm"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Nom :
            <Typography
              variant="body-lg"
              component="h5"
              className=" font-semibold uppercase"
            >
              {nom}
            </Typography>
          </Typography>

          <Typography
            variant="body-sm"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Prénom :
            <Typography
              variant="body-lg"
              component="h5"
              className=" capitalize font-semibold"
            >
              {prenom}
            </Typography>
          </Typography>

          <Typography
            variant="body-sm"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Adresse e-mail :
            <Typography
              variant="caption1"
              component="p"
              className="font-semibold"
            >
              {email}
            </Typography>
          </Typography>

          <div className=" flex items-center gap-3 mt-3">
            {statut === "etudiant" && (
              <Button
                variant="secondary"
                action={() => {
                  handleClicEditEt(idEt);
                }}
                icon={{ icon: RiAddLine }}
              >
                Voir
              </Button>
            )}
            {statut === "enseignant" && (
              <Button
                variant="secondary"
                action={() => {
                  handleClicEditEns(idEns);
                }}
                icon={{ icon: RiAddLine }}
              >
                Voir
              </Button>
            )}
            <Button
              variant="delete"
              icon={{ icon: RiDeleteBin2Line }}
              iconPosition="left"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      {statut === "etudiant" && isEditEtudiantForm && (
        <AllInfoUser2 statutPers="etudiant" />
      )}
      {statut === "enseignant" && isEditEnseignantForm && (
        <AllInfoUser2 statutPers="enseignant" />
      )}
    </>
  );
}
