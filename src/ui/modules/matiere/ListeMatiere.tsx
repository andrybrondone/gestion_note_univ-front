import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import {
  RiAddCircleLine,
  RiDeleteBin2Fill,
  RiPencilFill,
} from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import useSearch from "../../../hook/useSearch";
import DataEmpty from "../../../pages/DataEmpty";
import { ListeMatiereValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Button } from "../../design-system/button/Button";
import ConfirmModale from "../../design-system/confirm-modale/ConfirmModale";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import TrieParNiveau from "../components/TrieParNiveau";
import FormMatiere from "./FormMatiere";
import { url_api } from "../../../utils/url-api";

export default function ListeMatiere() {
  // Hook pour savoir l'état du formulaire matiere
  const { isOpenFormMatiere, toggleFormMatiere } = useContext(ShowFormContext);

  // Hook pour recupérer les données par son identifiant
  const { getListMatiereById } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const { toggleEditMatiereForm, isConfirmDialog, toggleConfirmDialog } =
    useContext(ToggleEditFormContext);

  const { selectedNiveau, handleChangeNiveau } = useSearch();

  // Hoock pour la recupération des données et faire la pagination
  const {
    isLoading,
    isError,
    refetch,
    data,
    currentPage,
    totalPage,
    setCurrentPage,
  } = useDataFetcher<ListeMatiereValues[]>({
    endpoint: `${url_api}/matiere/recherche/${selectedNiveau}`,
    processData: (data) => data.matieres,
  });

  useEffect(() => {
    if (!isOpenFormMatiere) {
      refetch();
    }
  }, [isOpenFormMatiere, refetch]);

  const handleClicEdit = async (id: number | undefined) => {
    await getListMatiereById(id);
    toggleEditMatiereForm();
    toggleFormMatiere();
  };

  // Pour supprimer une module de la BD
  const deleteModule = (id: number | undefined) => {
    axios
      .delete(`${url_api}/matiere/${id}`)
      .then(() => {
        toast.success("La matière a été supprimé avec succès");
        refetch();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refIdModule = useRef<number>();

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
      <div className="flex justify-between items-center">
        <TrieParNiveau onChangeNiveau={handleChangeNiveau} />

        <Button
          variant="secondary"
          icon={{ icon: RiAddCircleLine }}
          className="mb-2"
          action={toggleFormMatiere}
        >
          Ajouter une matière
        </Button>
      </div>
      {data.length > 0 ? (
        <div className="h-[469px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">Matière</th>
                <th>Niveau</th>
                <th>Parcours</th>
                <th>Crédit</th>
                <th>Enseignant</th>
                <th>Module</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: ListeMatiereValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2"> {value.nom_mat}</td>
                    <td>{value.niveau_mat}</td>
                    <td>{value.parcours.join(", ")}</td>
                    <td>{value.credit}</td>
                    <td>{`${value.Enseignant.Personne.nom}`}</td>
                    <td>{value.Module.nom_module}</td>
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
                          refIdModule.current = value.id;
                          toggleConfirmDialog();
                        }}
                      />
                    </td>
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

      <FormMatiere />

      {isConfirmDialog && (
        <ConfirmModale
          message="Voulez vous vraiment supprimer définitivement cette matière ?"
          action={() => {
            deleteModule(refIdModule.current);
            toggleConfirmDialog();
          }}
        />
      )}
    </div>
  );
}
