"use client";

import { PaginationState, Updater } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface ProductsPaginationProps {
  pagination: PaginationState;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  setPageIndex: (updater: Updater<number>) => void;
}

const ProductsPagination = ({
  pagination,
  pageCount,
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  firstPage,
  lastPage,
  setPageIndex,
}: ProductsPaginationProps) => {
  const maxPage = 5;
  const pageBlockStart = Math.floor(pagination.pageIndex / maxPage);
  const startPage = pageBlockStart * maxPage;
  const pageBlockEnd = Math.min(startPage + maxPage, pageCount);
  const pages = Array.from(
    { length: pageBlockEnd - startPage },
    (_, index) => startPage + index,
  );
  const canGoPreviousBlock = pageBlockStart > 0;
  const canGoNextBlock = pageBlockEnd < pageCount;

  return (
    <Pagination>
      <PaginationContent className="select-none">
        <PaginationItem>
          <PaginationLink
            className={cn(
              "hidden md:inline-flex",
              !canPreviousPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer",
            )}
            onClick={() => firstPage()}
          >
            <DoubleArrowLeftIcon />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              !canPreviousPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer",
            )}
            onClick={previousPage}
          />
        </PaginationItem>
        {canGoPreviousBlock && (
          <PaginationItem className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((page) => {
          return (
            <PaginationItem className="hidden md:block" key={page}>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  setPageIndex(page);
                }}
                isActive={pagination.pageIndex === page}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {canGoNextBlock && (
          <PaginationItem className="hidden md:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={cn(
              !canNextPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer",
            )}
            onClick={nextPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={cn(
              "hidden md:inline-flex",
              !canNextPage
                ? "pointer-events-none opacity-50"
                : "cursor-pointer",
            )}
            onClick={lastPage}
          >
            <DoubleArrowRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { ProductsPagination };
