"use server";

import { db } from "@/lib/prisma";

const getProducts = async () => {
  try {
    const products = await db.product.findMany({});

    return products;
  } catch (error) {
    throw error;
  }
};

export { getProducts };
