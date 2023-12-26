class RSPRoom {
    constructor (roomId) {
        this.players = new Map();
        this.roomId = roomId;  
        this.playerChoices = new Map();
    }

    addPlayer(playerId) {
        if (this.players.size < 2) {
            this.players.set(playerId, 0);
        }
    }

    hasPlayer(playerId) {
        return this.players.has(playerId);
    }

    getPlayers() {
        return Array.from(this.players.keys());
    }

    makeChoice(playerId, choice) {
        if (this.players.has(playerId)) {
          this.playerChoices.set(playerId, choice);
        }
    }

    getPlayerChoices() {
        const choices = {};
        this.playerChoices.forEach((value, key) => {
            choices[key] = value;
        });
        return choices;
    }

    getOpponentChoice(playerId) {
        const playerIds = Array.from(this.playerChoices.keys());
        const opponentId = playerIds.find((id) => id !== playerId);
        return opponentId ? this.playerChoices.get(opponentId) : null;
    }

    isReadyChoices() {
        return this.playerChoices.size === 2;
    }

    resetChoices() {
        this.playerChoices.clear();
    }

    isFull() {
        return this.players.size === 2;
    }
}

module.exports = RSPRoom;