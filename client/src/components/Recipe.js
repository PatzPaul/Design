import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

const Recipe = ({ title, description, onClick, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Card className="recipe">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <p>{description}</p>
        <Button variant="primary" onClick={onClick}>
          Update
        </Button>{" "}
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your update form or content here */}
          {/* For example, you can add text inputs and buttons to update the recipe */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={openModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Recipe;
