export type User = {
  _id: string;
  name: string;
  bio: string;
  email: string;
  bookmarkedIds: string[];
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
  searchQuery: string;
  sortBy: string;
  filterByCategory: string;
};

export type SortOption = {
  label: string;
  value: string;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type Comment = {
  _id: string;
  user: User;
  article: Article;
  content: string;
  createdAt: string;
};
