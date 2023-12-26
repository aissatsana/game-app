// useEffect(() => {
//     // Обработка события подключения
//     socket.emit('joinRoom', roomId);
//     console.log(`Подключение к комнате ${roomId}`);
//     // Подписка на событие от сервера для обновления доски
//     socket.on('updateBoard', (newBoard) => {
//       setBoard([...newBoard]); 
//       setIsPlayerTurn(true);
//     });

//     socket.on('gameOver', () => {
//       setGameOver(true);
//     });

//     return () => {
//       // Отписываемся при размонтировании компонента
//       socket.off('updateBoard');
//       socket.off('gameOver');
//     };
//   }, []);

//   const makeMove = (index) => {
//     if (isPlayerTurn && board[index] === null) {
//       setIsPlayerTurn(false); // Запрещаем текущему пользователю делать ход после клика
//       const newBoard = [...board];
//       newBoard[index] = currentPlayer;
//       setBoard(newBoard);
//       socket.emit('makeMove', { index, player: currentPlayer });
//     }
//   };

//   const restartGame = () => {
//     // // Отправляем запрос на перезапуск игры
//     socket.emit('restartGame');
//     setGameOver(false);
//     setIsPlayerTurn(true); 
//   };



