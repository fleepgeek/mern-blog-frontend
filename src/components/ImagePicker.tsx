import { FileUp, ImagePlus } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";

type ImagePickerProps = {
  name: string;
  onClick?: () => void;
  isLoading: boolean;
  imageUrlToWatch: string;
  displayText?: string;
};

export default function ImagePicker({
  name,
  onClick,
  isLoading,
  imageUrlToWatch,
  displayText,
}: ImagePickerProps) {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch(imageUrlToWatch);

  const [file, setFile] = useState<File | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    let reader = null;

    const handleLoad = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      if (result) {
        setTempImage(result as string);
      }
    };

    if (file) {
      reader = new FileReader();
      reader.addEventListener("load", handleLoad);
      reader.readAsDataURL(file);
    }

    return () => {
      // if (reader && reader.readyState === 1) {
      if (reader) {
        reader.abort();
        reader.removeEventListener("load", handleLoad);
      }
    };
  }, [file]);

  return (
    <>
      <div
        className="group mb-4 flex h-[300px] cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          fileRef.current?.click();
          onClick && onClick();
        }}
      >
        {tempImage && isLoading ? (
          <div className="flex flex-col items-center">
            <FileUp size={36} className="animate-bounce" />
            <p className="animate-pulse">Uploading...</p>
          </div>
        ) : tempImage || existingImageUrl ? (
          <img
            src={tempImage || existingImageUrl}
            className="h-full w-full rounded-md object-cover"
            alt="article cover image"
          />
        ) : (
          <div className="flex flex-col items-center">
            <ImagePlus
              size={36}
              className="text-gray-500 group-hover:text-gray-700"
            />
            <p className="text-gray-500 group-hover:text-gray-700">
              {displayText || "Select Image"}
            </p>
          </div>
        )}
      </div>

      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* can use normal input and enable hidden.
      hidden doesn work for shadcn Input that's why className is used. */}
              <Input
                type="file"
                ref={fileRef}
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  field.onChange(e.target.files ? e.target.files[0] : null);
                  handleChange(e);
                }}
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
