import React, { useState, useEffect } from 'react';
import socket from './WebSocketService';
import '../styles/tictac.css';


const TicTacToe = ({roomId}) => {  

  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(() => initialBoard);
  const [gameOver, setGameOver] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [playerRole, setPlayerRole] = useState(localStorage.getItem('playerRole') || '');
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    const storedPlayerId = localStorage.getItem('playerId');

    if (storedPlayerId) {
      setPlayerId(storedPlayerId);
      socket.emit('tictac/getPlayerInfo', { roomId, playerId: storedPlayerId });
      socket.on('tictac/playerInfo', ({ board, currentPlayer, playerRole }) => {
        setBoard(board);
        setCurrentPlayer(currentPlayer);
        setPlayerRole(playerRole);
        setIsPlayerTurn(playerRole === currentPlayer);
      });
    } else {
      const newPlayerId = generateUniqueId();
      setPlayerId(newPlayerId);
      localStorage.setItem('playerId', newPlayerId);
    }
    socket.emit('tictac/joinRoom', {roomId, playerId});
    socket.on('tictac/startGame', () => {
      setWinner(null);
      setGameOver(false);
      setConfirmRestart(false);
      setStartGame(true);
      setIsPlayerTurn(playerRole === 'X');
    });
    socket.on('tictac/yourRole', (playerRole) => {
      setPlayerRole(playerRole);
    });
    socket.on('tictac/updateBoard', ( {newBoard, currentPlayer}) => {
      setBoard(newBoard); 
      setCurrentPlayer(currentPlayer);
      setIsPlayerTurn(playerRole === currentPlayer);
    });

    socket.on('tictac/gameOver', ({winner}) => {
      setWinner(winner);
      setGameOver(true);
      setStartGame(false);
    });

    return () => {
      socket.off('tictac/updateBoard');
      socket.off('tictac/gameOver');
    };
  }, [roomId, playerRole, isPlayerTurn, playerId, currentPlayer, board]);

  const makeMove = (index) => {
    if (isPlayerTurn && board[index] === null) {
      setIsPlayerTurn(false); 
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      socket.emit('tictac/makeMove',  index, currentPlayer );
      setCurrentPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));
    }
  };

  const restartGame = () => {
      socket.emit('tictac/restartGame', playerId);
      setConfirmRestart(true);
  };

  function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15);
  }

  return (
    <div>
      {startGame ? (
        <p>{`Игра началась! Вы играете за ${playerRole}`}</p>
      ) : (
        <p>Ожидаем оппонента</p>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => makeMove(index)}>
            {cell}
          </div>
        ))}
      </div>
      {!gameOver && startGame && <p>{isPlayerTurn ? `Ваш ход` : 'Ждем хода...'}</p>}
      {gameOver && winner !== null && (
        <p>{winner === playerRole ? 'Вы выиграли!' : 'Вы проиграли!'}</p>
      )}
      {gameOver && winner === null && <p>Ничья!</p>}
      {gameOver && !confirmRestart && (
        <div>
          <p>Игра завершена!</p>
          <button onClick={restartGame}>Сыграть еще раз</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
