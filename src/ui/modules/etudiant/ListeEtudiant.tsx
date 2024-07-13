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
import TrieParNiveau from "../components/TrieParNiveau";
import TrieParParcours from "../components/TrieParParcours";
import { url_api } from "../../../utils/url-api";

interface EtudiantData {
  id: number;
  matricule: string;
  niveau: string;
  parcours: string;
  Personne: {
    id: number;
    nom: string;
    prenom: string;
    phone: string;
    email: string;
    photo?: string;
  };
}

export default function ListeEtudiant() {
  const { isEditEtudiantForm } = useContext(ToggleEditFormContext);
  const {
    search,
    selectedNiveau,
    selectedParcours,
    handleChangeSearch,
    handleChangeNiveau,
    handleChangeParcours,
  } = useSearch();

  let url = `${url_api}/etudiant/info/${selectedNiveau}/${selectedParcours}`;

  if (search !== "") {
    url = `${url_api}/etudiant/rechercher-etudiant/${selectedNiveau}/${selectedParcours}/${search}`;
  }

  const {
    isLoading,
    isError,
    data,
    currentPage,
    totalPage,
    setCurrentPage,
    refetch,
  } = useDataFetcher<EtudiantData[]>({
    endpoint: url,
    processData: (data) => data.etudiants,
  });

  useEffect(() => {
    if (!isEditEtudiantForm) {
      refetch();
    }
  }, [isEditEtudiantForm, refetch]);

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
      <Typography
        weight="bold"
        theme="gray"
        variant="h1"
        component="h1"
        className="mb-5 text-center"
      >
        La liste des etudiants à l' ENI
      </Typography>

      <div className="flex justify-center items-center gap-7 flex-wrap mb-6">
        <TrieParNiveau onChangeNiveau={handleChangeNiveau} />

        <span className="font-bold text-primary text-2xl max-[375px]:hidden">
          |
        </span>

        <TrieParParcours onChangeParcours={handleChangeParcours} />

        <span className="font-bold text-primary text-2xl max-[375px]:hidden">
          |
        </span>

        <SearchBar
          onChangeSearch={handleChangeSearch}
          placeholder="Recherche par nom ou matricule"
        />
      </div>

      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 max-[870px]:grid-cols-1">
          {data.map((value: EtudiantData) => {
            return (
              <ListInfoUser
                key={value.id}
                photo={value.Personne.photo}
                matricule={value.matricule}
                nom={value.Personne.nom}
                prenom={value.Personne.prenom}
                niveau={value.niveau}
                parcours={value.parcours}
                phone={value.Personne.phone}
                email={value.Personne.email}
                statut="etudiant"
                idEt={value.id}
                refetch={refetch}
              />
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
