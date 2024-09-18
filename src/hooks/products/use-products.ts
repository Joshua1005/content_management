"use client";

import { getProducts } from "@/actions/products";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  return products;
};

export { useProducts };
