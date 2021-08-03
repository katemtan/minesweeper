import { createSlice } from '@reduxjs/toolkit';
import { startingBombs, gameSize } from '../../consts';
import GameBoard from '../../lib/GameBoard/GameBoard';

const initialState = {
  board: new GameBoard().newGameBoard(gameSize, gameSize),
  flags: 0,
  bombsPlaced: false,
  gameState: 'playing',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      const gb = new GameBoard().newGameBoard(gameSize, gameSize);
      state.board = gb;
      state.flags = 0;
      state.bombsPlaced = false;
      state.gameState = 'playing';
    },
    revealTile: (state, action) => {
      if (state.gameState === 'playing') {
        const { row, col } = action.payload;
        let newBoard = state.board;
        const gb = new GameBoard();
        if (!state.bombsPlaced) {
          state.board = gb.placeBombs(state.board, startingBombs,  row, col);
          state.bombsPlaced = true;
        }
        if (state.board[row][col].bomb) {
            state.gameState = 'gameOver';
            newBoard = gb.revealAll(state.board);
        } else if (!state.board[row][col].revealed) {
            newBoard = gb.revealTile(state.board, row, col);
            // Check if all non-bomb tiles were revealed
            if(gb.gameWon(state.board)) {
              state.gameState = 'gameWon';
            }
        }
        state.board = newBoard;
      }
    },
    flagTile: (state, action) => {
        state.board[action.payload.row][action.payload.col].flagged = true;
        state.flags += 1;
    },
  },
});

export const { newGame, revealTile, flagTile } = gameSlice.actions;
export const selectGameBoard = (state) => state.game.board;
export const selectGameState = (state) => state.game.gameState;
export const selectFlags = (state) => state.game.flags;
export default gameSlice.reducer;
