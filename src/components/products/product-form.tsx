"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { useAddProductForm } from "@/hooks/products/use-add-product-form";
import { useAddProduct } from "@/hooks/products/use-add-product";
import { useImagesDropzone } from "@/hooks/dropzone/use-images-dropzone";
import { useImageDropzone } from "@/hooks/dropzone/use-image-dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { ProductKeywordCard } from "./product-keyword-card";
import { ProductThumbnailDropzone } from "./product-thumbnail-dropzone";
import { ProductImagesDropzone } from "./product-images-dropzone";

const ProductForm = () => {
  const queryClient = useQueryClient();
  const addProductForm = useAddProductForm();
  const imagesDropzone = useImagesDropzone({
    onUploadImages: (images) => addProductForm.setValue("images", images),
  });
  const thumbnailDropzone = useImageDropzone({
    onUploadImage: (image) => {
      addProductForm.clearErrors("thumbnail");
      addProductForm.setValue("thumbnail", image);
    },
  });

  const addProduct = useAddProduct({
    onSuccess: () => {
      addProductForm.reset();
      addProductForm.setKeyword(() => "");
      thumbnailDropzone.resetImageDropzone();
      imagesDropzone.resetImagesDropzone();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <Form {...addProductForm}>
      <form
        onSubmit={addProductForm.handleSubmit((values) =>
          addProduct.mutate({
            ...values,
            images: imagesDropzone.images,
            thumbnail: thumbnailDropzone.image,
          }),
        )}
        className="grid grid-cols-1 gap-8 sm:grid-cols-4"
      >
        <div className="col-span-2 lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <FormField
                  name="name"
                  control={addProductForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          A name for your product.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="description"
                  control={addProductForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-24" />
                        </FormControl>
                        <FormDescription>
                          Describe what product is your selling.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    name="priceCents"
                    control={addProductForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={1} />
                          </FormControl>
                          <FormDescription>
                            The price for your product.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="stocks"
                    control={addProductForm.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Stocks</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min={0} />
                          </FormControl>
                          <FormDescription>
                            How many stock this product currently have?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  name="keywords"
                  control={addProductForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <div
                          className={cn(
                            addProductForm.getValues("keywords").length
                              ? "flex flex-wrap gap-2 py-2"
                              : "hidden",
                          )}
                        >
                          {addProductForm
                            .getValues("keywords")
                            .map((keyword, index) => (
                              <ProductKeywordCard
                                key={index}
                                keyword={keyword}
                                onClick={() => {
                                  const newKeywords = addProductForm
                                    .getValues("keywords")
                                    .toSpliced(index, 1);

                                  addProductForm.setValue("keywords", [
                                    ...newKeywords,
                                  ]);
                                }}
                              />
                            ))}
                        </div>
                        <FormControl>
                          <Input
                            {...{
                              ...field,
                              value: addProductForm.keyword,
                              onChange: (e) =>
                                addProductForm.setKeyword(e.target.value),
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addProductForm.setValue("keywords", [
                                    ...field.value,
                                    addProductForm.keyword,
                                  ]);

                                  addProductForm.setKeyword(() => "");
                                }
                              },
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Type and enter to create keyword, keywords are useful
                          for SEO.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <FormField
                  name="thumbnail"
                  control={addProductForm.control}
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                          <ProductThumbnailDropzone {...thumbnailDropzone} />
                        </FormControl>
                        <FormDescription>
                          A thumbnail for your product.
                        </FormDescription>
                        <FormMessage>{thumbnailDropzone.error}</FormMessage>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="images"
                  control={addProductForm.control}
                  render={() => {
                    return (
                      <FormItem>
                        <FormLabel>Images</FormLabel>
                        <FormControl>
                          <ScrollArea>
                            <ProductImagesDropzone {...imagesDropzone} />
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </FormControl>
                        <FormDescription>
                          Images of your product.
                        </FormDescription>
                        <FormMessage>{imagesDropzone.error}</FormMessage>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Button disabled={addProduct.isPending} type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
};

export { ProductForm };
