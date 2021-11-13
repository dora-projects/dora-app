import create from "zustand";
import { devtools } from "zustand/middleware";
import moment from "moment";

export type Filter = {
  release?: string;
  environment?: string;
  from: number;
  to: number;
};

type FilterStore = {
  value: Filter | null;
  setFilters: (val: Filter) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterStore>(
  devtools((set) => ({
    value: {
      from: moment().startOf("day").valueOf(),
      to: moment().valueOf(),
    },
    setFilters: async (val) => {
      set({ value: val });
    },
    clearFilters: () => {
      set({ value: null });
    },
  }))
);
