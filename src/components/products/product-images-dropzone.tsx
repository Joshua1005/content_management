"use client";

import { cn } from "@/lib/utils";
import { useImagesDropzone } from "@/hooks/dropzone/use-images-dropzone";
import {
  Dropzone,
  DropzoneContent,
  DropzoneDescription,
  DropzoneImagePreview,
  DropzoneInput,
  DropzoneTitle,
} from "@/components/ui/dropzone";

interface ProductKeywordCardProps
  extends ReturnType<typeof useImagesDropzone> {}

const ProductImagesDropzone = ({
  dropzone,
  imagePreviews,
  images,
  progress,
  files,
  onDelete,
}: ProductKeywordCardProps) => {
  return (
    <Dropzone {...dropzone}>
      <div
        className={cn(
          "mx-auto flex gap-2 p-2",
          imagePreviews.length > 0 ? "w-max" : "w-full",
        )}
      >
        <DropzoneInput />
        <DropzoneContent
          className={cn(imagePreviews.length > 0 ? "w-auto" : "w-full")}
        >
          <DropzoneTitle>Add Photos</DropzoneTitle>
          <DropzoneDescription>
            Click or drag and drop photos
          </DropzoneDescription>
        </DropzoneContent>
        {imagePreviews.map((imagePreview, index) => (
          <DropzoneImagePreview
            key={imagePreview}
            width={200}
            height={200}
            {...{
              progress: progress[files[index].name],
              src: imagePreview,
              alt: imagePreview,
              onDelete: async () => await onDelete(images[index], files[index]),
            }}
          />
        ))}
      </div>
    </Dropzone>
  );
};

export { ProductImagesDropzone };
