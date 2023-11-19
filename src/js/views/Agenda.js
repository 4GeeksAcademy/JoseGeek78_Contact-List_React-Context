import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { EditContactForm } from "./EditContactForm";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { ImgContact } from "../component/ImgContact";

const Agenda = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [agendaData, setAgendaData] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);

  useEffect(() => {
    // Llama a la acción para cargar los datos de la agenda por su ID
    actions
      .loadAgendaUser(params.getid)
      .then((data) => {
        setAgendaData(data);
      })
      .catch((error) => {
        console.error("Error al cargar la agenda:", error);
      });
  }, [actions, params.getid]);

  const handleDeleteContact = async (contactId) => {
    // Mostrar el modal de confirmación antes de eliminar el contacto
    setContactToDeleteId(contactId);
    setShowDeleteModal(true);
  };

  const handleEditContact = (contactId) => {
    // Establece el ID del contacto que se está editando
    setEditingContactId(contactId);
  };

  const cancelEdit = () => {
    // Cancela la edición y restablece el estado de edición
    setEditingContactId(null);
  };

  return (
    <Container>
      <br />
      <h1 className="agenda-header fw-bold text-center display-1 mt-5 mb-2">
        {params.getid}
      </h1>
      <br />
      <br />
      {agendaData.map((contact) => (
        <Card className="contactbox my-1" key={contact.id}>
          {editingContactId === contact.id ? (
            // Muestra el formulario de edición si se está editando este contacto
            <EditContactForm
              contact={contact}
              cancelEdit={cancelEdit}
              updateContacts={setAgendaData}
            />
          ) : (
            // Muestra los detalles del contacto si no se está editando
            <>
              <Row>
                <Col
                  className="d-flex justify-content-center align-items-center p-5"
                  lg="3"
                >
                  <ImgContact
                    onImageChange={(imageData) => {
                      console.log("Imagen cargada:", imageData);
                    }}
                  />
                </Col>
                <Col className="p-5" lg="5">
                  <p className="datosdecontacto fs-1">{contact.full_name}</p>
                  <p className="datosdecontacto fs-4 align-items-center mx-2">
                    <i class="fa-solid fa-envelope fa-xl me-3"></i>{" "}
                    {contact.email}
                  </p>
                  <p className="datosdecontacto fs-4 align-items-center mx-2">
                    <i class="fa-solid fa-phone fa-xl me-3"></i> {contact.phone}
                  </p>
                  <p className="datosdecontacto fs-4 align-items-center mx-2">
                    <i class="fa-solid fa-location-dot fa-xl me-4"></i>{" "}
                    {contact.address}
                  </p>
                </Col>
                <Col className="d-flex flex-row justify-content-end" lg="4">
                  <Button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="deletecontactbtn btn px-4 w-50 fs-3"
                  >
                    DELETE
                  </Button>
                  <Button
                    onClick={() => handleEditContact(contact.id)}
                    className="editcontactbtn btn px-4 w-50 fs-3"
                  >
                    EDIT
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </Card>
      ))}

      {/* Modal de confirmación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              // Llama a la acción para eliminar el contacto
              await actions.deleteContact(contactToDeleteId);

              // Actualiza el estado local para reflejar los cambios
              setAgendaData((prevAgendaData) =>
                prevAgendaData.filter(
                  (contact) => contact.id !== contactToDeleteId
                )
              );

              // Cierra el modal de confirmación
              setShowDeleteModal(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export { Agenda };