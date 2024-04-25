"use client";

import { NextPage } from "next";
import Image from "next/image";

import { Button } from "@/_components/ui/button";
import emptyDarkImage from "@/public/empty-dark.png";
import emptyImage from "@/public/empty.png";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DocumentsProps {}

const DocumentsPage: NextPage<DocumentsProps> = ({}) => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = async () => {
    const promise = create({ title: "New Document" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Création du document...",
      success: "Document crée",
      error: "Erreur lors de la création du document",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src={emptyImage}
        alt="Empty"
        className="dark:hidden"
        height={300}
        width={300}
      />
      <Image
        src={emptyDarkImage}
        alt="Empty"
        className="hidden dark:block"
        height={300}
        width={300}
      />
      <h2 className="text-lg font-medium line-clamp-1">
        Bienvenue {user?.firstName}&apos;s Notion.
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="size-4 mr-2" />
        Créee une note
      </Button>
    </div>
  );
};

export default DocumentsPage;
