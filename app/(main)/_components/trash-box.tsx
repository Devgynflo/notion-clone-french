"use client";

import { ConfirmModal } from "@/_components/modal/confirm-modal";
import { Spinner } from "@/_components/spinner";
import { Input } from "@/_components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TrashBoxProps {}

export const TrashBox: NextPage<TrashBoxProps> = ({}) => {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restauration de la note ...",
      success: "Note restaurée",
      error: "Erreur lors de la restauration de la note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Suppresion du document...",
      success: "Document supprimé",
      error: "Erreur lors de la suppression du document",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="size-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filtrer par titre"
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-center text-muted-foreground pb-2">
          Aucun document(s) trouvé(s).
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 transition dark:hover:bg-neutral-600"
                onClick={(e) => onRestore(e, document._id)}
              >
                <Undo className="size-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 transition dark:hover:bg-neutral-600"
                >
                  <Trash className="size-4 text-muted-foreground " />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
