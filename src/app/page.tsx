import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateFakeProduct } from "@/faker";
import { db } from "@/lib/prisma";
import {
  DollarSignIcon,
  LineChartIcon,
  User2Icon,
  WalletIcon,
} from "lucide-react";

const categories = [
  {
    name: "Clothing",
    subCategories: [
      { name: "Apparel Accessories" },
      { name: "Baby and Childrendswear" },
      { name: "Footwear" },
      { name: "Handbags, Purses and Wallets" },
    ],
  },
  {
    name: "Electronics",
    subCategories: [
      { name: "Computer Accessories" },
      { name: "Laptops and Notebooks" },
      { name: "Smartphones and Mobile Devices" },
      { name: "Desktop Computers" },
    ],
  },
  {
    name: "Home",
    subCategories: [
      { name: "Furniture" },
      { name: "Household Appliances" },
      { name: "Household Cleaners" },
      { name: "Do It Yourself" },
    ],
  },
];

const cards = [
  { title: "Total Revenue", icon: DollarSignIcon },
  { title: "Subscriptions", icon: User2Icon },
  { title: "Sales", icon: WalletIcon },
  { title: "Active Now", icon: LineChartIcon },
];

const Homepage = () => {
  return (
    <div className="grid gap-8 pt-8">
      <div className="grid grid-cols-4 gap-8">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  {card.title}
                  <card.icon className="size-4 text-muted-foreground" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-xl font-extrabold">$45,231.89</div>
                <div className="text-xs text-muted-foreground">
                  +20.1% from last month
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <form
          action={async () => {
            "use server";

            await db.product.create({ data: generateFakeProduct() });
          }}
        >
          <Button>Add</Button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
