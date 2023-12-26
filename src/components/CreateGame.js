import React, { useState } from 'react';
import { Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGame = ({path, gametype}) => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const handleCreateGame = async () => {
        try {
          // const response = await axios.post('http://localhost:5000/rooms/createRoom', { gametype });
          const response = await axios.post('/rooms/createRoom', { gametype });
          const newRoomId = response.data.roomId;
          setRoomId(newRoomId);
          navigate(`${path}/${newRoomId}`);
        } catch (error) {
          console.error('Error creating game:', error);
        }
      };
    return (
        <Link to={`${path}/${roomId}`}>
            <Button variant="success" className="mb-2" onClick={handleCreateGame} style={{width: '100%'}}>
                Создать новую игру
            </Button>
        </Link>
    )
}
export default CreateGame;