"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { ImageIcon, Smile, X } from "lucide-react";
import { NextPage } from "next";
import { ElementRef, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { IconPicker } from "./icon-picker";
import { Button } from "./ui/button";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar: NextPage<ToolbarProps> = ({ initialData, preview }) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.updateDocumentById);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setEditing(true);

    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => setEditing(false);

  const OnInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opactiy-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="size-4 mr-2" />
              Ajouter une Icône
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="size-4 mr-2" />
            Ajouter une image de couverture
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextAreaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => OnInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] :dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] :dark:text-[#CFCFCF] "
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
