"use client";

import { getQueryClient } from "@/lib/utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [client] = useState(() => getQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export { ReactQueryProvider };
