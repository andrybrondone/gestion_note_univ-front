import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { RiDeleteBin2Fill, RiPencilFill } from "react-icons/ri";
import { toast } from "sonner";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import { ListeNoteValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import ConfirmModale from "../../design-system/confirm-modale/ConfirmModale";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import FormNote from "./FormNote";
import DataEmpty from "../../../pages/DataEmpty";

export default function ListeNote() {
  const { authState } = useContext(AuthContext);

  // Hook pour savoir l'état du formulaire matiere
  const { isOpenFormNote, toggleFormNote } = useContext(ShowFormContext);

  // Hook pour recupérer les données par son identifiant
  const { getListNoteById } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const { toggleEditNoteForm, isConfirmDialog, toggleConfirmDialog } =
    useContext(ToggleEditFormContext);

  // Hoock pour la recupération des données et faire la pagination
  const {
    isLoading,
    isError,
    refetch,
    data,
    currentPage,
    totalPage,
    setCurrentPage,
  } = useDataFetcher<ListeNoteValues[]>({
    endpoint: `http://localhost:3001/note`,
    processData: (data) => data.notes,
  });

  useEffect(() => {
    if (!isOpenFormNote) {
      refetch();
    }
  }, [isOpenFormNote, refetch]);

  const handleClicEdit = async (id: number | undefined) => {
    await getListNoteById(id);
    toggleEditNoteForm();
    toggleFormNote();
  };

  // Pour supprimer une note de la BD
  const deleteNote = (id: number | undefined) => {
    axios
      .delete(`http://localhost:3001/note/${id}`)
      .then(() => {
        toast.success("La note a été supprimé avec succès");
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refIdNote = useRef<number>();

  if (isLoading)
    return (
      <Container className="h-[57vh]">
        <div className="absolute top-52 left-1/2 -translate-x-1/2">
          <Spinner size="large" />
        </div>
      </Container>
    );
  if (isError)
    return (
      <Container className="h-[57vh]">
        <div className="absolute top-52 left-1/2 -translate-x-1/2">
          <Typography
            variant="body-base"
            component="p"
            theme="danger"
            className="font-semibold"
          >
            Erreur lors de la recupération des données
          </Typography>
        </div>
      </Container>
    );

  return (
    <div className="w-[900px]">
      {data.length > 0 ? (
        <div className="h-[469px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">N° matricule</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Matière</th>
                <th>Note</th>
                {authState.statut === "enseignant" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: ListeNoteValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2"> {value.Etudiant.matricule}</td>
                    <td>{value.Etudiant.Personne.nom}</td>
                    <td>{value.Etudiant.Personne.prenom}</td>
                    <td>{value.Matiere.nom_mat}</td>
                    <td>{value.note}</td>
                    {authState.statut === "enseignant" && (
                      <td className="flex items-center justify-center py-2 text-3xl gap-2 max-sm:text-2xl">
                        <RiPencilFill
                          className="text-alert-warning cursor-pointer"
                          onClick={() => {
                            handleClicEdit(value.id);
                          }}
                        />
                        <RiDeleteBin2Fill
                          className="text-alert-danger cursor-pointer"
                          onClick={() => {
                            refIdNote.current = value.id;
                            toggleConfirmDialog();
                          }}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <DataEmpty />
      )}

      {data.length > 0 && (
        <ButtonPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
        />
      )}

      <FormNote idEt={refIdNote.current} />

      {isConfirmDialog && (
        <ConfirmModale
          message="Voulez vous vraiment supprimer définitivement cette note ?"
          action={() => {
            deleteNote(refIdNote.current);
            toggleConfirmDialog();
          }}
        />
      )}
    </div>
  );
}
