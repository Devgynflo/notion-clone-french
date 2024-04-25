"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { SingleImageDropzone } from "../single-image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

interface CoverImageModalProps {}

export const CoverImageModal: NextPage<CoverImageModalProps> = ({}) => {
  const params = useParams();

  const update = useMutation(api.documents.updateDocumentById);
  const coverImageStore = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [submitting, setSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setSubmitting(false);
    coverImageStore.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImageStore.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };
  return (
    <Dialog
      open={coverImageStore.isOpen}
      onOpenChange={coverImageStore.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Image de la couverture
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          onChange={onChange}
          value={file}
          disabled={submitting}
        />
      </DialogContent>
    </Dialog>
  );
};
