import { create } from "zustand";

export type SettingsStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSettings = create<SettingsStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
