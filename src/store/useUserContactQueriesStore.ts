import { create } from "zustand";
import { Query } from "../types/contactQueries";

interface UserContactQueriesState {
    queries: Query[];
    setQueries: (queries: Query[]) => void;
    addQuery: (query: Query) => void;
    removeQuery: (id: string) => void;
    updateQuery: (query: Query) => void;
}

const useUserContactQueriesStore = create<UserContactQueriesState>(
    (set) => ({
        queries: [],
        setQueries: (queries: Query[]) => set({ queries }),
        addQuery: (query: Query) => set((state) => ({ queries: [...state.queries, query] })),
        removeQuery: (id: string) => set((state) => ({ queries: state.queries.filter((q) => q._id !== id) })),
        updateQuery: (query: Query) => set((state) => ({
            queries: state.queries.map((q) => (q._id === query._id? query : q))
        })),
    })
);

export default useUserContactQueriesStore;