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
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import LoadingButton from "../components/LoadingButton";
// import { useEffect } from "react";

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
  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const onSubmit = (imageData: ImageFormData) => {
    const formData = new FormData();
    formData.append("imageFile", imageData.imageFile);

    onSave(formData);
  };

  // useEffect(() => {
  //   if(coverImage) {
  //     onSubmit(form.getValues)
  //   }

  // }, [coverImage, onSubmit])

  return (
    <>
      {coverImage && (
        <img
          src={coverImage}
          className="mb-4 h-[300px] w-full rounded-md object-cover"
          alt="article cover image"
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-2 flex gap-2"
        >
          <FormField
            name="imageFile"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    // className="bg-white"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <LoadingButton>Uploading...</LoadingButton>
          ) : (
            <Button type="submit">Save</Button>
          )}
        </form>
      </Form>
    </>
  );
}
