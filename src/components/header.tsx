import { MountainIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/banners", label: "Banners" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/orders", label: "Orders" },
  { href: "/settings", label: "Settings" },
];

const Header = () => {
  return (
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
            <AvatarImage src="placeholder.svg" />
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </header>
  );
};

export { Header };
