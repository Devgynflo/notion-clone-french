"use client";

import { ModeToggle } from "@/_components/mode-toggle";
import { Dialog, DialogContent, DialogHeader } from "@/_components/ui/dialog";
import { Label } from "@/_components/ui/label";
import { useSettings } from "@/hooks/use-settings";
import { NextPage } from "next";

interface SettingsModalProps {}

export const SettingsModal: NextPage<SettingsModalProps> = ({}) => {
  const { isOpen, onClose } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 text-lg font-medium>
            Paramètres
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Apparence</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Personnaliser l&apos;apparence de Notion sur votre appareil
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
