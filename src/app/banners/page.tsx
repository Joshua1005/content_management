import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BannersPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Hero Banners</h1>
        <p className="text-muted-foreground">
          Create, edit, and delete hero banners for your website.
        </p>
      </div>
      <div className="mb-8">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Create New Banner
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Summer Sale</CardTitle>
            <CardDescription>Huge discounts on all products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                src="/placeholder.svg"
                width={640}
                height={360}
                alt="Summer Sale Banner"
                className="rounded-md object-cover"
                style={{ aspectRatio: "640/360" }}
              />
              <Button>Shop Now</Button>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="icon" variant="outline">
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button size="icon" variant="outline">
                <EditIcon className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Updated: 2023-06-01
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BannersPage;
