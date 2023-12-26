const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { router, getRooms } = require('./routes/rooms');
const handleTicTacToeSocket = require('./tictactoeSocket');
const handleRSPSocket = require('./rspSocket');
const TTTRoom = require('./classes/TTTRoom');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://game-app-n8fu.onrender.com'],
      methods: ['GET', 'POST'],
    },
});

app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.use('/rooms', router);
io.on('connection', (socket) => {
  handleTicTacToeSocket(io, socket, getRooms());
  handleRSPSocket(io, socket, getRooms());
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});