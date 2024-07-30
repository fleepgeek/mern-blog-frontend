export type User = {
  _id: string;
  name: string;
  bio: string;
  email: string;
};

export type Category = {
  _id: string;
  name: string;
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

export type ArticleApiResponse = {
  pagingInfo: {
    total: number;
    page: number;
    pages: number;
  };
  articles: Article[];
};
