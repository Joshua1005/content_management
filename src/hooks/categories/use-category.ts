"use client";

import { getCategory } from "@/actions/categories";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useCategory = ({
  id,
  query,
}: {
  id?: number;
  query?: Prisma.CategoryFindFirstArgs;
}) => {
  const category = useQuery({
    queryKey: ["categories", id ? id : query?.where],
    queryFn: async () => await getCategory({ id, query }),
  });

  return category;
};

export { useCategory };
