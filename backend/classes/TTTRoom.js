class TTTRoom {
  constructor(roomId) {
    this.roomId = roomId;
    this.players = new Map();
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.confirmRestart = new Set();
  }
  
  addPlayer(playerId) {
    if (this.players.size < 2 && !this.players.has(playerId)) {
      if (this.players.size === 0) {
        this.players.set(playerId, 'X');
      } else {
        this.players.set(playerId, 'O');
      }
    }
  }
  
  getPlayers() {
    return Array.from(this.players.keys());
  }
  
  getPlayerRole(playerId) {
    return this.players.get(playerId);
  }

  hasPlayer(playerId) {
    return this.players.has(playerId);
  }

  isFull() {
    return this.players.size === 2;
  }

  getBoard() {
    return this.board;
  }

  setBoard(newBoard) {
    this.board = newBoard;
  }
  
  getCurrentPlayer() {
    return this.currentPlayer;
  }

  setCurrentPlayer(newPlayer) {
    this.currentPlayer = newPlayer;
  }

  setConfirmRestart(playerId) {
    this.confirmRestart.add(playerId);
  }

  isAllConfirmRestart() {
    return this.confirmRestart.size === this.players.size;
  }

  clearConfirmRestart() {
    this.confirmRestart.clear();
  }

  shufflePlayerRoles() {
    const rolesArray = Array.from(this.players.values());

    for (let i = rolesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rolesArray[i], rolesArray[j]] = [rolesArray[j], rolesArray[i]];
    }

    const playerIds = Array.from(this.players.keys());
    for (let i = 0; i < playerIds.length; i++) {
      this.players.set(playerIds[i], rolesArray[i]);
    }
  }
}

module.exports = TTTRoom;
  