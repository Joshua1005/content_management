import { faker } from "@faker-js/faker";
import { Product } from "@prisma/client";

const generateFakeProduct = (): Omit<Product, "id"> => {
  const stocks = faker.number.int({ min: 0, max: 100 });

  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    thumbnail: faker.image.urlPlaceholder(),
    images: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
      faker.image.urlPlaceholder(),
    ),
    priceCents: parseInt(faker.commerce.price({ min: 100, max: 9999 })),
    stocks,
    onStock: stocks > 0 ? true : false,
    keywords: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
      faker.commerce.productAdjective(),
    ),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    categoryId: faker.number.int({ min: 1, max: 6 }),
  };
};

export { generateFakeProduct };
