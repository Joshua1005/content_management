"use client";

import { addProduct as serverActionAddProduct } from "@/actions/products";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface UseAddProductProps
  extends Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof serverActionAddProduct>>,
      Error,
      Record<string, any>
    >,
    "mutationFn"
  > {}

const useAddProduct = ({ ...options }: UseAddProductProps) => {
  const addProduct = useMutation({
    mutationFn: async (product: Record<string, any>) =>
      await serverActionAddProduct(product),
    ...options,
  });

  return addProduct;
};

export { useAddProduct };
