import { configureStore } from "@reduxjs/toolkit";
import pairGameReducer from "../features/pairGame/pairGameSlice";
import { PairGameState } from "../pairGameTypes";

export interface RootState {
  pairGame: PairGameState;
}

export const store = configureStore({
  reducer: {
    pairGame: pairGameReducer,
  },
});
