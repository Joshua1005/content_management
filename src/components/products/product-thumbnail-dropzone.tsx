"use client";

import { useImageDropzone } from "@/hooks/dropzone/use-image-dropzone";
import {
  Dropzone,
  DropzoneContent,
  DropzoneDescription,
  DropzoneImagePreview,
  DropzoneInput,
  DropzoneTitle,
} from "@/components/ui/dropzone";

interface ProductKeywordCardProps extends ReturnType<typeof useImageDropzone> {}

const ProductThumbnailDropzone = ({
  dropzone,
  progress,
  imagePreview,
  onDelete,
}: ProductKeywordCardProps) => {
  return (
    <Dropzone {...dropzone}>
      <DropzoneInput type="file" />
      {imagePreview ? (
        <DropzoneImagePreview
          width={500}
          height={500}
          {...{
            progress,
            alt: imagePreview,
            src: imagePreview,
            onDelete: async () => await onDelete(),
          }}
        />
      ) : (
        <DropzoneContent>
          <DropzoneTitle>Add thumbnail</DropzoneTitle>
          <DropzoneDescription>
            Click or drag and drop thumbnail
          </DropzoneDescription>
        </DropzoneContent>
      )}
    </Dropzone>
  );
};

export { ProductThumbnailDropzone };
