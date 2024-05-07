import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import { ListeNoteValues } from "../../../types/crud-props";
import { Container } from "../../components/container/Container";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";

export default function ListeNoteByEtudiant() {
  const { authState } = useContext(AuthContext);
  // Hoock pour la recupération des données et faire la pagination
  const { isLoading, isError, data, currentPage, totalPage, setCurrentPage } =
    useDataFetcher<ListeNoteValues[]>({
      endpoint: `http://localhost:3001/note/byEtudiant/${authState.matricule}`,
      processData: (data) => data.noteParEtudiant,
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
        Liste de toute vos note qui sont disponnibles
      </Typography>

      {data.length > 0 ? (
        <div className="h-[469px] overflow-y-auto scroll border border-gray-400 rounded dark:text-white dark:border-gray-800/50">
          <table className="w-full max-sm:text-caption4">
            <thead>
              <tr className=" bg-gray/70 dark:bg-black text-white text-caption1 max-sm:text-caption4">
                <th className="py-4">Matières</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody className="text-center capitalize">
              {data.map((value: ListeNoteValues) => {
                return (
                  <tr
                    key={value.id}
                    className="border-y-[1px] border-y-gray-500 dark:border-y-gray-700 even:bg-gray-500/20 dark:even:bg-gray-500/5"
                  >
                    <td className="py-2">{value.Matiere.nom_mat}</td>
                    <td>{value.note}</td>
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
    </div>
  );
}
