import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const EditContactForm = ({ contact, cancelEdit, updateContacts }) => {
  const [editedContact, setEditedContact] = useState(contact);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedContact({
      ...editedContact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Llama a la función para editar el contacto
    await updateContact(editedContact);
    cancelEdit();
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/contact/${updatedContact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        }
      );

      if (response.ok) {
        updateContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
          )
        );
      } else {
        console.error("Error al editar el contacto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar el contacto:", error);
    }
  };

  return (
    <Form className="editform py-5" onSubmit={handleSubmit}>
      <Form.Group
        as={Row}
        className="align-items-center justify-content-center px-5 pt-5 pb-2"
      >
        <Form.Label
          column
          xs="4"
          sm="4"
          md="2"
          xl="2"
          className="fs-2 text-end"
        >
          Full Name
        </Form.Label>
        <Col xs="8" sm="8" md="8" lg="6">
          <Form.Control
            type="text"
            name="full_name"
            value={editedContact.full_name}
            onChange={handleInputChange}
            required
            className="fs-3"
          />
        </Col>
      </Form.Group>
      <Form.Group
        as={Row}
        className="d-flex flex-row align-items-center justify-content-center px-5 py-2"
      >
        <Form.Label
          column
          xs="4"
          sm="4"
          md="2"
          xl="2"
          className="fs-3 text-end"
        >
          <i class="fa-solid fa-envelope fa-xl me-3"></i>
        </Form.Label>
        <Col xs="8" sm="8" md="8" lg="6">
          <Form.Control
            type="email"
            name="email"
            value={editedContact.email}
            onChange={handleInputChange}
            required
            className="fs-3"
          />
        </Col>
      </Form.Group>
      <Form.Group className="d-flex flex-row align-items-center justify-content-center px-5 py-2">
        <Form.Label
          column
          xs="4"
          sm="4"
          md="2"
          xl="2"
          className="fs-3 text-end me-4"
        >
          <i class="fa-solid fa-location-dot fa-xl me-4"></i>
        </Form.Label>
        <Col xs="8" sm="8" md="8" lg="6">
          <Form.Control
            type="text"
            name="address"
            value={editedContact.address}
            onChange={handleInputChange}
            required
            className="fs-3"
          />
        </Col>
      </Form.Group>
      <Form.Group className="d-flex flex-row align-items-center justify-content-center px-5 pt-2 pb-5">
        <Form.Label
          column
          xs="4"
          sm="4"
          md="2"
          xl="2"
          className="fs-3 text-end me-3"
        >
          <i class="fa-solid fa-phone fa-xl me-3"></i>
        </Form.Label>
        <Col xs="8" sm="8" md="8" lg="6">
          <Form.Control
            type="text"
            name="phone"
            value={editedContact.phone}
            onChange={handleInputChange}
            required
            className="fs-3"
          />
        </Col>
      </Form.Group>
      <Col className="d-flex flex-row gap-1 justify-content-center align-items-center">
        <Button className="contactbtnsave px-5" type="submit">
          SAVE
        </Button>
        <Button className="backtomainbtn px-5" onClick={cancelEdit}>
          CANCEL
        </Button>
      </Col>
    </Form>
  );
};

export { EditContactForm };