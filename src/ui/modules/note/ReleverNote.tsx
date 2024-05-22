import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { Container } from "../../components/container/Container";
import { Typography } from "../../design-system/typography/Typography";

interface ReleverNoteProps {
  id: number;
  nom_module: string;
  Matieres: [
    {
      id: number;
      nom_mat: string;
      credit: number;
      niveau_mat: string;
      Notes: [
        {
          note: number;
        }
      ];
    }
  ];
  moyenne: number;
  totalCreditsObt: number;
  totalCredits: number;
  validationUE: boolean;
}

export default function ReleverNote() {
  const currentYear = new Date().getFullYear();
  const [modules, setModules] = useState<ReleverNoteProps[]>([]);

  const { listEtudiantById } = useContext(DataFetcherByIdContext);
  console.log("et", listEtudiantById);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/note/releverNote/${listEtudiantById.matricule}/${listEtudiantById.niveau}`
      )
      .then((res) => {
        setModules(res.data.modules);
      });
  }, [listEtudiantById.matricule, listEtudiantById.niveau]);

  console.log("not", modules);

  const totaleMoyenneObtenue = modules.reduce(
    (acc, module) => acc + module.moyenne,
    0
  );
  const totaleCreditsObtenu = modules.reduce(
    (acc, module) => acc + module.totalCreditsObt,
    0
  );
  const totaleCredits = modules.reduce(
    (acc, module) => acc + module.totalCredits,
    0
  );
  const moyenneTheorique = totaleMoyenneObtenue / modules.length;

  const allCreditsAdmis = totaleCreditsObtenu === totaleCredits;
  const autorisation = allCreditsAdmis
    ? "ADMIS"
    : moyenneTheorique >= 7
    ? "Autorisé à passer au niveau supérieur"
    : "Autorisé à redoubler";

  const observationFinale =
    allCreditsAdmis || moyenneTheorique >= 7 ? "ADMIS" : "NON ADMIS";

  return (
    <Container className="flex justify-center">
      <div className="flex flex-col gap-5 bg-white p-10 w-[950px]">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="/assets/images/univ.jpg"
              alt="Logo de l'université de Fianarantsoa"
              width={80}
            />
          </div>
          <div>
            <Typography
              variant="lead"
              component="h1"
              className=" uppercase text-center"
            >
              universite de fianarantsoa <br />
              ********************* <br />
              ecole nationale d'informatique
            </Typography>
          </div>
          <div>
            <img
              src="/assets/images/logoENI.png"
              alt="Logo de l'ENI"
              width={80}
            />
          </div>
        </div>
        <div>
          <Typography
            weight="bold"
            variant="h5"
            component="h3"
            className="underline my-2 text-center"
          >
            RELEVE DE NOTES
          </Typography>

          <p className=" text-caption4 text-end">
            N° . . . . . /{currentYear}/UF/ENI/SCO.RN
          </p>

          <Typography
            variant="caption1"
            component="p"
            className="uppercase mt-2 text-center"
          >
            en
            {(listEtudiantById.niveau === "L1" ||
            listEtudiantById.niveau === "M1"
              ? " premiere "
              : "") ||
              (listEtudiantById.niveau === "L2" ||
              listEtudiantById.niveau === "M2"
                ? " deuxieme "
                : "") ||
              (listEtudiantById.niveau === "L3" && " troisieme ")}
            annee de la formation de
            {(listEtudiantById.niveau === "L1" ||
            listEtudiantById.niveau === "L2" ||
            listEtudiantById.niveau === "L3"
              ? " licence professionnelle "
              : "") ||
              (listEtudiantById.niveau === "M1" ||
              listEtudiantById.niveau === "M2"
                ? " master professionnelle "
                : "")}
            en informatique
          </Typography>
          <div className="flex justify-between items-center mt-4">
            <Typography variant="caption1" component="p" weight="bold">
              Domaine :{" "}
              <Typography variant="caption1" component="span">
                Science de l'ingenieur
              </Typography>
            </Typography>
            <Typography variant="caption1" component="p" weight="bold">
              Parcours :{" "}
              <Typography variant="caption1" component="span">
                {listEtudiantById.parcours}
              </Typography>
            </Typography>
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <Typography variant="caption1" component="p">
              <Typography
                variant="caption1"
                component="span"
                weight="bold"
                className="underline"
              >
                Nom et prénom
              </Typography>{" "}
              :{" "}
              {`${listEtudiantById.Personne.nom.toUpperCase()} ${
                listEtudiantById.Personne.prenom
              }`}
            </Typography>
            <Typography variant="caption1" component="p">
              <Typography
                variant="caption1"
                component="span"
                weight="bold"
                className="underline"
              >
                Date et lieu de naissance
              </Typography>{" "}
              : {listEtudiantById.Personne.date_nais}
            </Typography>
            <Typography variant="caption1" component="p">
              <Typography
                variant="caption1"
                component="span"
                weight="bold"
                className="underline"
              >
                Numéro d'inscription
              </Typography>{" "}
              : {listEtudiantById.matricule}
            </Typography>
          </div>
        </div>
        <div className="tableau">
          <p className=" text-caption4 text-end pb-2">
            Année Universitaire 2022/2023
          </p>
          <table className="w-full">
            <thead>
              <tr>
                <th>UE</th>
                <th>Matières</th>
                <th>Notes /20</th>
                <th>Crédits</th>
                <th>Validation de l'UE</th>
              </tr>
              <tr>
                <th colSpan={5}>Semestre 3-4</th>
              </tr>
            </thead>

            {modules.map((module) => (
              <tbody className="text-center" key={module.id}>
                {module.Matieres.map((matiere, index) => (
                  <tr key={matiere.id}>
                    {index === 0 && (
                      <th rowSpan={module.Matieres.length + 1}>
                        {module.nom_module}
                      </th>
                    )}
                    <td className="text-start">{matiere.nom_mat}</td>
                    <td>
                      {matiere.Notes.length > 0 ? matiere.Notes[0].note : "-"}
                    </td>
                    {/* <td>{matiere.credit}</td> */}
                    {index === 0 && (
                      <>
                        <td rowSpan={module.Matieres.length + 1}>
                          {module.totalCreditsObt}/{module.totalCredits}
                        </td>
                        <td rowSpan={module.Matieres.length + 1}>
                          {module.validationUE ? "Valide" : "Non valide"}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className="text-end font-bold">
                  <th>Moyenne</th>
                  <td className="text-center">
                    {module.moyenne.toFixed(2)}/20
                  </td>
                </tr>
              </tbody>
            ))}

            <tfoot className="text-center">
              <tr>
                <th rowSpan={3}></th>
              </tr>
              <tr>
                <th className="text-end">MOYENNE THEORIQUE</th>
                <td>{moyenneTheorique.toFixed(2)}/20</td>
                <td>
                  {totaleCreditsObtenu}/{totaleCredits}
                </td>
                <td>{autorisation}</td>
              </tr>
              <tr>
                <th className="text-end">MOYENNE PRATIQUE</th>
                <td>10</td>
                <td>10</td>
                <td>VALIDE</td>
              </tr>
              <tr>
                <td></td>
                <th className="text-end">MOYENNE GENERALE</th>
                <td>12</td>
                <th>TOTAL CREDITS</th>
                <td>60/60</td>
              </tr>
              <tr>
                <th colSpan={5}>
                  OBSERVATION FINALE :{" "}
                  <span className="font-medium">{autorisation}</span>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <Typography variant="caption2" component="p" className="text-end">
            Fait à Fianarantsoa, le . . . . . . . . . . . . . . . . . . . . . .
          </Typography>

          <Typography
            variant="caption2"
            component="p"
            className="mt-24"
            weight="bold"
          >
            <Typography
              weight="bold"
              variant="caption3"
              component="span"
              className="underline"
            >
              Note important :
            </Typography>{" "}
            Ce relevé de notes ne doît être remis en aucun cas à l'intéressé
            sous peine d'annulation.
          </Typography>

          <div className="flex items-center justify-between text-caption4 mt-1">
            <p>: 1487 Tanambao, Fianarantsoa(301)</p>
            <p>: +261 34 05 733 36 / +261 32 15 204 28</p>
            <p>: scolarite@eni.mg</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
