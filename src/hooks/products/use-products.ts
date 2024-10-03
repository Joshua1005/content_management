"use client";

import { getProducts } from "@/actions/products";
import { Prisma, Product } from "@prisma/client";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useProducts = (
  query?: Prisma.ProductFindManyArgs,
  queryOptions?: Omit<UseQueryOptions<Product[]>, "queryKey" | "queryFn">,
) => {
  const products = useQuery({
    queryKey: query ? ["products", query.where] : ["products"],
    queryFn: async () => await getProducts(query),
    ...queryOptions,
  });

  return products;
};

export { useProducts };
