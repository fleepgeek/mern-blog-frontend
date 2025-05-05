import { useParams } from "react-router-dom";
import {
  useCreateArticle,
  useGetAllCategories,
  useGetSingleArticle,
  useUpdateArticle,
} from "../api/ArticleApi";
import SaveArticleForm from "../forms/SaveArticleForm";
import { Loader2 } from "lucide-react";

export default function SaveArticlePage() {
  const { categories } = useGetAllCategories();
  const {
    createArticle,
    isLoading: isSavingArticle,
    data: createdData,
  } = useCreateArticle();

  const { id } = useParams();
  const { article, isLoading: isArticleLoading } = useGetSingleArticle(
    id as string,
  );
  const {
    updateArticle,
    isLoading: isUpdatingArticle,
    data: updatedData,
  } = useUpdateArticle(id as string);
  const isEditing = !!article;

  if (isArticleLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
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
      article={article}
      savedData={createdData || updatedData}
    />
  );
}
