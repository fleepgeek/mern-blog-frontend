import {
  useCreateArticle,
  useGetAllCategories,
  useUploadImage,
} from "../api/ArticleApi";
import ManageArticleForm from "../forms/ManageArticleForm";
import UploadImageForm from "../forms/UploadImageForm";

export default function CreateArticlePage() {
  const { categories } = useGetAllCategories();
  const { createArticle, isLoading } = useCreateArticle();
  const { uploadImage, imageUrl, isLoading: isUploading } = useUploadImage();

  // if (isLoading) {
  //   return null;
  // }

  return (
    <>
      {/* {console.log(imageUrl)} */}
      <UploadImageForm
        onSave={uploadImage}
        isLoading={isUploading}
        coverImage={imageUrl}
      />
      <ManageArticleForm
        categoryOptions={
          categories
            ? categories.map((category) => ({
                label: category.name,
                value: category._id,
              }))
            : []
        }
        onSave={createArticle}
        isLoading={isLoading}
        coverImage={imageUrl}
      />
    </>
  );
}
