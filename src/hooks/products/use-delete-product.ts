"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteProduct as serverActionDeleteProduct } from "@/actions/products";

interface UseDeleteProductProps
  extends Omit<
    UseMutationOptions<
      Awaited<ReturnType<typeof serverActionDeleteProduct>>,
      Error,
      number
    >,
    "mutationFn"
  > {}

const useDeleteProduct = ({ ...options }: UseDeleteProductProps) => {
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => await serverActionDeleteProduct(id),
    ...options,
  });

  return deleteProduct;
};

export { useDeleteProduct };
