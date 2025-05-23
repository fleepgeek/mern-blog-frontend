import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
        {/* prev link */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              size=""
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {/* first link */}
        <PaginationItem>
          <PaginationLink
            href="#"
            size=""
            onClick={() => onPageChange(pagesNumbers[0])}
            isActive={page === pagesNumbers[0]}
          >
            {pagesNumbers[0]}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {/* in between links */}
        {pagesNumbers.map((pageNumber) => {
          if (pageNumber === 1) return;
          if (pageNumber === pages) return;

          if (pageNumber < page - 2) return;
          if (pageNumber > page + 2) return;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                size=""
                onClick={() => onPageChange(pageNumber)}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* last link */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            size=""
            onClick={() => onPageChange(pages)}
            isActive={page === pagesNumbers.pop()}
          >
            {pages}
          </PaginationLink>
        </PaginationItem>

        {/* next link */}
        {page < pages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              size=""
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
