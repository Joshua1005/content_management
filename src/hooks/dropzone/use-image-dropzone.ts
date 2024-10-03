"use client";

import { useEdgeStore } from "@/context/edge-store-provider";
import { useMemo, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface UseImageDropzoneProps {
  onUploadImage?: (image: string) => void | Promise<void>;
}

const useImageDropzone = ({ onUploadImage }: UseImageDropzoneProps) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const imagePreview = useMemo(() => {
    if (!file) return "";

    return URL.createObjectURL(file);
  }, [file]);

  const onUpload = async (file: File) => {
    try {
      const response = await edgestore.images.upload({
        file,
        options: { temporary: true },
        onProgressChange: (progress) => setProgress(progress),
      });

      setImage(() => response.url);

      return response;
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

    const newFile = acceptedFiles[0];

    setFile(() => newFile);

    const response = await onUpload(newFile);

    void onUploadImage?.(response?.url || image);
  };

  const onDelete = async () => {
    try {
      setImage(() => "");
      setFile(() => undefined);
      await edgestore.images.delete({ url: image });
    } catch (error) {
      if (error instanceof Error) {
        setError(() => error.message);
        return;
      }

      throw error;
    }
  };

  const resetImageDropzone = () => {
    setFile(() => undefined);
    setError(() => "");
    setImage(() => "");
    setProgress(() => 0);
  };

  const dropzone = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  return {
    dropzone,
    file,
    error,
    imagePreview,
    progress,
    image,
    onDelete,
    resetImageDropzone,
  };
};

export { useImageDropzone };
