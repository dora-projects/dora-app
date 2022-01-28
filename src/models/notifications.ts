import { createModel } from "@rematch/core";
import { nanoid } from "nanoid";

import type { RootModel } from ".";

type Notification = {
  id?: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
};

const questions = createModel<RootModel>()({
  state: [] as Notification[],
  reducers: {
    add: (state, payload: Notification) => {
      return [...state, { ...payload, id: nanoid() }];
    },
    dismiss: (state, payload: string) => {
      return state.filter((notification) => notification.id !== payload);
    },
  },
});

export default questions;
