import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import "./CheckOutModal.css";
import "antd/dist/antd.css";
import { doCheckOut } from "../../../actions/departamentos";
import { updateMultasyReparaciones } from "../../../actions/users";

function CheckOutModal(props) {
  const { auth } = useAuth();
  const { handleClose, show, selectedDepto, setIsLoading } = props;
  const [listaChequeo, setListaChequeo] = useState("");
  const [multas, setMultas] = useState(0);
  const [reparacion, setReparacion] = useState(0);

  useEffect(() => {
    setListaChequeo(selectedDepto.estado)
  }, [selectedDepto])
  

  const handleSetLista = (event) => {
    setListaChequeo(event.target.value);
  };
  const handleSetMultas = (event) => {
    setMultas(event.target.value);
  };
  const handleSetReparacion = (event) => {
    setReparacion(event.target.value);
  };

  const success = () => {
    message.success("Has Hecho el Check Out Correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, Intenta nuevamente");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    doCheckOut(selectedDepto._id, auth?.token, listaChequeo)
    .then((res) => {
      updateMultasyReparaciones(selectedDepto.usuario._id, multas, reparacion, auth?.token)
        .then((res) => {
          setIsLoading(false);
          success();
          handleClose();
          setListaChequeo("");
          setMultas("");
          setReparacion("");
        })
    })
    .catch((err) => {
      console.log(err.response);

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
        <Modal.Title id="contained-modal-title-vcenter">Check Out</Modal.Title>
      </Modal.Header>
      <Form className="login__form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="listaChequeo">Formulario de Chequeo</Form.Label>
          <Form.Control
            type="text"
            id="listaChequeo"
            autoComplete="off"
            onChange={handleSetLista}
            value={listaChequeo}
            required
            placeholder="Ingresa Informacion sobre el Chequeo"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="multas">Monto Multas</Form.Label>
          <Form.Control
            type="number"
            id="multas"
            autoComplete="off"
            onChange={handleSetMultas}
            value={multas}
            required
            placeholder="Ingresa monto de Multa"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reparacion">Monto Reparaci??n</Form.Label>
          <Form.Control
            type="number"
            id="reparacion"
            autoComplete="off"
            onChange={handleSetReparacion}
            value={reparacion}
            required
            placeholder="Ingresa monto de reparaciones"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Hacer Check Out
        </Button>
      </Form>
    </Modal>
  );
}
export default CheckOutModal;
