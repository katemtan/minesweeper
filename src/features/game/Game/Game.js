import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tile } from '../Tile/Tile';
import { selectGameBoard, newGame, selectGameState, selectFlags } from '../gameSlice';
import { startTimer, stopTimer, selectTime } from '../../timer/timerSlice';
import '../game.css';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { startingBombs } from '../../../consts';

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
        <div>{`${Math.max(0, startingBombs - flags)} Bombs Remaining`}</div>
        <div className="game-tiles">
            {
                board.map((row, i) => <div key={`row-${i}`}>
                    {
                        row.map((col, j) => 
                            <Tile key={`tile-${i}-${j}`} row={i} col={j} {...col} />
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