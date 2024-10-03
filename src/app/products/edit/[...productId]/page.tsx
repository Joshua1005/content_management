"use client";

import { useProduct } from "@/hooks/products/use-product";

interface EditProductPageProps {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const EditProductPage = ({ params }: EditProductPageProps) => {
  const { productId } = params;
  const id = parseInt(productId[0]);
  const product = useProduct({ id });

  if (!product.data) return <div>Product not found.</div>;

  return <div>{product.data?.name}</div>;
};

export default EditProductPage;
