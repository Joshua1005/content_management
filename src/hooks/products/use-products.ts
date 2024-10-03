"use client";

import { getProducts } from "@/actions/products";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useProducts = (query?: Prisma.ProductFindManyArgs) => {
  const products = useQuery({
    queryKey: query ? ["products", query.where] : ["products"],
    queryFn: async () => await getProducts(query),
  });

  return products;
};

export { useProducts };
