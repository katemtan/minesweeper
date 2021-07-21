import { createSlice } from '@reduxjs/toolkit';
import GameBoard from './GameBoard';

const initialState = {
  board: new GameBoard().board,
  gameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      console.log('new game being made', state);
      const gb = new GameBoard().board;
      state.board = gb;
      state.gameOver = false;
    },
    revealTile: (state, action) => {
        console.log('action?', action);
        console.log('dispatched reveal?', state);
        const { row, col } = action.payload;
        if (state.board[row][col].bomb) {
            state.gameOver = true;
            new GameBoard().revealAll(state.board);
        } else if (!state.board[row][col].revealed) {
            new GameBoard().revealTile(state.board, row, col);
        }
        // state.board[row][col].revealed = true;
        // new GameBoard().revealAdjacent(state.board, row, col);
        // state.board[action.payload.row][action.payload.col].revealed = true;
        // state.board = newBoard;
        state.board = state.board;
    },
    flagTile: (state, action) => {
        console.log('dispatched flag?')
        state.board[action.payload.row][action.payload.col].flagged = true;
    },
  },
});

export const { newGame, revealTile, flagTile } = gameSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGameBoard = (state) => {
    console.log('state?', state);
    return state.game.board
};

export const selectGameOver = (state) => state.game.gameOver;

export default gameSlice.reducer;
