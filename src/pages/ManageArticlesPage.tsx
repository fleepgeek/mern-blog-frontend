import { Loader2 } from "lucide-react";
import {
  useGetAllCategories,
  useGetCurrentUserArticles,
} from "../api/ArticleApi";
import { useSearchParams } from "react-router-dom";
import NewArticleButton from "../components/NewArticleButton";
import DataTable from "../components/DataTable";
import {
  Article,
  ArticleQueryObject,
  FilterOption,
  SortOption,
} from "../lib/types";
import { SearchData } from "../lib/validations";
import DataTableSearchBox from "../components/DataTableSearchBox";
import DataTableToolbar from "../components/DataTableToolbar";
import DataTableSortOption from "../components/DataTableSortOption";
import DataTableFilterList from "../components/DataTableFilterList";
import ManageArticleActions from "../components/ManageArticleActions";

const SORT_OPTIONS: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export default function ManageArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const queryObject: ArticleQueryObject = {
    page: parseInt(searchParams.get("page") as string),
    searchQuery: searchParams.get("title") || "",
    sortBy: searchParams.get("sortBy") || "newest", // Default to newest
    filterByCategory: searchParams.get("filterByCategory") || "all", // Default to all articles
  };
  const { data, isLoading } = useGetCurrentUserArticles(queryObject);

  const { categories } = useGetAllCategories();

  const filterCategoryOptions: FilterOption[] = (categories ?? []).map(
    (category) => ({
      label: category.name,
      value: category._id,
    }),
  );

  const columns: Array<{
    id: keyof Article;
    header: string;
    className?: string;
    render?: (value: Article[keyof Article]) => React.ReactNode;
  }> = [
    {
      id: "title",
      header: "Title",
    },
    {
      id: "_id",
      header: "Actions",
      className: "text-right",
      render: (value) => <ManageArticleActions id={value as string} />,
    },
  ];

  const setPage = (page: number) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", page.toString());
      return prevSearchParams;
    });
  };

  const handleSearch = (data: SearchData) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("title", data.searchQuery);
      prevSearchParams.set("page", "1");
      return prevSearchParams;
    });
  };

  const handleReset = () => {
    setSearchParams();
  };

  const handleSortChange = (value: string) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("sortBy", value);
      prevSearchParams.set("page", "1");
      return prevSearchParams;
    });
  };

  const handleFilterChange = (value: string) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("filterByCategory", value);
      prevSearchParams.set("page", "1");
      return prevSearchParams;
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { articles, pagingInfo } = data;

  const transformedArticles = articles.map((article) => ({
    ...article,
    id: article._id,
  }));

  if (
    !queryObject.searchQuery &&
    articles.length === 0 &&
    pagingInfo.total === 0
  )
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">
          No article yet. Start with your first article here
        </h2>
        <NewArticleButton />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <p className="text-[0.8rem] text-muted-foreground">
          Edit and Delete your articles
        </p>
      </section>

      <DataTable
        data={transformedArticles}
        columns={columns}
        pagingInfo={pagingInfo}
        setPage={setPage}
        caption="A list of articles created by you"
      >
        <DataTableToolbar>
          <DataTableSearchBox onSearch={handleSearch} onReset={handleReset} />
          <DataTableFilterList
            filterBy={queryObject.filterByCategory}
            filterOptions={filterCategoryOptions}
            onChange={handleFilterChange}
          />
          <DataTableSortOption
            sortOptions={SORT_OPTIONS}
            sortBy={queryObject.sortBy}
            onChange={handleSortChange}
          />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
