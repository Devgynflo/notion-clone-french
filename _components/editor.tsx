"use client";

import "@blocknote/core/style.css";
import { NextPage } from "next";

import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: NextPage<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  /* const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  }; */

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      console.log("🚀 ~ editor:", editor)
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    //uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
