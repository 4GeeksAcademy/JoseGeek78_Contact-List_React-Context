import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.loadAgendas();
  }, [actions]);

  return (
    <Container fluid>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <br />
        <h1 className="agenda-header fw-bold text-center display-1 my-5">
          Agendas
        </h1>
        {store.agendas.map((agendaSlug) => (
          <Col key={agendaSlug} sm={12} md={12} lg={8} className="my-1">
            <Link to={`/agenda/${agendaSlug}`}>
              <Card className="w-100">
                <Card.Body className="text-center my-5">
                  <Link
                    to={`/agenda/${agendaSlug}`}
                    className="custom-link fw-bold fs-1 text-center"
                  >
                    {agendaSlug}
                  </Link>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export { Home };