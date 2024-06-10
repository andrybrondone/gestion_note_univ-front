import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import DataEmpty from "../../../pages/DataEmpty";
import { Container } from "../../components/container/Container";
import { Typography } from "../../design-system/typography/Typography";
import ReleverNotePDF from "./ReleverNotePDF";

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

export const ReleverNote = () => {
  const currentYear = new Date().getFullYear();
  const [modules, setModules] = useState<ReleverNoteProps[]>([]);

  const { listEtudiantById } = useContext(DataFetcherByIdContext);

  let semestre = "";
  switch (listEtudiantById.niveau) {
    case "L1":
      semestre = "Semestre 1-2";
      break;
    case "L2":
      semestre = "Semestre 3-4";
      break;
    case "L3":
      semestre = "Semestre 5-6";
      break;
    case "M1":
      semestre = "Semestre 7-8";
      break;
    case "M2":
      semestre = "Semestre 9-10";
      break;
    default:
      break;
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/note/releverNote/${listEtudiantById.matricule}/${listEtudiantById.niveau}`
      )
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [listEtudiantById]);

  let moyenneGeneral = 0;
  let creditsGeneralObtenu = 0;
  let observationFinale = "";
  let autorisation = "";

  const totalModules = modules.length;

  const moyenneTheorique =
    modules.reduce((acc, module) => acc + module.moyenne, 0) / totalModules;

  const totaleCredits = modules.reduce(
    (acc, module) => acc + module.totalCredits,
    0
  );

  const totaleCreditsObtenu = modules.reduce(
    (acc, module) => acc + module.totalCreditsObt,
    0
  );

  moyenneGeneral = (moyenneTheorique + listEtudiantById.moyenne_pratique) / 2;

  if (totaleCreditsObtenu >= totaleCredits) {
    autorisation = "Passage en " + listEtudiantById.niveau_suivant;
    observationFinale = "Admis";
  } else {
    autorisation = "Redouble " + listEtudiantById.niveau;
    observationFinale = "Non admis";
  }

  return (
    <div>
      {modules.length > 0 ? (
        <Container>
          <div className="text-center mt-5">
            <Typography
              variant="title"
              weight="bold"
              className="underline"
              component="h1"
            >
              RELEVE DE NOTES
            </Typography>
            <Typography
              variant="subTitle"
              component="p"
              className="text-center"
            >
              N° . . . . . /{currentYear}/UF/ENI/SCO.RN
            </Typography>
          </div>

          <div className="mt-10">
            <Typography
              variant="body"
              component="p"
              className="my-3"
              weight="bold"
            >
              Nom et prénom :{" "}
              <span className="ml-2 font-medium">
                {`${listEtudiantById.Personne.nom.toUpperCase()} ${
                  listEtudiantById.Personne.prenom
                }`}
              </span>
            </Typography>

            <Typography variant="body" component="p" className="my-3">
              Date et lieu de naissance :{" "}
              <span className="ml-2 font-medium">
                {listEtudiantById.Personne.date_nais}
              </span>
            </Typography>
            <Typography variant="body" component="p" className="my-3">
              Numéro d'inscription :{" "}
              <span className="ml-2 font-medium">
                {listEtudiantById.matricule}
              </span>
            </Typography>
          </div>

          <div className="my-10">
            <Typography
              variant="body"
              component="p"
              className="my-3"
              weight="bold"
            >
              Domaine :{" "}
              <span className="ml-2 font-medium">Science de l'ingénieur</span>
            </Typography>
            <Typography variant="body" component="p" className="my-3">
              Parcours :{" "}
              <span className="ml-2 font-medium">
                {listEtudiantById.parcours}
              </span>
            </Typography>
          </div>
          <div className="my-10 text-center">
            <Typography
              variant="subTitle"
              component="p"
              className="my-3"
              weight="bold"
            >
              Année Universitaire 2022/2023
            </Typography>
          </div>
          <div className="mt-5">
            <table className="table-auto w-full border border-full">
              <thead>
                <tr>
                  <th>UE</th>
                  <th>Matières</th>
                  <th>Notes /20</th>
                  <th>Crédits</th>
                  <th>Validation de l'UE</th>
                </tr>
                <tr>
                  <th colSpan={5}>{semestre}</th>
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
                  <td>{moyenneTheorique.toFixed(2)}</td>
                  <td>
                    {totaleCreditsObtenu}/{totaleCredits}
                  </td>
                  <td>{autorisation}</td>
                </tr>
                <tr>
                  <th className="text-end">MOYENNE PRATIQUE</th>
                  <td>{listEtudiantById.moyenne_pratique}</td>
                  <td>5/5</td>
                  <td>VALIDE</td>
                </tr>
                <tr>
                  <td></td>
                  <th className="text-end">MOYENNE GENERALE</th>
                  <td>
                    {moyenneGeneral !== null ? moyenneGeneral.toFixed(2) : "_"}
                  </td>
                  <th>TOTAL CREDITS</th>
                  <td>{creditsGeneralObtenu}/60</td>
                </tr>
                <tr>
                  <th colSpan={5}>
                    OBSERVATION FINALE :{" "}
                    <span className="font-medium">{observationFinale}</span>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div>
            <Typography variant="caption2" component="p" className="text-end">
              Fait à Fianarantsoa, le . . . . . . . . . . . . . . . . . . . . .
              .
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
              Ce relevé de notes ne doit être remis en aucun cas à l'intéressé
              sous peine d'annulation.
            </Typography>

            <div className="flex items-center justify-between text-caption4 mt-1">
              <p>: 1487 Tanambao, Fianarantsoa(301)</p>
              <p>: +261 34 05 733 36 / +261 32 15 204 28</p>
              <p>: scolarite@eni.mg</p>
            </div>
          </div>
          <PDFDownloadLink
            document={
              <ReleverNotePDF
                data={listEtudiantById}
                modules={modules}
                semestre={semestre}
                currentYear={currentYear}
                moyenneTheorique={moyenneTheorique}
                totaleCreditsObtenu={totaleCreditsObtenu}
                totaleCredits={totaleCredits}
                autorisation={autorisation}
                moyenneGeneral={moyenneGeneral}
                creditsGeneralObtenu={creditsGeneralObtenu}
                observationFinale={observationFinale}
              />
            }
            fileName="releve-de-notes.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Generate PDF"
            }
          </PDFDownloadLink>
        </Container>
      ) : (
        <div className="mt-10">
          <DataEmpty />
        </div>
      )}
    </div>
  );
};
