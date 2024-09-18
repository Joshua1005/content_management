"use client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardIcon,
  GlobeIcon,
  LockIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import React, { useState } from "react";

const methodColors = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
};

interface EndpointCardProps extends APIEndpoint {}

const EndpointCard = ({
  method,
  path,
  description,
  access,
}: EndpointCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  return (
    <div className="flex items-center justify-between gap-8 rounded-md border p-6">
      <div>
        <Badge className={cn(methodColors[method])}>{method}</Badge>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm">{path}</h3>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(path);

              toast({
                title: "Copied to Clipboard!",
                description:
                  "The path has been successfully copied. You can now paste it where needed.",
              });
            }}
            size="icon"
            variant="ghost"
          >
            <ClipboardIcon className="size-3" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="text-xs">
              <span>{isOpen ? "Hide" : "Show"} Example</span>
              {isOpen ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <pre className="rounded-md bg-muted p-4">
              <code className="text-sm"></code>
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div>
        <Badge variant={access === "public" ? "secondary" : "destructive"}>
          {access === "public" ? (
            <>
              <GlobeIcon className="mr-1 size-3" />
              <span>Public</span>
            </>
          ) : (
            <>
              <LockIcon className="mr-1 size-3" />
              <span>Admin</span>
            </>
          )}
        </Badge>
      </div>
    </div>
  );
};

export { EndpointCard };
