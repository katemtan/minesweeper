import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    timeStart: Date.now(),
    running: true,
    time: 0,
};

export const timerSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startTimer: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
        state.time = 0;
        state.running = true;
    },
    stopTimer: (state) => {
        state.running = false;
    },
    setTime: (state) => {
        if (state.running) {
            state.time ++;
        }
    }
  },
});

export const { startTimer, stopTimer, setTime } = timerSlice.actions;

export const selectTimeStart = (state) => state.timer.timeStart;
export const selectTimerRunning = (state) => state.timer.running;
export const selectTime = (state) => state.timer.time;


export default timerSlice.reducer;
