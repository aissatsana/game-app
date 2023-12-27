function handleTicTacToeSocket(io, socket, rooms) {
  let room;

  socket.on('tictac/joinRoom', ({ roomId, playerId }) => {
    socket.join(roomId);
    room = rooms.get(roomId);

    if (!room.hasPlayer(playerId) && playerId.length > 0) {
      room.addPlayer(playerId);

      if (room.isFull()) {
        io.to(roomId).emit('tictac/startGame');
        io.to(room.roomId).emit('tictac/updateBoard', { newBoard: room.getBoard(), currentPlayer: room.getCurrentPlayer() });
      }

      socket.emit('tictac/yourRole', room.getPlayerRole(playerId));
    }
  });

  socket.on('tictac/updateBoard', (newBoard) => {
    console.log('current player ', room.getCurrentPlayer());
    io.to(room.roomId).emit('tictac/updateBoard', { newBoard: newBoard, currentPlayer: room.getCurrentPlayer() });
  });

  socket.on('tictac/makeMove', (index, player) => {
    const board = room.getBoard();
    const roomId = room.roomId;

    if (board[index] === null && (player === 'X' || player === 'O')) {
      board[index] = player;
      room.setBoard(board);
      room.setCurrentPlayer(player === 'X' ? 'O' : 'X');
      socket.broadcast.to(room.roomId).emit('tictac/updateBoard', { newBoard: board, currentPlayer: room.getCurrentPlayer() });
      if (checkWinner(board)) {
        io.to(roomId).emit('tictac/gameOver',{winner: player});
      } else if (board.every((cell) => cell !== null)) {
        io.to(roomId).emit('tictac/gameOver', {winner: 'Ничья'});
      }
    }
  });

  socket.on('tictac/restartGame', (playerId) => {
    room.setConfirmRestart(playerId);
    let players = room.getPlayers();
    players.forEach((player) => {
      const role = room.getPlayerRole(player);
      console.log(player + 'играет за ' + role);
    })
    room.shufflePlayerRoles();
    players = room.getPlayers();
    players.forEach((player) => {
      const role = room.getPlayerRole(player);
      console.log('shuufle' + player + 'играет за ' + role);
    })
    socket.emit('tictac/yourRole', room.getPlayerRole(playerId));
    if (room.isAllConfirmRestart()) {
      room.setBoard(Array(9).fill(null));
      room.setCurrentPlayer('X');
      io.to(room.roomId).emit('tictac/startGame');
      io.to(room.roomId).emit('tictac/updateBoard', { newBoard: room.getBoard(), currentPlayer: room.getCurrentPlayer() });
      room.clearConfirmRestart();
    }
  });

  socket.on('tictac/getPlayerInfo', ({ roomId, playerId }) => {
    const room = rooms.get(roomId);
    const board = room.getBoard();
    const currentPlayer = room.getCurrentPlayer();
    const playerRole = room.getPlayerRole(playerId);
    io.to(socket.id).emit('tictac/playerInfo', { board, currentPlayer, playerRole });
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
}

function checkWinner(board) {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        return true; 
      }
    }
  
    return false;
}

module.exports = handleTicTacToeSocket;
