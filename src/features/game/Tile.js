import React from 'react';
import { useDispatch } from 'react-redux';
import { flagTile, revealTile } from './gameSlice';
import './game.css';
import { Button } from '@material-ui/core';

export function Tile(props) {
    const { revealed, flagged, row, col, adjacentBombs } = props;
    const dispatch = useDispatch();
    const pos = {
        row,
        col,
    }
    const content = props.bomb ? <span>💣</span> : adjacentBombs > 0 ? adjacentBombs : ' ';
    return <Button 
        variant={`${revealed ? 'outlined' : 'contained'}`}
        className={`game-tile adj-${adjacentBombs} ${revealed ? 'revealed' : 'hidden'}`}
        onClick={() => dispatch(revealTile(pos))}
        onContextMenu={(e) => {dispatch(flagTile(pos)); e.preventDefault();}}>
            { revealed ? content : flagged ? <span>🚩</span> : ' '}
        </Button>
}