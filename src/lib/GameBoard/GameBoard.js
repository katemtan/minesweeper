export default class GameBoard {
    constructor(height=16, width=16) {
        this.board = [];
        this.height = height;
        this.width = width;
    }

    newGameBoard() {
        const board = [];
        for (var i=0; i<this.height; i++) {
            board[i] = [];
            for (var j=0; j < this.width; j++) {
                board[i][j] = {
                    revealed: false,
                    flagged: false,
                    bomb: false,
                    adjacentBombs: 0,
                    row: i,
                    col: j,
                }
            }
        }
        return board;
    }

    placeBombs(board, bombs=40, initialRow=0, initialCol=0) {
        let bombsPlaced = 0;
        while (bombsPlaced < bombs) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            if (!board[y][x].bomb && (y !== initialRow || x !== initialCol)) {
                board[y][x].bomb = true;
                bombsPlaced++;
            }
        }
        this.setAdjacentBombs(board);
        return board;
    }

    setAdjacentBombs(board) {
        for (var i=0; i<this.height; i++) {
            for (var j=0; j < this.width; j++) {
                if (!board[i][j].bomb) {
                    const neighbours = this.neighbours(board, i, j);
                    board[i][j].adjacentBombs = neighbours.reduce((prev, n) => {
                        if (n.bomb) {
                            return prev + 1;
                        }
                        return prev;
                    }, 0);
                }
            }
        }
        return board;
    }

    neighbours(board, row, col) {
        const neighbours = [];
        const rowMin = Math.max(0, row - 1);
        const rowMax = Math.min(this.height - 1, row + 1);
        const colMin = Math.max(0, col - 1);
        const colMax = Math.min(this.width - 1, col + 1);
        for(let i=rowMin; i <= rowMax; i++) {
            for(let j = colMin; j <= colMax; j++) {
                if (i !== row || j !== col) {
                    neighbours.push(board[i][j]);
                }
            }
        }
        return neighbours;
    }

    revealTile(board, row, col) {
        board[row][col].revealed = true;
        if (board[row][col].adjacentBombs === 0) {
            this.revealAdjacent(board, row, col);
        }
        return board;
    }

    revealAdjacent(board, row, col) {
        const neighbours = this.neighbours(board, row, col);
        neighbours.forEach(n => {
            if(!n.flagged && !n.revealed && !n.bomb) {
                n.revealed = true;
                if (n.adjacentBombs === 0) {
                    this.revealAdjacent(board, n.row, n.col);
                }
            }
        });
        return board;
    }

    revealAll(board) {
        for(let i=0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                board[i][j].revealed = true;
            }
        }
        return board;
    }

    gameWon(board) {
        return !(board.filter(row => row.filter(col => !col.revealed && !col.bomb).length).length);
    }
}