import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RulesModal = ({ title, rules }) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);  
    return (
    <>
        <Button variant="info" className="mb-2" onClick={handleShowModal}>
          Правила
        </Button>     
         <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title} - Правила</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{rules}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default RulesModal;