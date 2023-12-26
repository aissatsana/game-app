function handleRSPSocket(io, socket, rooms) {
    let room;
    socket.on('rsp/joinRoom', ({ roomId, playerId }) => {
        socket.join(roomId);
        room = rooms.get(roomId);
        console.log('roomFull ', room.isFull());
        if (!room.hasPlayer(playerId) && playerId.length > 0) {
          room.addPlayer(playerId);
          if (room.isFull()) {
            io.to(roomId).emit('rsp/startGame');
          }
        }
    });
    socket.on('rsp/makeChoice', ({choice, playerId}) => {
      console.log(choice, playerId);
        room.makeChoice(playerId, choice);
        console.log(room.getPlayerChoices())
        handleGameResult(io, room);
    })
}

function handleGameResult(io, room) {
  if (room.isReadyChoices()) {
    const playerChoices = room.getPlayerChoices();
    const winnerState = determineWinner(playerChoices);
    const players = room.getPlayers();
    let resultState = {};
    players.forEach((player) => {
      const opponentChoice = room.getOpponentChoice(player)
      resultState[player] = opponentChoice;
    })
    io.to(room.roomId).emit('rsp/gameResult', ({ resultState, winnerState}) );
    room.resetChoices();
  }
}

const determineWinner = (userMoves) => {
  const moves = ['rock', 'paper', 'scissors'];
  const players = Object.keys(userMoves);

  const userMove1 = userMoves[players[0]];
  const userMove2 = userMoves[players[1]];

  const moveIndexDiff = Math.abs(moves.indexOf(userMove1) - moves.indexOf(userMove2));
  const halfLength = Math.floor(moves.length / 2);

  if (moveIndexDiff === 0) {
    return {
      [players[0]]: 'draw',
      [players[1]]: 'draw',
    };
  } else if (moveIndexDiff <= halfLength) {
    return {
      [players[0]]: 'win',
      [players[1]]: 'lose',
    };
  } else {
    return {
      [players[0]]: 'lose',
      [players[1]]: 'win',
    };
  }
};

module.exports = handleRSPSocket;