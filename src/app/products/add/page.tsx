"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddPage = () => {
  return (
    <div className="container mx-auto mt-8 space-y-4 md:space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <ArrowLeftIcon className="size-4" />
          </Link>
          <h3 className="font-semibold">Go back</h3>
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
          <Button size="sm">Save Product</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <div className="col-span-1 space-y-4 md:col-span-2 md:space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="">
                <div>
                  <Label>Name</Label>
                  <Input placeholder="Ergonomic Granite Mouse" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea className="min-h-24" />
                </div>
                <div>
                  <Label>Keywords</Label>
                  <Input />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Price</Label>
                    <Input type="number" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <form action="" className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Barcode</Label>
                  <Input />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input type="number" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Image
                  src="/placeholder.svg"
                  alt=""
                  width={560}
                  height={560}
                  className="rounded-md"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Image
                    src="/placeholder.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="w-full rounded-md"
                  />
                  <Image
                    src="/placeholder.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="w-full rounded-md"
                  />
                  <div
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "images/*";
                      input.multiple = true;

                      input.click();
                    }}
                    className="flex size-full cursor-pointer items-center justify-center rounded-md border border-dashed"
                  >
                    <PlusIcon className="size-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
