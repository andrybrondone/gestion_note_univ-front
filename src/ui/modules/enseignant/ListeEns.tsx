import { useContext, useEffect } from "react";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { useDataFetcher } from "../../../hook/useDataFetcher";
import useSearch from "../../../hook/useSearch";
import DataEmpty from "../../../pages/DataEmpty";
import { Container } from "../../components/container/Container";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import ListInfoUser from "../components/ListInfoUser";
import SearchBar from "../components/SearchBar";

interface EnseignantData {
  id: number;
  grade: string;
  Personne: {
    id: number;
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    photo?: string;
  };
}

export default function ListeEns() {
  const { isEditEnseignantForm } = useContext(ToggleEditFormContext);
  const { search, handleChangeSearch } = useSearch();

  let url = `http://localhost:3001/enseignant/info`;

  if (search !== "") {
    url = `http://localhost:3001/enseignant/rechercher-ens/${search}`;
  }

  const {
    isLoading,
    isError,
    data,
    currentPage,
    totalPage,
    setCurrentPage,
    refetch,
  } = useDataFetcher<EnseignantData[]>({
    endpoint: url,
    processData: (data) => data.enseignants,
  });

  useEffect(() => {
    if (!isEditEnseignantForm) {
      refetch();
    }
  }, [isEditEnseignantForm, refetch]);

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
    <Container className="pt-8">
      <div className="flex justify-between gap-5 items-center max-md:flex-wrap max-md:justify-center mb-8">
        <Typography
          weight="bold"
          theme="gray"
          variant="h1"
          component="h1"
          className="max-md:text-center"
        >
          La liste des enseignants à l' ENI
        </Typography>
        <SearchBar
          placeholder="Recherche par nom..."
          onChangeSearch={handleChangeSearch}
        />
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 max-[870px]:grid-cols-1">
          {data.map((value: EnseignantData) => {
            return (
              <div key={value.id}>
                <ListInfoUser
                  photo={value.Personne.photo}
                  grade={value.grade}
                  nom={value.Personne.nom}
                  prenom={value.Personne.prenom}
                  email={value.Personne.email}
                  phone={value.Personne.phone}
                  statut="enseignant"
                  idEns={value.id}
                  refetch={refetch}
                />
              </div>
            );
          })}
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
    </Container>
  );
}
