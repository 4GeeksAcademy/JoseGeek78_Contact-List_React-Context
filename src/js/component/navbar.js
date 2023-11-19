import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Button } from "react-bootstrap";

export const Navbar = () => {
  const { actions } = useContext(Context);
  const [newAgendaName, setNewAgendaName] = useState("");

  const handleCreateAgenda = () => {
    if (newAgendaName.trim() !== "") {
      actions.createAgenda(newAgendaName);
      setNewAgendaName(""); // Limpia el campo de texto después de crear la agenda
    }
  };
  const isAddButtonDisabled = newAgendaName.trim() === "";
  return (
    <nav className="navbar navbar-light mb-3 p-0">
      <Link to="/">
        <span className="navbar-brand mb-0 fs-1 ms-5">4Geek Agendas!</span>
      </Link>
      <div className="d-flex d-inline gap-3 my-0 p-0">
        <input
          type="text"
          className="form-control text-center fs-4"
          style={{ width: "50%" }}
          placeholder="New User Name"
          value={newAgendaName}
          onChange={(e) => setNewAgendaName(e.target.value)}
        />
        <Button
          className="addnewuser btn px-5"
          onClick={handleCreateAgenda}
          disabled={isAddButtonDisabled}
        >
          ADD NEW <br />
          USER
        </Button>
      </div>
    </nav>
  );
};