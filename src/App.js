import React from 'react';
import { Game } from './features/game/Game';
import './App.css';
import { Timer } from './features/timer/Timer';

function App() {
  return (
    <div className="App">
      <Game /> 
      <Timer />
    </div>
  );
}

export default App;
