import axios from "axios";
import { useContext } from "react";
import {
  RiAddCircleLine,
  RiAddLine,
  RiDeleteBin2Line,
  RiMoreFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import useToggle from "../../../hook/useToggle";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Button } from "../../design-system/button/Button";
import ConfirmModale from "../../design-system/confirm-modale/ConfirmModale";
import { Typography } from "../../design-system/typography/Typography";
import FormNote from "../note/FormNote";
import AllInfoUser from "./AllInfoUser";

interface Props {
  photo: string | undefined;
  matricule?: string;
  grade?: string;
  nom: string;
  prenom: string;
  niveau?: string;
  parcours?: string;
  phone: string;
  email: string;
  statut: "etudiant" | "enseignant" | "administrateur";
  idEt?: number;
  idEns?: number;
  refetch: () => void;
}

export default function ListInfoUser({
  photo,
  matricule,
  grade,
  nom,
  prenom,
  niveau,
  parcours,
  phone,
  email,
  statut,
  idEt,
  idEns,
  refetch,
}: Props) {
  const { authState } = useContext(AuthContext);

  const { toggleFormNote } = useContext(ShowFormContext);

  const { value, toggleValue } = useToggle(false);

  const {
    listEtudiantById,
    getListEtudiantById,
    listEnseignantById,
    getListEnseignantById,
  } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton voir +
  const {
    toggleEditEnseignantForm,
    toggleEditEtudiantForm,
    isEditEnseignantForm,
    isEditEtudiantForm,
    isConfirmDialog,
    toggleConfirmDialog,
  } = useContext(ToggleEditFormContext);

  const handleClickGetEt = async (id: number | undefined) => {
    await getListEtudiantById(id);
    toggleValue();
  };

  const handleClickAddNote = async (id: number | undefined) => {
    await getListEtudiantById(id);
    toggleFormNote();
  };

  const handleClickDeleteEns = async (id: number | undefined) => {
    await getListEnseignantById(id);
    toggleConfirmDialog();
  };

  const handleClickDeleteEt = async (id: number | undefined) => {
    await getListEtudiantById(id);
    toggleConfirmDialog();
  };

  const handleClickEditEns = async (id: number | undefined) => {
    await getListEnseignantById(id);
    toggleEditEnseignantForm();
  };

  const hardDeleteEtudiant = (id: number | undefined) => {
    axios
      .delete(`http://localhost:3001/personne/${id}`)
      .then(() => {
        toast.success(
          "Les informations sur cette étudiant ont été supprimé définitivement"
        );
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateStatutEns = (id: number | undefined) => {
    axios
      .put(`http://localhost:3001/enseignant/statut/${id}`)
      .then(() => {
        toast.success(
          "L'enseignant a été supprimer de la liste des enseignants actif de l'ENI"
        );
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="flex max-[870px]:justify-center gap-4 mb-3 bg-gray-300/50 dark:bg-gray-900 px-4 py-6 rounded shadow">
        <div className="max-sm:hidden mt-5">
          <Avatar
            src={`http://localhost:3001/images/${photo}`}
            alt=""
            size="very-large"
          />
        </div>
        <div className="flex flex-col gap-2">
          {statut === "etudiant" && (
            <Typography
              variant="caption2"
              theme="gray"
              component="div"
              className="flex items-center gap-3"
            >
              N° matricule :
              <Typography
                variant="caption1"
                component="p"
                weight="bold"
                className="uppercase"
              >
                {matricule}
              </Typography>
            </Typography>
          )}

          <Typography
            variant="caption2"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Nom :
            <Typography
              variant="caption1"
              component="p"
              weight="bold"
              className="uppercase"
            >
              {nom}
            </Typography>
          </Typography>

          <Typography
            variant="caption2"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Prénom :
            <Typography
              variant="caption1"
              component="p"
              weight="bold"
              className=" capitalize"
            >
              {prenom}
            </Typography>
          </Typography>

          {statut === "etudiant" && (
            <Typography
              variant="caption2"
              theme="gray"
              component="div"
              className="flex items-center gap-3"
            >
              Classe :
              <Typography
                variant="caption1"
                component="p"
                weight="bold"
                className="capitalize"
              >
                {`${niveau} ${parcours}`}
              </Typography>
            </Typography>
          )}

          {statut === "enseignant" && (
            <>
              <Typography
                variant="caption2"
                theme="gray"
                component="div"
                className="flex items-center gap-3"
              >
                Grade :
                <Typography
                  variant="caption1"
                  component="p"
                  weight="bold"
                  className="capitalize"
                >
                  {grade}
                </Typography>
              </Typography>
            </>
          )}

          <Typography
            variant="caption2"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            N° de téléphone :
            <Typography variant="caption1" component="p" weight="bold">
              {phone}
            </Typography>
          </Typography>

          <Typography
            variant="caption2"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Adresse e-mail :
            <Typography variant="caption1" component="p" weight="bold">
              {email}
            </Typography>
          </Typography>

          <div className=" flex items-center gap-3 mt-3">
            {authState.statut === "administrateur" && (
              <>
                {statut === "enseignant" && (
                  <Button
                    variant="delete"
                    icon={{ icon: RiDeleteBin2Line }}
                    action={() => {
                      handleClickDeleteEns(idEns);
                    }}
                  >
                    Supprimer
                  </Button>
                )}

                {statut === "etudiant" && (
                  <Button
                    variant="delete"
                    icon={{ icon: RiDeleteBin2Line }}
                    action={() => {
                      handleClickDeleteEt(idEt);
                    }}
                  >
                    Supprimer
                  </Button>
                )}
              </>
            )}

            {authState.statut === "enseignant" && (
              <>
                {statut === "etudiant" && (
                  <Button
                    variant="secondary"
                    icon={{ icon: RiAddCircleLine }}
                    action={() => {
                      handleClickAddNote(idEt);
                    }}
                  >
                    Ajouter note
                  </Button>
                )}
              </>
            )}

            {statut === "etudiant" && (
              <div
                className="relative"
                onClick={() => {
                  handleClickGetEt(idEt);
                }}
              >
                <Button
                  variant="ico"
                  iconTheme="secondary"
                  icon={{ icon: RiMoreFill }}
                />
                {value && (
                  <>
                    <div
                      className="anim-transition top-0 left-0 w-full h-[100vh] fixed z-20"
                      onClick={toggleValue}
                    />
                    <Typography
                      variant="caption2"
                      component="div"
                      className="absolute w-[180px] top-6 left-12 text-caption1 bg-white/80 dark:bg-black px-6 py-2 shadow rounded flex flex-col gap-2 z-30 "
                    >
                      <p
                        className="cursor-pointer hover:text-secondary-300 transition"
                        onClick={toggleEditEtudiantForm}
                      >
                        Voir +
                      </p>
                      <Link
                        to="/etudiants/relever-de-note"
                        className=" hover:text-secondary-300 transition"
                      >
                        Relever de notes
                      </Link>
                    </Typography>
                  </>
                )}
              </div>
            )}

            {statut === "enseignant" && (
              <Button
                variant="blue"
                action={() => {
                  handleClickEditEns(idEns);
                }}
                icon={{ icon: RiAddLine }}
              >
                Voir
              </Button>
            )}
          </div>
        </div>
      </div>
      {statut === "etudiant" && <FormNote idEt={listEtudiantById.id} />}

      {statut === "etudiant" && isEditEtudiantForm && (
        <AllInfoUser statutPers="etudiant" />
      )}
      {statut === "enseignant" && isEditEnseignantForm && (
        <AllInfoUser statutPers="enseignant" />
      )}

      {isConfirmDialog && statut === "etudiant" && (
        <ConfirmModale
          message="Voulez-vous vraiment supprimer cette étudiant ? Tous les informations qui lui sont reliées seront supprimées définitivement, y compris ces notes"
          action={() => {
            hardDeleteEtudiant(listEtudiantById.PersonneId);
            toggleConfirmDialog();
          }}
        />
      )}

      {isConfirmDialog && statut === "enseignant" && (
        <ConfirmModale
          message="Vous êtes sur le point de supprimer cette personne de la liste des enseignants actif. Vous avez toujours la possibiliter de voir ces informations dans la liste des anciens enseignants de l'ENI"
          action={() => {
            updateStatutEns(listEnseignantById.PersonneId);
            toggleConfirmDialog();
          }}
        />
      )}
    </>
  );
}
