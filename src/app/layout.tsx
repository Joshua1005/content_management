import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { MountainIcon, SearchIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ReactQueryProvider } from "@/context/react-query-provider";
import { db } from "@/lib/prisma";
import { generateFakeProduct } from "@/faker";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/banners", label: "Banners" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/settings", label: "Settings" },
];

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        {/* <form
          action={async () => {
            "use server";
            Array.from(
              { length: 100 },
              async () =>
                await db.product.create({ data: generateFakeProduct() }),
            );
          }}
        >
          <Button type="submit">Add</Button>
        </form> */}
        <ReactQueryProvider>
          <header className="fixed inset-x-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-8">
            <section className="flex items-center gap-4">
              <MountainIcon className="size-7" />
              <div className="block w-[100px] md:hidden"></div>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {links.map((link) => (
                    <NavigationMenuItem
                      key={link.href}
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      <NavigationMenuLink href={link.href}>
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </section>
            <section className="flex items-center gap-2">
              <div className="relative">
                <Input className="pl-10" placeholder="Search products" />
                <div className="absolute left-0 top-0 flex h-full items-center justify-center border-r px-2">
                  <SearchIcon className="size-4" />
                </div>
              </div>
              <div>
                <Avatar>
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
              </div>
            </section>
          </header>
          <main className="min-h-screen px-4 py-16 md:px-8">{children}</main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
