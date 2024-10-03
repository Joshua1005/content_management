"use client";

import { getCategories } from "@/actions/categories";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useCategories = (query?: Prisma.CategoryFindManyArgs) => {
  const categories = useQuery({
    queryKey: query ? ["categories", query.where] : ["categories"],
    queryFn: async () => await getCategories(query),
  });

  return categories;
};

export { useCategories };
