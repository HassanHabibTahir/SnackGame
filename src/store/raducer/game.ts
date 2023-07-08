import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { fetchCount } from "./counterAPI";
import { IGlobalState } from "../../utilities";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

const globalState: IGlobalState = {
  //Postion of the entire snake
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score: 0,
};

export const counterSlice = createSlice({
  name: "game",
  initialState: globalState,
  reducers: {
    makeMove: (state, action) => {
      console.log("state", state);
      let newSnake = [...state.snake];
      newSnake = [
        {
          x: state.snake[0].x + action.payload[0],
          y: state.snake[0].y + action.payload[1],
        },
        ...newSnake,
      ];
      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    },

    inCreaseSnake: (state) => {
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x - 20,
            y: state.snake[snakeLen - 1].y - 20,
          },
        ],
      };
    },
    // increment: (state) => {
    //   state.value += 1;
    //   state.status = "idle";
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
  },
});

// export const { increment, ~decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;
// export const selectCount = (state: RootState) => state.counter.value;
export const { makeMove, inCreaseSnake } = counterSlice.actions;
export default counterSlice.reducer;
