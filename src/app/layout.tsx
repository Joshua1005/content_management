import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ReactQueryProvider } from "@/context/react-query-provider";
import { EdgeProvider } from "@/context/edge-store-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import "@/styles/globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <ReactQueryProvider>
          <EdgeProvider>
            <TooltipProvider>
              <Header />
              <main className="min-h-screen px-4 py-16 md:px-8">
                {children}
              </main>
              <Toaster />
            </TooltipProvider>
          </EdgeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
