const express = require('express');
const router = express.Router();
const TTTRoom = require('../classes/TTTRoom')
const RSPRoom = require('../classes/RSPRoom');

let rooms = new Map();
router.post('/createRoom', (req, res) => {
  const { gametype } = req.body;
  console.log(gametype);
  const roomId = generateUniqueId();
  if (gametype === 'tictactoe') { // переписать на какой-то объект
    rooms.set(roomId, new TTTRoom(roomId));
  } else if (gametype === 'rockscissorspaper') {
    rooms.set(roomId, new RSPRoom(roomId));
  }
  res.json({ roomId });
});

router.get('/:gameType/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  res.json({roomId});
});


router.post('/checkRoom', (req, res) => {
    const { roomId } = req.body;
    if (!rooms.get(roomId)) {
      res.status(404).json({ success: false, message: 'Комната не найдена' });
    }
    const room = rooms.get(roomId);
    if (room.isFull()) {  
      res.status(403).json({ success: false, message: 'Комната занята' });
    } else {
      res.status(200).json({ success: true, roomId });
    }
});
  
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 15);
}

function getRooms() {
    return rooms;
}
  

module.exports = { router, getRooms };