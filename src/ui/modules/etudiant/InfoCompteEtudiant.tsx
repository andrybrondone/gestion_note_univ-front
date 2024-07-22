import axios from "axios";
import { useContext, useState } from "react";
import { RiDeleteBin2Line, RiSave2Line } from "react-icons/ri";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../../../context/DataFetcherByIdContext";
import { ToggleStateContext } from "../../../context/ToggleStateContext";
import useSelecteImage from "../../../hook/useSelecteImage";
import { url_api } from "../../../utils/url-api";
import { Container } from "../../components/container/Container";
import UploadAvatar from "../../components/upload-avatar/UploadAvatar";
import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";
import RowsTr from "../components/RowsTr";

export default function InfoCompteEtudiant() {
  const { listPersonneEtById, getListPersonneEtById } = useContext(
    DataFetcherByIdContext
  );
  const {
    imagePreview,
    handleImageSelect,
    handleUploadImage,
    isdisabled,
    loading,
  } = useSelecteImage();

  const { toggleState } = useContext(ToggleStateContext);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const deletePhoto = () => {
    if (listPersonneEtById.photo !== "default_photo.jpg") {
      setLoadingDelete(true);

      axios
        .put(`${url_api}/personne/delete-photo/${listPersonneEtById.id}`)
        .then(async (res) => {
          if (res.data.Status === "empty") {
            toast.info(res.data.message);
          } else {
            toggleState();
            await getListPersonneEtById(listPersonneEtById.id);
            toast.success("Votre photo à été supprimer avec succès");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoadingDelete(false));
    } else {
      toast.info("Aucune photo à supprimer");
    }
  };

  return (
    <>
      <Container>
        <Typography
          weight="bold"
          theme="gray"
          component="h1"
          variant="display"
          className="text-center mt-6 max-sm:text-6xl max-sm:font-bold text-gray-600"
        >
          Vos informations
        </Typography>
        <div className="flex justify-evenly items-center gap-5">
          <UploadAvatar
            photo={listPersonneEtById.photo}
            handleImageSelect={handleImageSelect}
            imagePreview={imagePreview}
          />
          <div className="flex flex-col gap-3">
            <Button
              icon={{ icon: RiSave2Line }}
              disabled={isdisabled}
              variant="secondary"
              isLoading={loading}
              action={handleUploadImage}
            >
              Enregistrer la photo
            </Button>
            <Button
              icon={{ icon: RiDeleteBin2Line }}
              variant="delete"
              disabled={loadingDelete}
              action={deletePhoto}
            >
              Supprimer la photo
            </Button>
          </div>
        </div>
        <table className="flex items-center justify-center bg-gray-300 dark:bg-black rounded shadow-sm py-8 mt-3">
          {listPersonneEtById.Etudiants?.map((value) => {
            return (
              <tbody key={value.matricule}>
                <RowsTr
                  title="Numéro matricule :"
                  value={value.matricule}
                  classNameIcon="hidden"
                />
                <RowsTr title="Nom :" value={listPersonneEtById.nom} />
                <RowsTr title="Prénom :" value={listPersonneEtById.prenom} />
                <RowsTr
                  title="Niveau :"
                  value={value.niveau}
                  classNameIcon="hidden"
                />
                <RowsTr
                  title="Parcours :"
                  value={value.parcours}
                  classNameIcon="hidden"
                />
                <RowsTr
                  title="Numéro de téléphone :"
                  value={listPersonneEtById.phone}
                />
                <RowsTr
                  title="Adresse e-mail :"
                  value={listPersonneEtById.email}
                />
                <RowsTr
                  title="Date et lieu de naissance :"
                  value={`${listPersonneEtById.date_nais} à ${listPersonneEtById.lieu_nais}`}
                />
                <RowsTr title="Adresse :" value={listPersonneEtById.adresse} />
                <RowsTr
                  title="Statut :"
                  value={value.statut}
                  classNameIcon="hidden"
                />
              </tbody>
            );
          })}
        </table>
        {/* <div className="mt-10 flex items-center justify-center gap-7 max-sm:gap-5 max-sm:flex-col">
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
        </div> */}
      </Container>
    </>
  );
}
