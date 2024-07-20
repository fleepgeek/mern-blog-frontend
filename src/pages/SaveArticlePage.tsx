import { useParams } from "react-router-dom";
import {
  useCreateArticle,
  useGetAllCategories,
  useGetSingleArticle,
  useUpdateArticle,
  useUploadImage,
} from "../api/ArticleApi";
import SaveArticleForm from "../forms/SaveArticleForm";
import UploadImageForm from "../forms/UploadImageForm";
import { Loader2 } from "lucide-react";

export default function SaveArticlePage() {
  const { categories } = useGetAllCategories();
  const { createArticle, isLoading: isSavingArticle } = useCreateArticle();
  const { uploadImage, imageUrl, isLoading: isUploading } = useUploadImage();

  const { id } = useParams();
  const { article, isLoading: isArticleLoading } = useGetSingleArticle(
    id as string,
  );
  const { updateArticle, isLoading: isUpdatingArticle } = useUpdateArticle(
    id as string,
  );
  const isEditing = !!article;

  if (isArticleLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  console.log(imageUrl);

  return (
    <>
      <UploadImageForm
        onSave={uploadImage}
        isLoading={isUploading}
        coverImage={imageUrl || article?.coverImageUrl}
      />
      <SaveArticleForm
        categoryOptions={
          categories
            ? categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))
            : []
        }
        onSave={isEditing ? updateArticle : createArticle}
        isLoading={isSavingArticle || isUpdatingArticle}
        coverImage={imageUrl}
        article={article}
      />
    </>
  );
}
