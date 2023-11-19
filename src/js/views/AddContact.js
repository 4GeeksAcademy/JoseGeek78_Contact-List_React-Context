import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Container, Form, Row, Col } from "react-bootstrap";

const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [newContact, setNewContact] = useState({
    full_name: "",
    email: "",
    agenda_slug: "",
    address: "",
    phone: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la acción para crear un nuevo contacto utilizando newContact
    actions.createContact(newContact);
    setShowModal(true); // Abre el modal después de crear el contacto
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="align-items-center">
      <br />
      <h1 className="agenda-header fw-bold text-center display-1 mt-5 mb-2">
        New Contact
      </h1>
      <Form className="custom-form card" onSubmit={handleSubmit}>
        <Form.Group
          as={Row}
          className="d-flex fs-4 text-end align-items-center justify-content-center"
        >
          <Col xs="10" sm="10" md="6" xl="4">
            <Form.Select
              name="agenda_slug"
              value={newContact.agenda_slug}
              onChange={handleChange}
              required
              className="selectbtn fs-3"
            >
              <option value="">Selecciona una Agenda</option>
              {store.agendas.map((agendaSlug) => (
                <option key={agendaSlug} value={agendaSlug}>
                  {agendaSlug}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <br />
        <br />
        <br />
        <Form.Group as={Row} className="mb-3 ms-4">
          <Form.Label
            column
            xs="2"
            sm="4"
            md="2"
            xl="2"
            className="d-flex fs-3 text-end align-items-center justify-content-end"
          >
            Full Name
          </Form.Label>
          <Col xs="8" sm="8" md="10" lg="8">
            <Form.Control
              type="text"
              name="full_name"
              value={newContact.full_name}
              onChange={handleChange}
              required
              className="fs-2 ps-5"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ms-4">
          <Form.Label
            column
            xs="2"
            sm="4"
            md="2"
            xl="2"
            className="d-flex fs-3 text-end align-items-center justify-content-end"
          >
            Email
          </Form.Label>
          <Col xs="8" sm="8" md="10" lg="8">
            <Form.Control
              type="email"
              name="email"
              value={newContact.email}
              onChange={handleChange}
              required
              className="fs-2 ps-5"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ms-4">
          <Form.Label
            column
            xs="2"
            sm="4"
            md="2"
            xl="2"
            className="d-flex fs-3 text-end align-items-center justify-content-end"
          >
            Dirección
          </Form.Label>
          <Col xs="8" sm="8" md="10" lg="8">
            <Form.Control
              type="text"
              name="address"
              value={newContact.address}
              onChange={handleChange}
              required
              className="fs-2 ps-5"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ms-4">
          <Form.Label
            column
            xs="2"
            sm="4"
            md="2"
            xl="2"
            className="d-flex fs-3 text-end align-items-center justify-content-end"
          >
            Phone Number
          </Form.Label>
          <Col xs="8" sm="8" md="10" lg="8">
            <Form.Control
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleChange}
              required
              className="fs-2 ps-5"
            />
          </Col>
        </Form.Group>
        <br />
        <br />
        <br />
        <Row>
          <Col className="d-flex flex-row gap-3 justify-content-center align-items-center">
            <Button className="contactbtnsave btn" type="submit">
              Create Contact
            </Button>
            <Link to="/">
              <Button className="backtomainbtn">BACK TO MAIN</Button>
            </Link>
          </Col>
        </Row>
      </Form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Su contacto ha sido creado con éxito!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export { AddContact };