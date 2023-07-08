import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../raducer/game";

export const store = configureStore({
  reducer: {
    snake: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
