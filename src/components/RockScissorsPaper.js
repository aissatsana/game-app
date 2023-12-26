import React, { useState, useEffect } from 'react';
import socket from './WebSocketService';
import '../styles/rsp.css';

// const rockImage = process.env.PUBLIC_URL + '/img/rock.png';
// const paperImage = process.env.PUBLIC_URL + '/img/paper.png';
// const scissorsImage = process.env.PUBLIC_URL + '/img/scissors.png';

const choices = ['rock', 'paper', 'scissors'];


const RockScissorsPaper = ({ roomId }) => {
  const [gameState, setGameState] = useState({
    playerChoice: null,
    opponentChoice: null,
    result: null,
  });
  const [startGame, setStartGame] = useState(false);
  const [playerId, setPlayerId] = useState('');


  useEffect(() => {
    const storedPlayerId = localStorage.getItem('playerId');
    if (storedPlayerId) {
        setPlayerId(storedPlayerId);
    } else {
        const newPlayerId = generateUniqueId();
        setPlayerId(newPlayerId);
        localStorage.setItem('playerId', newPlayerId);
    }
    socket.emit('rsp/joinRoom', {roomId, playerId});
    socket.on('rsp/startGame', () => {
      console.log('игра началась');
        setStartGame(true);
    })
    socket.on('rsp/gameResult', ({resultState, winnerState}) => {
        setGameState((prevState) => ({
            ...prevState,
            opponentChoice: resultState[playerId],
            result: winnerState[playerId],
        }))
    })
  },[playerId, roomId]);

  const makeChoice = (choice) => {
    setGameState((prevState) => ({
        ...prevState,
        playerChoice: choice,
      }));
    console.log(choice, playerId);
    socket.emit('rsp/makeChoice', { choice, playerId });
    // setGameState('waitingResults');
  };

  function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15);
  }


  return (
    <div>
      {!startGame && <p>Ожидаем соперника</p>}
      {startGame && <p>Игра началась, делайте выбор</p>}
      {/* <div>
        <button onClick={() => makeChoice('rock')}>Rock</button>
        <button onClick={() => makeChoice('scissors')}>Scissors</button>
        <button onClick={() => makeChoice('paper')}>Paper</button>
      </div> */}
      <div>
        {choices.map((choice) => (
          <img
            key={choice}
            src={`/img/${choice}.png`}
            alt={choice}
            onClick={() => makeChoice(choice)}
            className='choice-image'
          />
        ))}
      </div>
      <div>
        <p>Your choice: {gameState.playerChoice}</p>
        <p>Opponent's choice: {gameState.opponentChoice}</p>
        <p>Result: {gameState.result}</p>
      </div>
    </div>
  );
};

export default RockScissorsPaper;
