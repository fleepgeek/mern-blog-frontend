import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { PagingInfo } from "../lib/types";
import PaginationControl from "./PaginationControl";
import { useEffect } from "react";
import DataTableToolbar from "./DataTableToolbar";

export type Column<T> = {
  id: keyof T;
  header: string;
  className?: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  pagingInfo?: PagingInfo;
  caption?: string;
  children?: React.ReactElement<typeof DataTableToolbar>;
  setPage: (page: number) => void;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  pagingInfo = { page: 1, pages: 1, total: data.length },
  caption,
  setPage,
  children,
}: DataTableProps<T>) {
  useEffect(() => {
    if (data.length === 0 && pagingInfo.total > 0) {
      pagingInfo.page > 1 ? setPage(pagingInfo.pages) : setPage(1);
    }
  }, [data, pagingInfo, setPage]);

  if (children && children.type !== DataTableToolbar) {
    throw new Error("Only DataTableToolbar is allowed as a child.");
  }

  return (
    <div className="flex flex-col gap-6">
      <>{children}</>
      <div className="-mx-8 flex overflow-x-auto">
        <div className="flex-1 px-8">
          <Table>
            <TableCaption>{caption}</TableCaption>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.id as string}
                    className={column.className || ""}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id as string}>
                      {column.render ? (
                        column.render(row[column.id])
                      ) : (
                        <>{row[column.id]}</>
                      )}
                      {/* : String(row[column.id])} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagingInfo.total > data.length && (
        <PaginationControl
          page={pagingInfo.page}
          pages={pagingInfo.pages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
