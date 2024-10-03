"use client";

import { getCategory } from "@/actions/categories";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useCategory = ({
  name,
  query,
}: {
  name?: string;
  query?: Prisma.CategoryFindFirstArgs;
}) => {
  const category = useQuery({
    queryKey: ["categories", name ? name : query?.where],
    queryFn: async () => await getCategory({ name, query }),
  });

  return category;
};

export { useCategory };
