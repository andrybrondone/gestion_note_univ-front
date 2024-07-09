import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { DataFetcherByIdContext } from "../context/DataFetcherByIdContext";
import { ToggleStateContext } from "../context/ToggleStateContext";
import useToggle from "./useToggle";

export default function useSelecteImage() {
  const { authState } = useContext(AuthContext);
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
    const formdata = new FormData();
    formdata.append("photo", selectedImage);
    axios
      .put(
        `http://localhost:3001/personne/updatephoto/${authState.id}`,
        formdata
      )
      .then(async (res) => {
        if (res.data.error === "Internal server error") {
          console.log("non");
        } else {
          if (authState.statut === "etudiant") {
            await getListPersonneEtById(listPersonneEtById.id);
          } else if (authState.statut === "enseignant") {
            await getListPersonneEnsById(listPersonneEnsById.id);
          } else if (authState.statut === "administrateur") {
            await getListPersonneById(listPersonneById.id);
          }
          toggleState();
          toggleValue();
          toast.success("Votre photo de profile a été modifier avec succée");
        }
      })
      .catch((err) => console.log(err));
  };
  return {
    selectedImage,
    imagePreview,
    handleImageSelect,
    handleUploadImage,
    value,
  };
}
