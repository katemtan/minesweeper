import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/game/gameSlice';
import timerReducer from '../features/timer/timerSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    timer: timerReducer,
  },
});
