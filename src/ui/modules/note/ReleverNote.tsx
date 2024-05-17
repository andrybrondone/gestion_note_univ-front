import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Typography } from "../../design-system/typography/Typography";

export default function ReleverNote() {
  const currentYear = new Date().getFullYear();
  const { authState } = useContext(AuthContext);
  const [note, setNote] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/note/releverNote/${authState.matricule}`)
      .then((res) => {
        setNote(res.data);
      });
  }, [authState.matricule]);

  console.log(note);

  return (
    <div className="flex flex-col gap-5 bg-white p-10">
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
          en deuxieme annee de la formation de licence professionnelle en
          informatique
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
              IG
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
            : Science de l'ingenieur
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
            : Science de l'ingenieur
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
            : Science de l'ingenieur
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
              <th></th>
              <th>Matières</th>
              <th>Notes /20</th>
              <th>Crédits</th>
              <th>Validation de l'UE</th>
            </tr>
            <tr>
              <th colSpan={5}>Semestre 3-4</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <th rowSpan={5}>kkk</th>
            </tr>
            <tr>
              <td className="text-start">Algebre</td>
              <td>8</td>
              <td rowSpan={4}>10</td>
              <td rowSpan={4}>Valide</td>
            </tr>
            <tr>
              <td className="text-start">Algebre</td>
              <td>8</td>
            </tr>
            <tr>
              <td className="text-start">Algebre</td>
              <td>8</td>
            </tr>
            <tr className="text-end">
              <th>Moyenne</th>
              <td className="text-center">8</td>
            </tr>
          </tbody>
          <tfoot className="text-center">
            <tr>
              <th rowSpan={3}></th>
            </tr>
            <tr>
              <th className="text-end">MOYENNE THEORIQUE</th>
              <td>10</td>
              <td>10</td>
              <td>ADMIS</td>
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
              <td>10</td>
              <th>TOTAL CREDITS</th>
              <td>60/60</td>
            </tr>
            <tr>
              <th colSpan={5}>
                OBDERVATION FINALE : <span className="font-medium">ADMIS</span>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <Typography variant="caption2" component="p" className="text-end">
          Fait à Fianarantsoa, le ...........................................
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
          Ce relevé de notes ne doît être remis en aucun cas à l'intéressé sous
          peine d'annulation.
        </Typography>

        <div className="flex items-center justify-between text-caption4 mt-1">
          <p>: 1487 Tanambao, Fianarantsoa(301)</p>
          <p>: +261 34 05 733 36 / +261 32 15 204 28</p>
          <p>: scolarite@eni.mg</p>
        </div>
      </div>
    </div>
  );
}
