import { RiDeleteBin2Fill, RiPencilFill } from "react-icons/ri";
import { Avatar } from "../../design-system/avatar/Avatar";
import { Typography } from "../../design-system/typography/Typography";

interface Props {
  photo: string | undefined;
  matricule?: string;
  grade?: string;
  nom: string;
  prenom: string;
  email: string;
  statut: "etudiant" | "enseignant" | "administrateur";
}

export default function ListInfoUser({
  photo,
  matricule,
  grade,
  nom,
  prenom,
  email,
  statut,
}: Props) {
  return (
    <div className="flex gap-5 mb-16">
      <Avatar
        src={`http://localhost:3001/images/${photo}`}
        alt=""
        size="very-large"
      />
      <div className="flex flex-col gap-2">
        {statut === "enseignant" && (
          <Typography
            variant="body-sm"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            Grade :
            <Typography
              variant="body-sm"
              component="p"
              className="font-semibold capitalize"
            >
              {grade}
            </Typography>
          </Typography>
        )}

        {statut === "etudiant" && (
          <Typography
            variant="body-sm"
            theme="gray"
            component="div"
            className="flex items-center gap-3"
          >
            N° matricule :
            <Typography
              variant="body-sm"
              component="p"
              className="font-semibold uppercase"
            >
              {matricule}
            </Typography>
          </Typography>
        )}

        <Typography
          variant="body-sm"
          theme="gray"
          component="div"
          className="flex items-center gap-3"
        >
          Nom :
          <Typography
            variant="body-lg"
            component="h5"
            className=" font-semibold uppercase"
          >
            {nom}
          </Typography>
        </Typography>

        <Typography
          variant="body-sm"
          theme="gray"
          component="div"
          className="flex items-center gap-3"
        >
          Prénom :
          <Typography
            variant="body-lg"
            component="h5"
            className=" capitalize font-semibold"
          >
            {prenom}
          </Typography>
        </Typography>

        <Typography
          variant="body-sm"
          theme="gray"
          component="div"
          className="flex items-center gap-3"
        >
          Adresse e-mail :
          <Typography
            variant="caption1"
            component="p"
            className="font-semibold"
          >
            {email}
          </Typography>
        </Typography>

        <div className=" flex items-center gap-3 mt-3">
          <div className="flex items-center justify-center gap-1 text-sm border text-alert-warning rounded py-2 px-3 cursor-pointer">
            <RiPencilFill />
            <Typography variant="caption1" component="p" theme="warning">
              Modifier
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm border text-alert-danger rounded py-2 px-3 cursor-pointer">
            <RiDeleteBin2Fill />
            <Typography variant="caption1" component="p" theme="danger">
              Supprimer
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
