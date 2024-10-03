import { getCategories } from "@/actions/categories";
import { z } from "zod";

const zodSchema = {
  product: z.object({
    name: z.string().min(1, { message: "Product name is required." }),
    description: z
      .string()
      .min(1, { message: "Product description is required." })
      .max(198, { message: "Maximum character is 198." }),
    thumbnail: z.string().min(1, { message: "Thumbnail is required." }),
    priceCents: z
      .string()
      .transform((priceCents) => parseFloat(priceCents))
      .or(z.number()),
    stocks: z
      .string()
      .transform((stocks) => parseFloat(stocks))
      .or(z.number()),
    keywords: z.array(z.string()),
    images: z.array(z.string()),
    categoryName: z.string().refine(async (categoryName) => {
      const categories = await getCategories();
      const categoryNames = categories.map((category) => category.name);

      return categoryNames.includes(categoryName);
    }),
  }),
};

export default zodSchema;
