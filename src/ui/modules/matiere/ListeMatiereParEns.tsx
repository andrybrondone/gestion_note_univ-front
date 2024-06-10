import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import useSearch from "../../../hook/useSearch";
import DataEmpty from "../../../pages/DataEmpty";
import { ListeMatiereValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import TrieParNiveau from "../components/TrieParNiveau";

export default function ListeMatiereParEns() {
  const { authState } = useContext(AuthContext);

  const { selectedNiveau, handleChangeNiveau } = useSearch();

  // Hoock pour la recupération des données et faire la pagination
  const { isLoading, isError, data, currentPage, totalPage, setCurrentPage } =
    useDataFetcher<ListeMatiereValues[]>({
      endpoint: `http://localhost:3001/matiere/byEns/${authState.id}/${selectedNiveau}`,
      processData: (data) => data.matieresParEns,
    });

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
      <Typography
        variant="body-lg"
        weight="bold"
        theme="gray"
        className="text-center mb-5"
      >
        Liste de toute les matières à votre charge durant l'année
      </Typography>

      <TrieParNiveau label="Niveau :" onChangeNiveau={handleChangeNiveau} />

      {data.length > 0 ? (
        <div className="h-[469px] mt-2 overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">Nom du matière</th>
                <th>Parcours</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: ListeMatiereValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2">{value.nom_mat}</td>
                    <td> {value.parcours.join(", ")}</td>
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
    </div>
  );
}
