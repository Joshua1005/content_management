"use server";

import { backendClient } from "@/app/api/edgestore/[...edgestore]/core";
import { db } from "@/lib/prisma";
import zodSchema from "@/lib/zod";
import { Prisma, Product } from "@prisma/client";

const getProducts = async (query?: Prisma.ProductFindManyArgs) => {
  try {
    const products = query
      ? await db.product.findMany({ ...query })
      : await db.product.findMany({});

    return products;
  } catch (error) {
    throw error;
  }
};

const getProduct = async ({
  id,
  query,
}: {
  id?: number;
  query?: Prisma.ProductFindFirstArgs;
}) => {
  try {
    const product = id
      ? await db.product.findUnique({ where: { id } })
      : await db.product.findFirst({ ...query });

    if (!product) throw new Error("Product not found.");

    return product;
  } catch (error) {
    throw error;
  }
};

const addProduct = async (rawProduct: Record<string, any>) => {
  try {
    const { success, error, data } = zodSchema.product.safeParse(rawProduct);

    if (!success) throw new Error(error.issues[0].message);

    const { thumbnail, images } = data;

    await Promise.all([
      backendClient.images.confirmUpload({
        url: thumbnail,
      }),
      images.map(async (image) =>
        backendClient.images.confirmUpload({ url: image }),
      ),
      db.product.create({ data }),
    ]);
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const foundProduct = await db.product.findUnique({ where: { id } });

    if (!foundProduct) throw new Error("Product not found.");

    await Promise.all([
      db.product.delete({ where: { id } }),
      backendClient.images.deleteFile({ url: foundProduct.thumbnail }),
      foundProduct.images.map(async (image) =>
        backendClient.images.deleteFile({ url: image }),
      ),
    ]);
  } catch (error) {
    throw error;
  }
};

export { getProducts, getProduct, addProduct, deleteProduct };
