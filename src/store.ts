import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading";

import { models, RootModel } from "./models";

type FullModel = ExtraModelsFromLoading<RootModel, { type: "full" }>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin({ type: "full" })],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
