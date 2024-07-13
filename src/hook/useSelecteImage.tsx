import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { DataFetcherByIdContext } from "../context/DataFetcherByIdContext";
import { DataUserContext } from "../context/DataUserContext";
import { ToggleStateContext } from "../context/ToggleStateContext";
import { url_api } from "../utils/url-api";
import useToggle from "./useToggle";

export default function useSelecteImage() {
  const { dataUser } = useContext(DataUserContext);
  const { toggleState } = useContext(ToggleStateContext);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const {
    listPersonneEtById,
    getListPersonneEtById,
    listPersonneEnsById,
    listPersonneById,
    getListPersonneById,
    getListPersonneEnsById,
  } = useContext(DataFetcherByIdContext);
  const { value, toggleValue } = useToggle(true);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toggleValue();
      setSelectedImage(file);

      const render = new FileReader();

      render.onload = (e) => {
        let imgDataUrl: string | ArrayBuffer | null = null;
        if (e.target) {
          imgDataUrl = e.target.result;
        }
        setImagePreview(imgDataUrl);
      };

      render.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      const formdata = new FormData();
      formdata.append("photo", selectedImage);
      axios
        .put(`${url_api}/personne/updatephoto/${dataUser.id}`, formdata)
        .then(async (res) => {
          if (res.data.error === "Internal server error") {
            console.log("non");
          } else {
            if (dataUser.statut === "etudiant") {
              await getListPersonneEtById(listPersonneEtById.id);
            } else if (dataUser.statut === "enseignant") {
              await getListPersonneEnsById(listPersonneEnsById.id);
            } else if (dataUser.statut === "administrateur") {
              await getListPersonneById(listPersonneById.id);
            }
            toggleState();
            toggleValue();
            toast.success("Votre photo de profile a été modifiée avec succès");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Aucune image sélectionnée");
    }
  };

  return {
    selectedImage,
    imagePreview,
    handleImageSelect,
    handleUploadImage,
    value,
  };
}
