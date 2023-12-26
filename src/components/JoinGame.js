import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const JoinGameModal = ({path}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleJoinClick = () => {
    handleJoinRoom();
    handleCloseModal();
  };

  const handleJoinRoom = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rooms/checkRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomId: roomId}),
      });

      if (response.ok) {
        // Переход в комнату

        navigate(`${path}/${roomId}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      const errorData = 'Произошла ошибка на сервере, попробуйте позже';
      setError(errorData);
      setShowModal(true);
    }
  };

  return (
  <>
    <Button variant="primary" className="mb-2" onClick={handleShowModal}>
    Присоединиться к комнате
    </Button>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Присоединиться к комнате</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="roomId">
            <Form.Label>Введите id комнаты:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите id комнаты"
              value={roomId}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleJoinClick}>
          Присоединиться
        </Button>
        {error && <div className="error-message">{error}</div>}
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default JoinGameModal;
