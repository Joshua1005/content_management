"use client";

import { Category } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useProduct } from "@/hooks/products/use-product";

interface CategoryCardProps extends Category {}

const CategoryCard = ({ name }: CategoryCardProps) => {
  const product = useProduct({ query: { where: { categoryName: name } } });

  return (
    <div className="overflow-hidden rounded-lg bg-background shadow-sm">
      <Image
        src={product?.data?.thumbnail ?? "/placeholder.svg"}
        alt={name}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
        style={{ aspectRatio: "400/300" }}
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{name}</h3>
        <Link
          className={buttonVariants({ variant: "outline", className: "gap-2" })}
          href={`products?category=${name.toLowerCase()}`}
        >
          View Products
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export { CategoryCard };
