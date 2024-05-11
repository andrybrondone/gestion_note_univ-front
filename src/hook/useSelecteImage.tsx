import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useSelecteImage() {
  const { authState } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      .then((res) => {
        if (res.data.error === "Internal server error") {
          console.log("non");
        } else {
          console.log("ok");
        }
      })
      .catch((err) => console.log(err));
  };
  return { selectedImage, imagePreview, handleImageSelect, handleUploadImage };
}
