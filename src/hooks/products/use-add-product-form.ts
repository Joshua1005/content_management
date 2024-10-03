"use client";

import zodSchema from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useAddProductForm = () => {
  const [keyword, setKeyword] = useState("");
  const form = useForm<Zod.infer<typeof zodSchema.product>>({
    resolver: zodResolver(zodSchema.product),
    defaultValues: {
      name: "",
      description: "",
      priceCents: 0,
      thumbnail: "",
      stocks: 0,
      keywords: [],
      images: [],
    },
  });

  return {
    keyword,
    setKeyword,
    ...form,
  };
};

export { useAddProductForm };
