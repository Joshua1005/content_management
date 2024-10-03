"use client";

import { getProduct } from "@/actions/products";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useProduct = ({
  id,
  query,
}: {
  id?: number;
  query?: Prisma.ProductFindFirstArgs;
}) => {
  const product = useQuery({
    queryKey: id ? ["products", id] : ["products", query?.where],
    queryFn: async () => await getProduct({ id, query }),
  });

  return product;
};

export { useProduct };
