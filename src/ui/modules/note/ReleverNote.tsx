import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useContext, useEffect, useRef, useState } from "react";
import { RiPrinterFill, RiRefreshLine, RiUploadFill } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import useSearch from "../../../hook/useSearch";
import DataEmpty from "../../../pages/DataEmpty";
import { Container } from "../../components/container/Container";
import ActiveLink from "../../components/navigation/ActiveLink";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import TrieParNiveau from "../components/TrieParNiveau";

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
  const { selectedNiveau, handleChangeNiveau } = useSearch();
  const [modules, setModules] = useState<ReleverNoteProps[]>([]);
  const [moyennePratique, setMoyennePratique] = useState();
  const { listEtudiantById, getListEtudiantById } = useContext(
    DataFetcherByIdContext
  );
  const pdfRef = useRef<HTMLDivElement>(null);

  let semestre = "";
  let label1 = "";
  let label2 = "";
  switch (selectedNiveau) {
    case "L1":
      semestre = "Semestre 1-2";
      label1 = " première ";
      label2 = " licence professionnelle ";
      break;
    case "L2":
      semestre = "Semestre 3-4";
      label1 = " deuxième ";
      label2 = " licence professionnelle ";
      break;
    case "L3":
      semestre = "Semestre 5-6";
      label1 = " troisième ";
      label2 = " licence professionnelle ";
      break;
    case "M1":
      semestre = "Semestre 7-8";
      label1 = " première ";
      label2 = " master professionnelle ";
      break;
    case "M2":
      semestre = "Semestre 9-10";
      label1 = " deuxième ";
      label2 = " master professionnelle ";
      break;
    default:
      break;
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/note/releverNote/${listEtudiantById.matricule}/${selectedNiveau}`
      )
      .then((res) => {
        setModules(res.data.modules);
      });
  }, [listEtudiantById.matricule, selectedNiveau]);

  useEffect(() => {
    if (listEtudiantById.moyenne_pratique === null) {
      axios
        .get(
          `http://localhost:3001/historique-niveau/byEtudiantId/${listEtudiantById.id}`
        )
        .then((res) => {
          if (res.data !== null) {
            setMoyennePratique(res.data.moyenne_pratique);
          }
        });
    }
  }, [listEtudiantById.id, listEtudiantById.moyenne_pratique]);

  const generatePdf = async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("releve-de-notes.pdf");
    }
  };

  const hasEmptyNotes = () => {
    return modules.some((module) =>
      module.Matieres.some((matiere) => matiere.Notes.length !== 1)
    );
  };

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

  let moyenneGeneral = null;
  let creditsGeneralObtenu = null;
  if (listEtudiantById.moyenne_pratique !== null) {
    moyenneGeneral =
      (moyenneTheorique + Number(listEtudiantById.moyenne_pratique)) / 2;

    creditsGeneralObtenu = totaleCreditsObtenu + 5;
  } else {
    moyenneGeneral = (moyenneTheorique + Number(moyennePratique)) / 2;

    if (moyennePratique !== undefined) {
      creditsGeneralObtenu = totaleCreditsObtenu + 5;
    }
  }

  let observationFinale = "";
  if (moyenneGeneral !== null) {
    observationFinale =
      moyenneGeneral >= 10 && creditsGeneralObtenu === totaleCredits + 5
        ? "ADMIS"
        : moyenneGeneral >= 7
        ? "Autorisé à passer au niveau supérieur"
        : "Autorisé à redoubler";
  }

  const promouvoir = () => {
    if (!hasEmptyNotes()) {
      axios
        .post(
          `http://localhost:3001/etudiant/promouvoir/${listEtudiantById.id}`
        )
        .then(async () => {
          sendEmail();
          await getListEtudiantById(listEtudiantById.id);
          toast.success("L'étudiant a bien été promu(e) au niveau supérieur.");
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            toast.message("Verifier votre connexion internet !");
          } else {
            console.error("Error : ", error);
          }
        });
    }
  };

  const redoubler = () => {
    if (!hasEmptyNotes()) {
      axios
        .put(
          `http://localhost:3001/etudiant/redoubler/${listEtudiantById.id}/Redoublant`
        )
        .then(async () => {
          sendEmail();
          await getListEtudiantById(listEtudiantById.id);
          toast.success("L'étudiant a bien été redoublé");
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            toast.message("Verifier votre connexion internet !");
          } else {
            console.error("Error : ", error);
          }
        });
    }
  };
  console.log(listEtudiantById.id);

  let nouveauNiveau;
  switch (listEtudiantById.niveau) {
    case "L1":
      nouveauNiveau = "deuxième année de licence professionnelle (L2)";
      break;
    case "L2":
      nouveauNiveau = "troisième année de licence professionnelle (L3)";
      break;
    case "L3":
      nouveauNiveau = "premère année de master professionnelle (M1)";
      break;
    case "M1":
      nouveauNiveau = "deuxième année de master professionnelle (M2)";
      break;
    // Ajouter d'autres niveaux si nécessaire
    default:
      throw new Error("Niveau actuel inconnu");
  }

  const sendEmail = () => {
    if (observationFinale === "Autorisé à redoubler") {
      axios
        .get(
          `http://localhost:3001/send-email/redoubler/${listEtudiantById.Personne.email}/${listEtudiantById.Personne.nom}/${listEtudiantById.niveau}`
        )
        .then(() => {
          toast.message("Un e-mail a été envoyé vers l'étudiant.");
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 500") {
            toast.message(
              "Erreur lors de l'envoi de l'e-mail. Veuillez vérifier votre connexion Internet."
            );
          } else {
            console.error("Error : ", error);
          }
        });
    } else {
      axios
        .get(
          `http://localhost:3001/send-email/promouvoir/${listEtudiantById.Personne.email}/${listEtudiantById.Personne.nom}/${nouveauNiveau}`
        )
        .then(() => {
          toast.message("Un e-mail a été envoyé vers l'étudiant.");
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 500") {
            toast.message(
              "Erreur lors de l'envoi de l'e-mail. Veuillez vérifier votre connexion Internet."
            );
          } else {
            console.error("Error : ", error);
          }
        });
    }
  };

  return (
    <>
      <Container className="flex items-center justify-between gap-4 p-5 relative z-50 bg-white/95 rounded">
        <TrieParNiveau label="Niveau :" onChangeNiveau={handleChangeNiveau} />
        <div className="flex items-center gap-4">
          {observationFinale === "Autorisé à redoubler" ? (
            <Button
              disabled={
                modules.length === 0 ||
                hasEmptyNotes() ||
                listEtudiantById.moyenne_pratique === null ||
                listEtudiantById.niveau !== selectedNiveau ||
                listEtudiantById.statut === "Redoublant"
              }
              variant="secondary"
              action={redoubler}
              icon={{ icon: RiRefreshLine }}
            >
              Faire redoubler
            </Button>
          ) : (
            <Button
              disabled={
                modules.length === 0 ||
                hasEmptyNotes() ||
                listEtudiantById.moyenne_pratique === null
              }
              variant="secondary"
              action={promouvoir}
              icon={{ icon: RiUploadFill }}
            >
              Promouvoir
            </Button>
          )}
          <Button
            disabled={modules.length === 0 || hasEmptyNotes()}
            action={generatePdf}
            icon={{ icon: RiPrinterFill }}
          >
            Générer en PDF
          </Button>
        </div>
      </Container>

      {modules.length > 0 ? (
        <>
          {(hasEmptyNotes() ||
            (listEtudiantById.moyenne_pratique === null &&
              moyennePratique === undefined)) && (
            <>
              <div className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed z-20"></div>
              <Typography
                variant="body-lg"
                component="h5"
                className="z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white/95 shadow-lg rounded p-5"
              >
                Le relever de note est indisponnible pour le moment car cette
                étudiant n'a pas encore de note dans certaine matière ! <br />
                <br />
                <ActiveLink
                  href="/etudiants"
                  className=" text-secondary font-bold"
                >
                  Retour ?
                </ActiveLink>
              </Typography>
            </>
          )}
          <Container className="flex justify-center">
            <div className="pt-3">
              <div
                className="flex flex-col gap-5 bg-white p-5 w-[950px]"
                ref={pdfRef}
              >
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
                      className="uppercase text-center"
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

                  <p className="text-caption4 text-end">
                    N° . . . . . /{currentYear}/UF/ENI/SCO.RN
                  </p>

                  <Typography
                    variant="caption1"
                    component="p"
                    className="uppercase mt-2 text-center"
                  >
                    en
                    {label1}
                    année de la formation de
                    {label2}
                    en informatique
                  </Typography>
                  <div className="flex justify-between items-center mt-4">
                    <Typography variant="caption1" component="p" weight="bold">
                      Domaine :{" "}
                      <Typography variant="caption1" component="span">
                        Science de l'ingénieur
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
                  <p className="text-caption4 text-end pb-2">
                    Année Universitaire 2022/2023
                  </p>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className=" w-52">UE</th>
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
                              {matiere.Notes.length > 0
                                ? matiere.Notes[0].note
                                : "-"}
                            </td>
                            {/* <td>{matiere.credit}</td> */}
                            {index === 0 && (
                              <>
                                <td rowSpan={module.Matieres.length + 1}>
                                  {module.totalCreditsObt}/{module.totalCredits}
                                </td>
                                <td rowSpan={module.Matieres.length + 1}>
                                  {module.validationUE
                                    ? "Valide"
                                    : "Non valide"}
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
                        <td>
                          {selectedNiveau === listEtudiantById.niveau
                            ? listEtudiantById.moyenne_pratique
                            : moyennePratique}
                        </td>
                        <td>
                          {listEtudiantById.moyenne_pratique !== null ||
                          moyennePratique !== undefined
                            ? "5"
                            : ""}
                          /5
                        </td>
                        <td>VALIDE</td>
                      </tr>
                      <tr>
                        <td></td>
                        <th className="text-end">MOYENNE GENERALE</th>
                        <td>
                          {moyenneGeneral !== null
                            ? moyenneGeneral.toFixed(2)
                            : "-"}
                        </td>
                        <th>TOTAL CREDITS</th>
                        <td>
                          {creditsGeneralObtenu}/{totaleCredits + 5}
                        </td>
                      </tr>
                      <tr>
                        <th colSpan={5}>
                          OBSERVATION FINALE :{" "}
                          <span className="font-medium">
                            {observationFinale}
                          </span>
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div>
                  <Typography
                    variant="caption2"
                    component="p"
                    className="text-end"
                  >
                    Fait à Fianarantsoa, le . . . . . . . . . . . . . . . . . .
                    . . . .
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
                    Ce relevé de notes ne doit être remis en aucun cas à
                    l'intéressé sous peine d'annulation.
                  </Typography>

                  <div className="flex items-center justify-between text-caption4 mt-1">
                    <p>: 1487 Tanambao, Fianarantsoa(301)</p>
                    <p>: +261 34 05 733 36 / +261 32 15 204 28</p>
                    <p>: scolarite@eni.mg</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : (
        <div className="mt-10">
          <DataEmpty />
        </div>
      )}
    </>
  );
};
