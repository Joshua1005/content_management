"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Product } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table";
import { useDeleteProduct } from "@/hooks/products/use-delete-product";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "@/hooks/categories/use-categories";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  columnHelper.accessor("categoryName", {
    header: ({ table }) => {
      const [selectedCategory, setSelectedCategory] = useState("");
      const router = useRouter();
      const pathname = usePathname();
      const searchParams = useSearchParams();
      const categories = useCategories();
      const searchCategory = searchParams.get("category");

      useEffect(() => {
        if (searchCategory) setSelectedCategory(searchCategory);
      }, [searchCategory]);

      useEffect(() => {
        table.setColumnFilters([
          { id: "categoryName", value: selectedCategory },
        ]);
      }, [selectedCategory]);

      const handleValueChange = (e: string) => {
        const category = e === selectedCategory ? "" : e;
        setSelectedCategory(category);

        const currentParams = new URLSearchParams(searchParams);

        if (category) {
          currentParams.set("category", category);
        } else {
          currentParams.delete("category");
        }

        const search = currentParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="-ml-4">
              Category
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={handleValueChange}
            >
              {categories.data?.map((category) => (
                <DropdownMenuRadioItem
                  key={category.name}
                  value={category.name.toLowerCase()}
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
      return <span>{info.getValue()}</span>;
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
    header: ({ column }) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const isSorted = column.getIsSorted();

      useEffect(() => {
        const currentParams = new URLSearchParams(searchParams);

        if (isSorted) {
          currentParams.set("sort", column.id);
          currentParams.set("order", isSorted === "asc" ? "asc" : "desc");
        } else {
          currentParams.delete("sort");
          currentParams.delete("order");
        }

        const search = currentParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`);
      }, [isSorted]);

      return (
        <Button
          className="-ml-4 gap-4"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(isSorted === "asc");
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
    header: ({ column }) => {
      const router = useRouter();
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const isSorted = column.getIsSorted();

      useEffect(() => {
        const currentParams = new URLSearchParams(searchParams);

        if (isSorted) {
          currentParams.set("sort", column.id);
          currentParams.set("order", isSorted === "asc" ? "asc" : "desc");
        } else {
          currentParams.delete("sort");
          currentParams.delete("order");
        }

        const search = currentParams.toString();
        const query = search ? `?${search}` : "";

        router.replace(`${pathname}${query}`);
      }, [isSorted]);

      return (
        <Button
          className="-ml-4 gap-4"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
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
              <DropdownMenuItem className="gap-2" asChild>
                <Link href={`/products/edit/${info.row.original.id}`}>
                  <EditIcon className="size-4" />
                  <span className="font-medium">Edit</span>
                </Link>
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
