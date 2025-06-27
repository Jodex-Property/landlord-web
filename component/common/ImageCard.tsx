import Image from "next/image";
import React from "react";

interface ImageCardProps {
  profilePicture?: string | File;
  name?: string;
  onUploadClick?: () => void;
}

const ImageCard = ({ profilePicture, name, onUploadClick }: ImageCardProps) => {
  const imageUrl =
    profilePicture instanceof File
      ? URL.createObjectURL(profilePicture)
      : profilePicture || "/assets/img/avatar-image.jpg";

  const userName = name || "N/A";

  return (
    <div className="md:flex items-center">
      <div className="md:flex-shrink-0 relative">
        <Image
          src={imageUrl}
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full object-cover w-24 h-24"
        />
        <button
          type="button"
          onClick={onUploadClick}
          className="absolute -bottom-2 left-1/2 cursor-pointer transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          Upload
        </button>
      </div>
      <div className="p-8">
        <h2 className="uppercase tracking-wide text-sm text-blue-950 font-semibold">
        {userName}
        </h2>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          Landlord
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
