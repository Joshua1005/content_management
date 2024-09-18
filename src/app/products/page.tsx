"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductTable } from "@/hooks/products/use-product-table";
import { useProducts } from "@/hooks/products/use-products";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsPagination } from "@/components/products/products-pagination";
import { productsColumnDef } from "@/components/products/products-columnsDef";
import { Button, buttonVariants } from "@/components/ui/button";
import { CirclePlusIcon, FilterIcon, FolderUpIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProductsPage = () => {
  const products = useProducts();
  const table = useProductTable({
    data: products.data || [],
    columns: productsColumnDef,
  });
  const { pagination } = table.getState();
  const headerGroups = table.getHeaderGroups();
  const columns = table.getAllColumns();
  const rowModel = table.getRowModel();
  const rowCount = table.getRowCount();
  const pageCount = table.getPageCount();

  return (
    <>
      <div className="container mx-auto mt-4 space-y-8 md:mt-8">
        <div className="flex items-center justify-between">
          <div></div>
          <div className="space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2">
                  <FilterIcon className="size-4" />
                  <span className="hidden md:block">Filter Products</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {columns
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          checked={column.getIsVisible()}
                          onCheckedChange={() => {
                            column.toggleVisibility(!column.getIsVisible());
                          }}
                          key={column.id}
                        >
                          <span className="capitalize">
                            {column.id.split(/(?=[A-Z])/)[0]}
                          </span>
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="gap-2">
              <FolderUpIcon className="size-4" />
              <span className="hidden md:block">Export</span>
            </Button>
            <Link
              href="/products/add"
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                  className: "gap-2",
                }),
              )}
            >
              <CirclePlusIcon className="size-4" />
              <span className="hidden md:block">Add product</span>
            </Link>
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Products Manager</CardTitle>
              <CardDescription>
                Manage your products properties here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsTable headerGroups={headerGroups} rowModel={rowModel} />
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground md:block">
                Showing{" "}
                <span className="font-bold">
                  {rowCount
                    ? pagination.pageSize * pagination.pageIndex + 1
                    : 0}{" "}
                  -{" "}
                  {Math.min(
                    pagination.pageSize * (pagination.pageIndex + 1),
                    rowCount,
                  )}{" "}
                </span>
                of
                <span className="font-bold"> {rowCount} products.</span>
              </p>
              <ProductsPagination
                pageCount={pageCount}
                pagination={pagination}
                setPageIndex={table.setPageIndex}
                canNextPage={table.getCanNextPage()}
                canPreviousPage={table.getCanPreviousPage()}
                nextPage={table.nextPage}
                previousPage={table.previousPage}
                firstPage={table.firstPage}
                lastPage={table.lastPage}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="container mx-auto mt-4 md:mt-8">
        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;
