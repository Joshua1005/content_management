import { ProductForm } from "@/components/products/product-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const AddPage = () => {
  return (
    <div className="container mx-auto mt-8 space-y-4 md:space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" }),
                )}
              >
                <ArrowLeftIcon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="block sm:hidden">Go back</TooltipContent>
            <h3 className="hidden font-semibold sm:block">Go back</h3>
          </Tooltip>
        </div>
        <div className="flex gap-2">
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "destructive", size: "sm" }),
            )}
          >
            Discard
          </Link>
          <Button size="sm">Save as draft</Button>
        </div>
      </div>
      <ProductForm />
    </div>
  );
};

export default AddPage;
