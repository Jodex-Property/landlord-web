import Image from "next/image";
import React from "react";

const ImageCard = () => {
  return (
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <Image
          src="/assets/img/avatar-image.jpg"
          alt="Jodex Landlord Image"
          width={100}
          height={100}
        />
      </div>
      <div className="p-8">
        <h2 className="uppercase tracking-wide text-sm text-blue-950 font-semibold">
          Bisola Akiode
        </h2>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">
          Landlord
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
