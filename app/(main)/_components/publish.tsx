"use client";

import { Button } from "@/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish: NextPage<PublishProps> = ({ initialData }) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.updateDocumentById);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing",
      success: "Note Published",
      error: "Failed to publish note",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Dissimulation de la note",
      success: "Note Dissimulée",
      error: "Erreur lors de la dissimulation de la note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          Publier{" "}
          {initialData.isPublished && (
            <Globe className="text-sky-500 ml-2 size-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse size-4" />
              <p>Cette note est publique</p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Dissimuler
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="size-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publier cette note</p>
            <span className="text-sx text-muted-foreground mb-4">
              Partagez votre travail avec les autres.
            </span>
            <Button
              onClick={onPublish}
              disabled={isSubmitting}
              className="w-full text-xs"
              size={"sm"}
            >
              Publier
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
