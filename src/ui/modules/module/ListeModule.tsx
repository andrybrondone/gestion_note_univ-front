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
import DataEmpty from "../../../pages/DataEmpty";
import { FormModuleValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Button } from "../../design-system/button/Button";
import ConfirmModale from "../../design-system/confirm-modale/ConfirmModale";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import FormModule from "./FormModule";

export default function ListeModule() {
  // Hook pour savoir l'état du formulaire module
  const { isOpenFormModule, toggleFormModule } = useContext(ShowFormContext);

  // Hook pour recupérer les données par son identifiant
  const { getListModuleById } = useContext(DataFetcherByIdContext);

  // Hook pour savoir si l'utilisateur à cliquer sur le boutton edit
  const { toggleEditModuleForm, isConfirmDialog, toggleConfirmDialog } =
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
  } = useDataFetcher<FormModuleValues[]>({
    endpoint: `http://localhost:3001/module/info`,
    processData: (data) => data.modules,
  });

  // Pour recharger les données dans le tableau quand on ferme le formulaire
  useEffect(() => {
    if (!isOpenFormModule) {
      refetch();
    }
  }, [isOpenFormModule, refetch]);

  const handleClicEdit = async (id: number | undefined) => {
    await getListModuleById(id);
    toggleEditModuleForm();
    toggleFormModule();
  };

  // Pour supprimer une module de la BD
  const deleteModule = (id: number | undefined) => {
    axios
      .delete(`http://localhost:3001/module/${id}`)
      .then((res) => {
        if (res.data.Message !== "Error") {
          toast.success("Le module a été supprimé définitivement");
          refetch();
        } else {
          axios
            .put(`http://localhost:3001/module/softdelete/${id}`)
            .then(() => {
              toast.success("Le module a été supprimé avec succès");
              refetch();
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refIdModule = useRef<number | undefined>();

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
      <div className="flex justify-end">
        <Button
          variant="secondary"
          icon={{ icon: RiAddCircleLine }}
          className="mb-2"
          action={toggleFormModule}
        >
          Ajouter une module
        </Button>
      </div>
      {data.length > 0 ? (
        <div className="h-[469px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-lg:w-[600px] max-sm:w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">Module</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: FormModuleValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2"> {value.nom_module}</td>
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

      <FormModule />

      {isConfirmDialog && (
        <ConfirmModale
          message="Vous êtes sur le point de supprimer ce module, voulez-vous continuer ?"
          action={() => {
            deleteModule(refIdModule.current);
            toggleConfirmDialog();
          }}
        />
      )}
    </div>
  );
}
