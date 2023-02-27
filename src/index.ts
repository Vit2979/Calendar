import "./css/style.css";

import { configureStore } from "@reduxjs/toolkit";
import { constants } from "./constants";
import {
  setMonthYear,
  datesSlice,
} from "./reducers";
import { renderCalendar} from "./render/calendar";

export const store = configureStore({
  reducer: {
    dates: datesSlice.reducer,
  },
});

function init() {
  const prevMonthBtn = <HTMLButtonElement>(
    document.getElementById("prev-month-btn")
  );
  const nextMonthBtn = <HTMLButtonElement>(
    document.getElementById("next-month-btn")
  );
  const todayBtn = <HTMLButtonElement>document.getElementById("today-btn"); 
  const currentMonthBtn = <HTMLButtonElement>(
    document.getElementById("current-month-btn")
  );
  const currentYearBtn = <HTMLButtonElement>(
    document.getElementById("current-year-btn")
  );
  const calendar = <HTMLElement>document.getElementById("calendar");

  store.subscribe(() => {
    const { dates } = store.getState();
    currentMonthBtn.innerHTML = constants.MONTH[dates.currentMonth];
    currentYearBtn.innerHTML = `${dates.currentYear}`;
    renderCalendar(
      calendar,
      new Date(dates.currentYear, dates.currentMonth, 1)
    );
  });
  store.dispatch(
    setMonthYear({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    })
  );
  renderCalendar(calendar);
  prevMonthBtn.addEventListener("click", () => {
    store.dispatch(setPrevMonth());
  });
  nextMonthBtn.addEventListener("click", () => {
    store.dispatch(setNextMonth());
  });
}

window.addEventListener("load", init);