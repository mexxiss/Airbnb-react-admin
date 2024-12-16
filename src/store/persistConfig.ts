import { create } from "zustand";
import { persist } from "zustand/middleware";

// Example of setting up persistence for another store if needed
export const useSettingsStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () =>
        set((state: any) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "settings", // key to persist data
    }
  )
);
