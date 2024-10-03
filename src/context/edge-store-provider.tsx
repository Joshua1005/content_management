"use client";

import { EdgeStoreRouter } from "@/app/api/edgestore/[...edgestore]/core";
import { createEdgeStoreProvider } from "@edgestore/react";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

const EdgeProvider = ({ children }: { children: React.ReactNode }) => {
  return <EdgeStoreProvider>{children}</EdgeStoreProvider>;
};

export { EdgeStoreProvider, useEdgeStore, EdgeProvider };
