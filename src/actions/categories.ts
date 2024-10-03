"use server";

import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const getCategories = async (query?: Prisma.CategoryFindManyArgs) => {
  try {
    const categories = query
      ? await db.category.findMany({ ...query })
      : await db.category.findMany({});

    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategory = async ({
  name,
  query,
}: {
  name?: string;
  query?: Prisma.CategoryFindFirstArgs;
}) => {
  try {
    const category = query
      ? await db.category.findFirst({ ...query })
      : await db.category.findUnique({ where: { name } });

    return category;
  } catch (error) {
    throw error;
  }
};

export { getCategories, getCategory };
