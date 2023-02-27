import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DateState {
  currentMonth: number;
  currentYear: number;
}

export type MonthYear = {
  month: number;
  year: number;
};

const initialState: DateState = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
};

export const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    setMonthYear: {
      reducer: (state, action: PayloadAction<MonthYear>) => {
        state.currentMonth = action!.payload.month;
        state.currentYear = action!.payload.year;
      },
      prepare: (value) => ({
        payload: { ...value },
      }),
    },
  },
});

const { actions } = datesSlice;
export const { setMonthYear } = actions;