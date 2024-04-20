import { useContext, useEffect } from "react";
import {
  RiAddCircleLine,
  RiDeleteBin2Fill,
  RiPencilFill,
} from "react-icons/ri";
import { ShowFormContext } from "../../../context/ShowFormContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import { FormModuleValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Button } from "../../design-system/button/Button";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import FormModule from "./FormModule";

export default function ListeModule() {
  const { isOpenFormModule, toggleFormModule } = useContext(ShowFormContext);
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

  useEffect(() => {
    if (!isOpenFormModule) {
      refetch();
    }
  }, [isOpenFormModule, refetch]);

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
                      <RiPencilFill className="text-alert-warning cursor-pointer" />
                      <RiDeleteBin2Fill className="text-alert-danger cursor-pointer" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>non</div>
      )}

      {data.length > 0 && (
        <ButtonPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
        />
      )}

      <FormModule />
    </div>
  );
}
