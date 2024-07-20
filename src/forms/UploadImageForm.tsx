import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { useCallback, useRef } from "react";
import { FileUp, ImagePlus } from "lucide-react";
import { Input } from "../components/ui/input";

const formSchema = z.object({
  imageFile: z.instanceof(File, { message: "imageFile required" }),
  imageUrl: z.string().optional(),
});

type ImageFormData = z.infer<typeof formSchema>;

type UploadImageFormProps = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
  coverImage: string;
};

export default function UploadImageForm({
  onSave,
  isLoading,
  coverImage,
}: UploadImageFormProps) {
  // const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const onSubmit = useCallback(
    (imageData: ImageFormData) => {
      const formData = new FormData();
      formData.append("imageFile", imageData.imageFile);

      onSave(formData);
    },
    [onSave],
  );

  // useEffect(() => {
  //   form.reset();
  // }, [coverImage, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
          <div
            className="group mb-4 flex h-[300px] cursor-pointer items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={() => fileRef.current?.click()}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <FileUp size={36} className="animate-bounce" />
                <p className="animate-pulse">Uploading...</p>
              </div>
            ) : coverImage ? (
              <img
                src={coverImage}
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
                  Select cover image
                </p>
              </div>
            )}
          </div>

          <FormField
            name="imageFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* can use normal input and enable hidden.
                  hidden doesn ork for shadcn Input that's why class is used. */}
                  <Input
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0] : null);
                      if (e.target.files && e.target.files.length > 0) {
                        onSubmit(form.getValues());
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
