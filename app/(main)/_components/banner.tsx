"use client";

import { ConfirmModal } from "@/_components/modal/confirm-modal";
import { Button } from "@/_components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  document: Doc<"documents">;
}

export const Banner: NextPage<BannerProps> = ({ document }) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: document._id }).then(() => {
      if (document.coverImage) {
        edgestore.publicFiles.delete({
          url: document.coverImage,
        });
      }
    });

    toast.promise(promise, {
      loading: "Suppression de la note...",
      success: "Note supprimée",
      error: "Erreur de suppression de la note",
    });

    router.push(`/documents`);
  };

  const onRestore = () => {
    const promise = restore({ id: document._id }).then(() =>
      router.push(`/documents/${document._id}`)
    );
    toast.promise(promise, {
      loading: "Restauration de la note",
      success: "Note restaurée",
      error: "Erreur lors de la restauration de la note",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>Cette page est mise à la corbeille.</p>
      <Button
        onClick={onRestore}
        size={"sm"}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal "
      >
        Restaurer la page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal "
        >
          Suppression définitive
        </Button>
      </ConfirmModal>
    </div>
  );
};
