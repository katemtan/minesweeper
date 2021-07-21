import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tile } from './Tile';
import { selectGameBoard, newGame, selectGameOver } from './gameSlice';
import './game.css';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export function Game(props) {
    const board = useSelector(selectGameBoard);
    const gameOver = useSelector(selectGameOver);
    console.log('board?', board);
    const dispatch = useDispatch();
    return <Typography component = "div" className="board">
        <Button variant="contained" color="primary" onClick={() => dispatch(newGame())}>New Game</Button>
        {
            board.map((row, i) => <div>
                {
                    row.map((col, j) => 
                        <Tile row={i} col={j} {...col} />
                        )
                }
            </div>
            )
        }
        {
            gameOver && <h1>Game Over :(</h1>
        }
    </Typography>;
}