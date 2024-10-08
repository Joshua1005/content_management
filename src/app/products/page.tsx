"use client";

import { CirclePlusIcon, FilterIcon, FolderUpIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/products/use-products";
import { useProductTable } from "@/hooks/products/use-product-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductsTable } from "@/components/products/products-table";
import { ProductsPagination } from "@/components/products/products-pagination";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EndpointCard } from "@/components/endpoint-card";
import { productsColumnDef } from "@/components/products/products-columns-def";

const productsAPIEndPoint: APIEndpoint[] = [
  {
    method: "GET",
    path: "/api/products",
    description: "Retrieve all products",
    access: "public",
    example: `fetch(/api/products)\n\t.then((res) => res.json())\n\t.then((data) => console.log(data))\n\t.catch((error) => console.error(error));`,
  },
  {
    method: "POST",
    path: "/api/products",
    description: "Create a new product",
    access: "admin",
    example: `fetch("/api/products", { method: "POST", body: JSON.stringify({ ...product })})\n\t.then((response) => response.json())\n\t.then((data) => console.log(data))\n\t.catch((error) => console.error(error));`,
  },
  {
    method: "GET",
    path: "/api/products/:id",
    description: "Retrieve a specific product",
    access: "public",
    example: `fetch("/api/products/1")\n\t.then((response) => response.json())\n\t.then((data) => console.log(data))\n\t.catch((error) => console.error(error));`,
  },
  {
    method: "PUT",
    path: "/api/products/:id",
    description: "Update a product",
    access: "admin",
    example: `fetch("/api/products/1", { method: "PUT", body: JSON.stringify({ ...product, price: newPrice })})\n\t.then((response) => response.json())\n\t.then((data) => console.log(data))\n\t.catch((error) => console.error(error));`,
  },
  {
    method: "DELETE",
    path: "/api/products/:id",
    description: "Delete a product",
    access: "admin",
    example: `fetch(/api/products, { method: "DELETE" })\n\t.then((res) => res.json())\n\t.then((data) => console.log(data))\n\t.catch((error) => console.error(error));`,
  },
];

const ProductsPage = () => {
  const products = useProducts();
  const table = useProductTable({
    data: products.data ?? [],
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
              <p className="text-nowrap text-xs text-muted-foreground md:block">
                Showing{" "}
                <strong>
                  {rowCount
                    ? pagination.pageSize * pagination.pageIndex + 1
                    : 0}{" "}
                  -{" "}
                  {Math.min(
                    pagination.pageSize * (pagination.pageIndex + 1),
                    rowCount,
                  )}{" "}
                </strong>
                of
                <strong> {rowCount} </strong>
                products.
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
            <CardTitle>Products API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 md:space-y-8">
              {productsAPIEndPoint.map((endpoint) => {
                return (
                  <EndpointCard key={endpoint.description} {...endpoint} />
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsPage;
