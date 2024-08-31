import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import LoadingButton from "../components/LoadingButton";
import ComboBox from "../components/ComboBox";
import { useEffect } from "react";
import { Article } from "../types";
import ImagePicker from "../components/ImagePicker";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  coverImageUrl: z.string().optional(),
});

export type ArticleFormObject = z.infer<typeof formSchema>;

type SaveArticleFormProps = {
  categoryOptions: {
    label: string;
    value: string;
  }[];
  onSave: (data: FormData) => void;
  isLoading: boolean;
  article?: Article;
  savedData?: Article;
};

export default function SaveArticleForm({
  categoryOptions,
  isLoading,
  onSave,
  article,
  savedData,
}: SaveArticleFormProps) {
  const form = useForm<ArticleFormObject>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      category: article?.category._id || "",
      content: article?.content || "",
      coverImageUrl: article?.coverImageUrl || "",
      imageFile: undefined,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (articleFormObject: ArticleFormObject) => {
    const formData = new FormData();
    formData.append("title", articleFormObject.title);
    formData.append("category", articleFormObject.category);
    formData.append("content", articleFormObject.content);

    if (articleFormObject.imageFile) {
      formData.append("imageFile", articleFormObject.imageFile);
    }

    onSave(formData);
  };

  useEffect(() => {
    if (savedData) {
      navigate(`/articles/${savedData._id}`);
    }
  }, [savedData, navigate]);

  useEffect(() => {
    form.reset({
      title: article?.title || "",
      category: article?.category._id || "",
      content: article?.content || "",
      coverImageUrl: article?.coverImageUrl || "",
      imageFile: undefined,
    });
  }, [article, form, savedData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ImagePicker
          name="imageFile"
          imageUrlToWatch="coverImageUrl"
          isLoading={isLoading}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Category</FormLabel>
              <ComboBox
                {...field}
                // ref={field.ref}
                options={categoryOptions}
                title="Category"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isLoading}>Save</LoadingButton>
      </form>
    </Form>
  );
}
