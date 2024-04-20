import { useDataFetcher } from "../../../hook/useDataFetcher";
import { Container } from "../../components/container/Container";
import { Spinner } from "../../design-system/spinner/Spinner";
import { Typography } from "../../design-system/typography/Typography";
import { ButtonPagination } from "../components/ButtonPagination";
import ListInfoUser from "../components/ListInfoUser";

interface EtudiantData {
  id: number;
  matricule: string;
  Personne: {
    nom: string;
    prenom: string;
    email: string;
    photo?: string;
  };
}

export default function ListeEtudiant() {
  const { isLoading, isError, data, currentPage, totalPage, setCurrentPage } =
    useDataFetcher<EtudiantData[]>({
      endpoint: `http://localhost:3001/etudiant/info`,
      processData: (data) => data.etudiants,
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
    <Container className="pt-8">
      <Typography variant="h1" component="h1" className="mb-14 text-center">
        La liste des etudiants à l' ENI
      </Typography>

      <div className="grid grid-cols-2">
        {data.length > 0 ? (
          data.map((value: EtudiantData) => {
            return (
              <ListInfoUser
                key={value.id}
                photo={value.Personne.photo}
                matricule={value.matricule}
                nom={value.Personne.nom}
                prenom={value.Personne.prenom}
                email={value.Personne.email}
                statut="etudiant"
              />
            );
          })
        ) : (
          <div>non</div>
        )}
      </div>

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
