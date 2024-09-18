import { getProducts } from "@/actions/products";
import { getQueryClient } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

const ProductsLayout = async ({ children }: ProductsLayoutProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getProducts();

      return products;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ProductsLayout;
