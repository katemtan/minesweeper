import GameBoard from "./GameBoard";

it('creates a game board', () => {
    const gb = new GameBoard().newGameBoard(7, 7);
    expect(gb.length).toBe(7);
    expect(gb[0].length).toBe(7);
});

it('plants bombs', () => {
    const gb = new GameBoard();
    const board = gb.newGameBoard(7, 7);
    gb.placeBombs(board, 10);
    let count = 0;
    for(let i=0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if (board[i][j].bomb) {
                count++;
            }
        }
    }
    expect(count).toBe(10);
});

it ('finds neighbours', () => {
    const gb = new GameBoard();
    const board = gb.newGameBoard(7, 7);
    const neighbours = gb.neighbours(board, 2, 2);
    expect(neighbours.length).toBe(8);
    const cornerNeighbours = gb.neighbours(board, 0, 0);
    expect(cornerNeighbours.length).toBe(3);
    expect(cornerNeighbours.filter(t => t.row === 0 && t.col === 1).length).toBe(1);
    expect(cornerNeighbours.filter(t => t.row === 1 && t.col === 1).length).toBe(1)
    expect(cornerNeighbours.filter(t => t.row === 1 && t.col === 0).length).toBe(1)
});

it('reveals tile & adjacent tiles', () => {
    const gb = new GameBoard();
    let board = gb.newGameBoard(3, 3);
    board[0][0].bomb = true;
    board = gb.revealTile(board, 1, 1);
    expect(board[0][0].revealed).toBe(false);
    expect(board[0][1].revealed).toBe(true);
    expect(board[1][0].revealed).toBe(true);
    expect(board[1][1].revealed).toBe(true);
    expect(board[0][2].revealed).toBe(true);
    expect(board[1][2].revealed).toBe(true);
    expect(board[2][0].revealed).toBe(true);
    expect(board[2][1].revealed).toBe(true);
    expect(board[2][2].revealed).toBe(true);
})