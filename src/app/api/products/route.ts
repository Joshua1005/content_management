import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/actions/products";

const GET = async (_: NextRequest) => {
  try {
    const products = await getProducts();

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export { GET };
