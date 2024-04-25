"use client";

import { CoverImageModal } from "@/_components/modal/cover-image";
import { SettingsModal } from "@/_components/modal/settings-modal";

import { NextPage } from "next";
import { useEffect, useState } from "react";

interface ModalProviderProps {}

export const ModalProvider: NextPage<ModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
