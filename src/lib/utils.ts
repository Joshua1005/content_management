import { isServer, QueryClient } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) return new QueryClient();

  if (!browserQueryClient) browserQueryClient = new QueryClient();

  return browserQueryClient;
};

export { cn, getQueryClient };
