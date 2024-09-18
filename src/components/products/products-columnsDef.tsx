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
          className="aspect-square rounded-md object-contain"
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
  columnHelper.accessor("description", {
    header: () => {
      return <span>Description</span>;
    },
    cell: (info) => {
      return <span className="text-xs">{info.getValue()}</span>;
    },
  }),
  columnHelper.accessor("stocks", {
    header: (info) => {
      return (
        <Button
          className="gap-4"
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
          className="gap-4"
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

      return <span>{dateFormat}</span>;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => {
      return <span></span>;
    },
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="gap-2">
              <CopyIcon className="size-4" />
              <span className="font-medium">Copy ID to clipboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2">
                <EditIcon className="size-4" />
                <span className="font-medium">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
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
