import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddContactButton = () => {
  return (
    <div className="fixed-button">
      <Link to="/add-contact">
        <Button className="addnewcontact btn px-5">
          ADD NEW <br />
          CONTACT
        </Button>
      </Link>
    </div>
  );
};

export default AddContactButton;
2;