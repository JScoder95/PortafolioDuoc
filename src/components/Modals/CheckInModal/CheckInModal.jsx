import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import "./CheckInModal.css";
import "antd/dist/antd.css";
import { doCheckIn } from "../../../actions/departamentos";

function CheckInModal(props) {
  const { auth } = useAuth();
  const { handleClose, show, selectedDepto, setIsLoading } = props;
  const [listaChequeo, setListaChequeo] = useState("");

  const handleSetLista = (event) => {
    setListaChequeo(event.target.value);
  };

  const success = () => {
    message.success("Has Hecho el Check In Correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, Intenta nuevamente");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    doCheckIn(selectedDepto._id, auth?.token, listaChequeo)
    .then((res) => {
      setIsLoading(false);
      console.log(res);
      success();
      handleClose();
      setListaChequeo("");
    })
    .catch((err) => {
      console.log(err.response);
      console.log("NOPE");
      error()
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Check In</Modal.Title>
      </Modal.Header>
      <Form className="login__form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="listaChequeo">Lista de Chequeo</Form.Label>
          <Form.Control
            type="text"
            id="listaChequeo"
            autoComplete="off"
            onChange={handleSetLista}
            value={listaChequeo}
            required
            placeholder="Ingresa la lista de chequeo"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Hacer Check In
        </Button>
      </Form>
    </Modal>
  );
}
export default CheckInModal;
