import { useContext } from "react";
import { DataUserContext } from "../../../context/DataUserContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import DataEmpty from "../../../pages/DataEmpty";
import { ListeMatiereValues } from "../../../types/crud-props";
import { url_api } from "../../../utils/url-api";
import { Container } from "../../components/container/Container";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";

export default function ListeMatiereByNiveau() {
  const { dataUser } = useContext(DataUserContext);
  // Hoock pour la recupération des données et faire la pagination
  const { isLoading, isError, data, currentPage, totalPage, setCurrentPage } =
    useDataFetcher<ListeMatiereValues[]>({
      endpoint: `${url_api}/matiere/byNiveau/${dataUser.niveau}/${dataUser.parcours}`,
      processData: (data) => data.matieresParNiveau,
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
        Liste de toute vos matières durant l'année
      </Typography>
      {data.length > 0 ? (
        <div className="h-[469px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">Module</th>
                <th>Matière</th>
                <th>Crédit</th>
                <th>Enseignant</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: ListeMatiereValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2">{value.Module.nom_module}</td>
                    <td> {value.nom_mat}</td>
                    <td>{value.credit}</td>
                    <td>{`${value.Enseignant.Personne.nom} ${value.Enseignant.Personne.prenom}`}</td>
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
