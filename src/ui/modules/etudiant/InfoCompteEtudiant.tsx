import { useContext } from "react";
import { RiPencilFill } from "react-icons/ri";
import { AuthContext } from "../../../context/AuthContext";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { Container } from "../../components/container/Container";

export default function InfoCompteEtudiant() {
  const { listEtudiantById } = useContext(DataFetcherByIdContext);
  const { authState } = useContext(AuthContext);
  console.log(listEtudiantById);

  return (
    <>
      <Container>
        <table>
          <tbody>
            <tr>
              <th>Numéro matricule</th>
              <td>{listEtudiantById.matricule}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Nom</th>
              <td>{authState.nom}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Prénom</th>
              <td>{listEtudiantById.Personne.prenom}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Numéro de téléphone</th>
              <td>{listEtudiantById.Personne.phone}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Adresse e-mail</th>
              <td>{listEtudiantById.Personne.email}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Date et lieu de naissance</th>
              <td>{`${listEtudiantById.Personne.date_nais} à ${listEtudiantById.Personne.lieu_nais}`}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Adresse</th>
              <td>{listEtudiantById.Personne.adresse}</td>
              <td>
                <RiPencilFill className="text-alert-warning cursor-pointer" />
              </td>
            </tr>
            <tr>
              <th>Niveau</th>
              <td>{listEtudiantById.niveau}</td>
            </tr>
            <tr>
              <th>Parcours</th>
              <td>{listEtudiantById.parcours}</td>
            </tr>
            <tr>
              <th>Statut</th>
              <td>{listEtudiantById.statut}</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
