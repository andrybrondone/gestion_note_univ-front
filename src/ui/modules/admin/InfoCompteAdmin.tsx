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

export default function InfoCompteAdmin() {
  const { listPersonneById, getListPersonneById } = useContext(
    DataFetcherByIdContext
  );
  const {
    isdisabled,
    loading,
    imagePreview,
    handleImageSelect,
    handleUploadImage,
  } = useSelecteImage();

  const { toggleState } = useContext(ToggleStateContext);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const deletePhoto = () => {
    if (listPersonneById.photo !== "default_photo.jpg") {
      setLoadingDelete(true);
      axios
        .put(`${url_api}/personne/delete-photo/${listPersonneById.id}`)
        .then(async (res) => {
          if (res.data.Status === "empty") {
            toast.info(res.data.message);
          } else {
            toggleState();
            await getListPersonneById(listPersonneById.id);
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
          className="text-center m-6"
        >
          Vos informations
        </Typography>
        <div className="flex justify-evenly items-center gap-5">
          <UploadAvatar
            photo={listPersonneById.photo}
            handleImageSelect={handleImageSelect}
            imagePreview={imagePreview}
          />
          <div className="flex flex-col gap-3">
            <Button
              icon={{ icon: RiSave2Line }}
              disabled={isdisabled}
              variant="secondary"
              action={handleUploadImage}
              isLoading={loading}
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
          <tbody>
            <RowsTr title="Nom :" value={listPersonneById.nom.toUpperCase()} />
            <RowsTr title="Prénom :" value={listPersonneById.prenom} />
            <RowsTr
              title="Numéro de téléphone :"
              value={listPersonneById.phone}
            />
            <RowsTr title="Adresse e-mail :" value={listPersonneById.email} />
            <RowsTr
              title="Date et lieu de naissance :"
              value={`${listPersonneById.date_nais} à ${listPersonneById.lieu_nais}`}
            />
            <RowsTr title="Adresse :" value={listPersonneById.adresse} />
          </tbody>
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
