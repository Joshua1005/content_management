"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductKeywordCardProps extends React.HTMLAttributes<HTMLDivElement> {
  keyword: string;
}

const ProductKeywordCard = ({
  keyword,
  className,
  onClick,
  ...props
}: ProductKeywordCardProps) => {
  return (
    <Card>
      <CardContent className={cn("relative p-2", className)} {...props}>
        <div className="text-sm text-muted-foreground">{keyword}</div>
        <div
          onClick={onClick}
          className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-pointer"
        >
          <CircleXIcon className="size-4 text-destructive" />
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductKeywordCard };
