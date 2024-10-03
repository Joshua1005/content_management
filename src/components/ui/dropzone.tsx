"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { DropzoneState } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { CheckIcon, CircleXIcon } from "lucide-react";

const DropzoneContext = React.createContext<DropzoneState | null>(null);

interface DropzoneProps extends DropzoneState {
  children: React.ReactNode;
}

const Dropzone = ({ children, ...dropzone }: DropzoneProps) => {
  return (
    <DropzoneContext.Provider value={{ ...dropzone }}>
      {children}
    </DropzoneContext.Provider>
  );
};

const useDropzoneValue = () => {
  const context = React.useContext(DropzoneContext);

  if (!context) throw new Error("useDropzone must be used within Dropzone");

  return context;
};

interface DropzoneContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropzoneContent = React.forwardRef<HTMLDivElement, DropzoneContentProps>(
  ({ className, children, ...props }, ref) => {
    const { getRootProps, isDragAccept, isDragActive } = useDropzoneValue();

    return (
      <div
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-dashed p-6",
          className,
          !isDragActive
            ? "border bg-background"
            : isDragAccept
              ? "border-sky-500 bg-sky-500 bg-opacity-10"
              : "border-destructive bg-red-500 bg-opacity-10",
        )}
        ref={ref}
        {...getRootProps()}
        {...props}
      >
        {children}
      </div>
    );
  },
);

interface DropzoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DropzoneInput = React.forwardRef<HTMLInputElement, DropzoneInputProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    const { getInputProps } = useDropzoneValue();

    return (
      <Input
        className={cn(className)}
        ref={ref}
        {...getInputProps({ id })}
        {...props}
      />
    );
  },
);

interface DropzoneTitleProps
  extends React.ComponentPropsWithoutRef<typeof Label> {}

const DropzoneTitle = React.forwardRef<
  React.ElementRef<typeof Label>,
  DropzoneTitleProps
>(({ className, children, ...props }, ref) => {
  const { inputRef } = useDropzoneValue();

  return (
    <Label
      htmlFor={inputRef.current?.id}
      className={cn("cursor-pointer", className)}
      ref={ref}
      {...props}
    >
      {children}
    </Label>
  );
});

interface DropzoneDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const DropzoneDescription = React.forwardRef<
  HTMLParagraphElement,
  DropzoneDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      className={cn("text-xs text-muted-foreground", className)}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});

interface DropzoneProgressProps extends React.SVGAttributes<SVGSVGElement> {
  progress: number;
}

const DropzoneProgress = React.forwardRef<SVGSVGElement, DropzoneProgressProps>(
  ({ className, progress, ...props }, ref) => {
    const strokeWidth = 10;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="relative size-16">
        <svg
          className={cn(
            "absolute left-0 top-0 -rotate-90 transform",
            className,
          )}
          width="100%"
          height="100%"
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${
            (radius + strokeWidth) * 2
          }`}
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          {...props}
        >
          <circle
            className="text-gray-400"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
          />
          <circle
            className="transition-all duration-300 ease-in-out"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={((100 - progress) / 100) * circumference}
            strokeLinecap="round"
            fill="none"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
          />
        </svg>
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs">
          {progress >= 100 ? (
            <CheckIcon className="size-4" />
          ) : (
            `${Math.round(progress)}%`
          )}
        </div>
      </div>
    );
  },
);

interface DropzoneImagePreviewProps
  extends React.ComponentPropsWithoutRef<typeof Image> {
  onDelete: () => void | Promise<void>;
  progress?: number;
}

const DropzoneImagePreview = React.forwardRef<
  React.ElementRef<typeof Image>,
  DropzoneImagePreviewProps
>(({ className, onDelete, children, progress = 0, ...props }, ref) => {
  const isOnProgress = progress !== 100;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-md">
        <Image className={cn("object-cover", className)} ref={ref} {...props} />
        {!isOnProgress && (
          <CircleXIcon
            onClick={onDelete}
            className="absolute right-0 top-0 size-4 -translate-y-1/2 translate-x-1/2 cursor-pointer stroke-destructive"
          />
        )}
      </div>
      {isOnProgress && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-black/20">
          <DropzoneProgress progress={progress} />
        </div>
      )}
    </div>
  );
});

export {
  Dropzone,
  DropzoneContent,
  DropzoneInput,
  DropzoneDescription,
  DropzoneTitle,
  DropzoneProgress,
  DropzoneImagePreview,
};
