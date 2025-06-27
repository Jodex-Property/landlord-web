"use client";

import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const Dropzone = ({ onDrop }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
    maxFiles: 5,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer hover:bg-gray-100 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-gray-500">Drop the images here ...</p>
      ) : (
        <p className="text-gray-500">
          Drag and drop some images here, or click to select files
        </p>
      )}
    </div>
  );
};
