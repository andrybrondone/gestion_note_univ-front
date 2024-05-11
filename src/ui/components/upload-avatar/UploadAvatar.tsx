import React from "react";
import { RiCameraFill } from "react-icons/ri";
import { Avatar } from "../../design-system/avatar/Avatar";

interface Props {
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photo: string;
  imagePreview: string | ArrayBuffer | null;
}

export default function UploadAvatar({
  photo,
  handleImageSelect,
  imagePreview,
}: Props) {
  return (
    <div className="relative flex items-center gap-5">
      <Avatar
        src={
          imagePreview
            ? typeof imagePreview === "string"
              ? imagePreview
              : String(imagePreview)
            : `http://localhost:3001/images/${photo}`
        }
        alt="Avatar"
        size="very-large"
      />
      <label
        htmlFor="file"
        className="absolute bottom-2 right-1 bg-primary hover:bg-primary-400 text-white rounded-full p-1 cursor-pointer transition"
      >
        <RiCameraFill className="text-3xl" />
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleImageSelect}
        />
      </label>
    </div>
  );
}
