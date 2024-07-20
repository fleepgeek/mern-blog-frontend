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
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import LoadingButton from "../components/LoadingButton";
import ComboBox from "../components/ComboBox";
import { useEffect } from "react";
import { Article } from "../types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  coverImageUrl: z.string(),
});

export type ArticleFormObject = z.infer<typeof formSchema>;

type SaveArticleFormProps = {
  categoryOptions: {
    label: string;
    value: string;
  }[];
  onSave: (data: ArticleFormObject) => void;
  isLoading: boolean;
  coverImage: string;
  article?: Article;
};

export default function SaveArticleForm({
  categoryOptions,
  isLoading,
  onSave,
  coverImage,
  article,
}: SaveArticleFormProps) {
  const form = useForm<ArticleFormObject>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      category: article?.category._id || "",
      content: article?.content || "",
      coverImageUrl: article?.coverImageUrl || "",
    },
  });

  useEffect(() => {
    if (coverImage) {
      form.setValue("coverImageUrl", coverImage);
    }
  }, [coverImage, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <FormField
          control={form.control}
          name="coverImageUrl"
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
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

        {isLoading ? <LoadingButton /> : <Button type="submit">Save</Button>}
      </form>
    </Form>
  );
}
