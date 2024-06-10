import { useContext } from "react";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import useSelecteImage from "../../../hook/useSelecteImage";
import { Container } from "../../components/container/Container";
import UploadAvatar from "../../components/upload-avatar/UploadAvatar";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import RowsTr from "../components/RowsTr";

export default function InfoCompteEns() {
  const { listPersonneEnsById } = useContext(DataFetcherByIdContext);
  const { selectedImage, imagePreview, handleImageSelect, handleUploadImage } =
    useSelecteImage();

  return (
    <>
      <Container>
        <Typography
          weight="bold"
          theme="gray"
          component="h1"
          variant="display"
          className="text-center mt-6"
        >
          Vos informations
        </Typography>
        <div className="flex justify-evenly items-center gap-5">
          <UploadAvatar
            photo={listPersonneEnsById.photo}
            handleImageSelect={handleImageSelect}
            imagePreview={imagePreview}
          />
          <Button
            disabled={selectedImage === null ? Boolean(true) : Boolean(false)}
            action={handleUploadImage}
          >
            Enregistrer la photo
          </Button>
        </div>
        <table className="flex items-center justify-center bg-gray-300 dark:bg-black rounded shadow-sm py-8 mt-3">
          {listPersonneEnsById.Enseignants?.map((value, i) => {
            return (
              <tbody key={i}>
                <RowsTr
                  title="Nom :"
                  value={listPersonneEnsById.nom.toUpperCase()}
                />
                <RowsTr title="Prénom :" value={listPersonneEnsById.prenom} />
                <RowsTr
                  title="Grade :"
                  value={value.grade}
                  classNameIcon="hidden"
                />
                <RowsTr
                  title="Numéro de téléphone :"
                  value={listPersonneEnsById.phone}
                />
                <RowsTr
                  title="Adresse e-mail :"
                  value={listPersonneEnsById.email}
                />
                <RowsTr
                  title="Date et lieu de naissance :"
                  value={`${listPersonneEnsById.date_nais} à ${listPersonneEnsById.lieu_nais}`}
                />
                <RowsTr title="Adresse :" value={listPersonneEnsById.adresse} />
              </tbody>
            );
          })}
        </table>
        <div className="mt-10 flex items-center justify-center gap-7 max-sm:gap-5 max-sm:flex-col">
          <Button
            variant="update"
            icon={{ icon: RiPencilLine }}
            iconPosition="left"
            className="max-sm:w-full"
          >
            Changer de mot de passe
          </Button>
          <Button
            variant="delete"
            icon={{ icon: RiDeleteBin2Line }}
            iconPosition="left"
            className="max-sm:w-full"
          >
            Supprimer votre compte
          </Button>
        </div>
      </Container>
    </>
  );
}
