import { createSlice } from '@reduxjs/toolkit';
import GameBoard from './GameBoard';

const initialState = {
  board: new GameBoard().newGameBoard(),
  gameOver: false,
  flags: 0,
  bombsPlaced: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      const gb = new GameBoard().newGameBoard();
      state.board = gb;
      state.gameOver = false;
      state.flags = 0;
      state.bombsPlaced = false;
    },
    revealTile: (state, action) => {
        const { row, col } = action.payload;
        let newBoard = state.board;
        const gb = new GameBoard();
        if (!state.bombsPlaced) {
          state.board = gb.placeBombs(state.board, 40,  row, col);
          state.bombsPlaced = true;
        }
        if (state.board[row][col].bomb) {
            state.gameOver = true;
            newBoard = gb.revealAll(state.board);
        } else if (!state.board[row][col].revealed) {
            newBoard = gb.revealTile(state.board, row, col);
        }
        state.board = newBoard;
    },
    flagTile: (state, action) => {
        state.board[action.payload.row][action.payload.col].flagged = true;
        state.flags += 1;
    },
  },
});

export const { newGame, revealTile, flagTile } = gameSlice.actions;

export const selectGameBoard = (state) => state.game.board;
export const selectGameOver = (state) => state.game.gameOver;
export const selectFlags = (state) => state.game.flags;


export default gameSlice.reducer;
