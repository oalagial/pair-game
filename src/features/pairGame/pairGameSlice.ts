import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PairGameState } from "../../pairGameTypes";

const initialState: PairGameState = {
  nickname: "",
  lifes: 3,
  level: 1,
};

const pairGameSlice = createSlice({
  name: "pairGame",
  initialState,
  reducers: {
    initializeActivePlayer: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
      state.lifes = 3;
      state.level = 1;
    },
    dicreaseLife: (state, action: PayloadAction<number>) => {
      state.lifes -= action.payload;
    },
    increaseLevel: (state, action: PayloadAction<number>) => {
      state.level += action.payload;
    },
  },
});

export const { initializeActivePlayer, dicreaseLife, increaseLevel } =
  pairGameSlice.actions;

export default pairGameSlice.reducer;
