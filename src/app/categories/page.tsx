"use client";

import { CategoryCard } from "@/components/categories/category-card";
import { useCategories } from "@/hooks/categories/use-categories";

const CategoriesPage = () => {
  const categories = useCategories();

  return (
    <main className="flex-1 px-4 py-8 md:px-6">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Product Categories</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories?.data?.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;
