import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationControlProps = {
  pages: number;
  page: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControl({
  page,
  pages,
  onPageChange,
}: PaginationControlProps) {
  const pagesNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              // href="#"
              className="cursor-pointer"
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
        {pagesNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              // href="#"
              className="cursor-pointer"
              onClick={() => onPageChange(pageNumber)}
              isActive={page === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page < pages && (
          <PaginationItem>
            <PaginationNext
              // href="#"
              className="cursor-pointer"
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
