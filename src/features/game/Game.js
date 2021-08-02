import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tile } from './Tile';
import { selectGameBoard, newGame, selectGameState, selectFlags } from './gameSlice';
import { startTimer, stopTimer, selectTime } from '../timer/timerSlice';
import './game.css';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export function Game(props) {
    const board = useSelector(selectGameBoard);
    const gameState = useSelector(selectGameState);
    const flags = useSelector(selectFlags);
    const time = useSelector(selectTime);
    const dispatch = useDispatch();
    const handleNewGame = () => {
        dispatch(newGame());
        dispatch(startTimer());
    }
    useEffect(() => {
        function handleGameState() {
            if (gameState === 'gameOver' || gameState === 'gameWon') {
                dispatch(stopTimer());
            }
        }
        handleGameState();
    }, [gameState, dispatch])
    return <Typography component="div" className="board">
        <div>{`${Math.max(0, 40 - flags)} Bombs Remaining`}</div>
        <div className="game-tiles">
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
        </div>
        <Button variant="contained" color="primary" onClick={handleNewGame}>New Game</Button>
        {
            gameState === 'gameOver' && <h1>Game Over <span>😿</span></h1>
        }
        {
            gameState === 'gameWon' && <h1>You win! <span>🎉</span> Time: {time} seconds</h1>
        }
    </Typography>;
}