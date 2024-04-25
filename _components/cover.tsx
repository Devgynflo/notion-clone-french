"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImageStore = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });

    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
  };

  return (
    <div
      className={cn(
        "relative h-[35vh] w-full group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImageStore.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="size-4 mr-2" />
            Modifier la couverture
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="size-4 mr-2" />
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
