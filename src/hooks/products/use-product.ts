"use client";

import { getProduct } from "@/actions/products";
import { Prisma, Product } from "@prisma/client";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

const useProduct = ({
  id,
  query,
  queryOptions,
}: {
  id?: number;
  query?: Prisma.ProductFindFirstArgs;
  queryOptions?: Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">;
}) => {
  const product = useQuery({
    queryKey: id ? ["products", id] : ["products", query?.where],
    queryFn: async () => await getProduct({ id, query }),
    ...queryOptions,
  });

  return product;
};

export { useProduct };
