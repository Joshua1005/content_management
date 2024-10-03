"use client";

import { Product } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";
import {
  ChevronsUpDownIcon,
  CopyIcon,
  EditIcon,
  Ellipsis,
  Trash2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteProduct } from "@/hooks/products/use-delete-product";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCategory } from "@/hooks/categories/use-category";
import { useCategories } from "@/hooks/categories/use-categories";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<Product>();

const productsColumnDef = [
  columnHelper.accessor("thumbnail", {
    header: () => {
      return <span>Thumbnail</span>;
    },
    cell: (info) => {
      return (
        <Image
          src={"/placeholder.svg"}
          alt={info.row.original.name}
          width={60}
          height={60}
          className="aspect-square rounded-md object-cover"
        />
      );
    },
  }),
  columnHelper.accessor("name", {
    header: () => {
      return <span>Name</span>;
    },
    cell: (info) => {
      return <span className="font-semibold">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("categoryId", {
    id: "categoryId",
    header: ({ table }) => {
      const [selectedCategoryId, setSelectedCategoryId] = useState("");
      const categories = useCategories();

      useEffect(
        () =>
          table.setColumnFilters([
            { id: "categoryId", value: selectedCategoryId },
          ]),
        [selectedCategoryId],
      );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="-ml-4">
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={selectedCategoryId}
              onValueChange={(e) => setSelectedCategoryId(e)}
            >
              {categories.data?.map((category) => (
                <DropdownMenuRadioItem
                  key={category.id}
                  value={`${category.id}`}
                >
                  {category.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: (info) => {
      const categoryId = info.row.original.categoryId;

      const category = useCategory({ id: categoryId });

      return <span>{category.data?.name}</span>;
    },
    enableColumnFilter: true,
    filterFn: ({ original }, id, categoryId) => {
      if (original.categoryId === parseInt(categoryId)) return true;

      return false;
    },
  }),
  columnHelper.accessor("description", {
    header: () => {
      return <span>Description</span>;
    },
    cell: (info) => {
      return <span className="line-clamp-2 text-xs">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("stocks", {
    header: (info) => {
      return (
        <Button
          className="-ml-4 gap-4"
          variant="ghost"
          onClick={() => {
            info.column.toggleSorting(info.column.getIsSorted() === "asc");
          }}
        >
          Stocks
          <ChevronsUpDownIcon className="size-4" />
        </Button>
      );
    },
    cell: (info) => {
      return <span className="">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("priceCents", {
    header: (info) => {
      return (
        <Button
          className="-ml-4 gap-4"
          variant="ghost"
          onClick={() => {
            info.column.toggleSorting(info.column.getIsSorted() === "asc");
          }}
        >
          Price
          <ChevronsUpDownIcon className="size-4" />
        </Button>
      );
    },
    cell: (info) => {
      const price = (info.getValue() / 100).toFixed(2);

      return <span>${price}</span>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: () => {
      return <span>Created At</span>;
    },
    cell: (info) => {
      const dateFormat = dayjs(info.getValue()).format("MMMM DD, YYYY");

      return <span className="line-clamp-1">{dateFormat}</span>;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => {
      return <span></span>;
    },
    cell: (info) => {
      const queryClient = useQueryClient();
      const { toast } = useToast();
      const { mutate } = useDeleteProduct({
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="gap-2"
              onClick={() => {
                navigator.clipboard.writeText(info.row.original.id.toString());

                toast({
                  title: "Copied to Clipboard!",
                  description:
                    "The ID has been successfully copied. You can now paste it where needed.",
                });
              }}
            >
              <CopyIcon className="size-4" />
              <span className="font-medium">Copy ID to clipboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <EditIcon className="size-4" />
                <span className="font-medium">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => {
                  mutate(info.row.original.id);
                  toast({
                    title: "Product deleted!",
                    description:
                      "You have been successfully deleted the product.",
                    variant: "destructive",
                  });
                }}
              >
                <Trash2Icon className="size-4" />
                <span className="font-medium">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

export { productsColumnDef };
