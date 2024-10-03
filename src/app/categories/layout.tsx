import { getCategories } from "@/actions/categories";
import { getQueryClient } from "@/lib/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

const CategoriesLayout = async ({ children }: CategoriesLayoutProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default CategoriesLayout;
