"use client";

import { useEdgeStore } from "@/context/edge-store-provider";
import { useMemo, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface UseImagesDropzoneProps {
  onUploadImages?: (images: string[]) => void | Promise<void>;
}

const useImagesDropzone = ({ onUploadImages }: UseImagesDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const { edgestore } = useEdgeStore();

  const imagePreviews = useMemo(
    () => Array.from(files, (file) => URL.createObjectURL(file)),
    [files],
  );

  const onUpload = async (file: File) => {
    setProgress((prev) => ({ ...prev, [file.name]: 0 }));

    try {
      const response = await edgestore.images.upload({
        file,
        options: { temporary: true },
        onProgressChange: (progress) => {
          setProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        },
      });

      setImages((previousImages) => [...previousImages, response.url]);
    } catch (error) {
      if (error instanceof Error) {
        setError(() => error.message);
        return;
      }

      throw error;
    }
  };

  const onDrop = async (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
  ) => {
    if (acceptedFiles.length <= 0) return;

    if (fileRejections.length > 0) {
      setError(() => fileRejections[0].errors[0].message);
      return;
    }

    const newFiles = files.concat(acceptedFiles);

    setFiles(() => newFiles);

    await Promise.all(newFiles.map(onUpload));

    void onUploadImages?.(images);
  };

  const onDelete = async (image: string, file: File) => {
    try {
      setImages((previousImages) =>
        previousImages.filter((previousImage) => previousImage !== image),
      );
      setFiles((previousFiles) =>
        previousFiles.filter((previousFile) => previousFile !== file),
      );

      await edgestore.images.delete({ url: image });
    } catch (error) {
      if (error instanceof Error) {
        setError(() => error.message);
        return;
      }

      throw error;
    }
  };

  const resetImagesDropzone = () => {
    setFiles(() => []);
    setError(() => "");
    setImages(() => []);
    setProgress(() => ({}));
  };

  const dropzone = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return {
    dropzone,
    files,
    error,
    imagePreviews,
    progress,
    images,
    onDelete,
    resetImagesDropzone,
  };
};

export { useImagesDropzone };
