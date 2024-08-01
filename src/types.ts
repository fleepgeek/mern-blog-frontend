export type User = {
  _id: string;
  name: string;
  bio: string;
  email: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type CategoryOption = {
  label: string;
  value: string;
};

export type Article = {
  _id: string;
  title: string;
  category: Category;
  content: string;
  // shortContent: string;
  author: User;
  coverImageUrl?: string;
  createdAt: string;
};

export type PagingInfo = {
  total: number;
  page: number;
  pages: number;
};

export type ArticleApiResponse = {
  pagingInfo: PagingInfo;
  articles: Article[];
};

export type ArticleQueryObject = {
  page: number;
};
