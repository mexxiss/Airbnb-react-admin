import { create } from "zustand";
import { FurnishingResponseInvoice } from "../types/furnishingTypes";

interface InvoiceStore {
  currentInvoice: FurnishingResponseInvoice | null;
  setCurrentInvoice: (invoice: FurnishingResponseInvoice) => void;
  clearCurrentInvoice: () => void;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  currentInvoice: null,
  setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
  clearCurrentInvoice: () => set({ currentInvoice: null }),
}));
