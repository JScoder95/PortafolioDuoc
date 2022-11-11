import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editDepartment, editInventoryDepartment } from "../../../actions/departamentos";
import useAuth from "../../../hooks/useAuth";
import "./EditarInventarioDepartamentoModal.css";

const EditarInventarioDepartamentoModal = ({
  show,
  handleClose,
  selectedDepto,
  setIsLoading,
}) => {
  const [inventario, setInventario] = useState([]);
  
  const { auth, setAuth } = useAuth();

  React.useEffect(() => {
    if (selectedDepto) {
      setInventario(selectedDepto.inventario);
    }
  }, [selectedDepto]);

  const handleSetInventario = (event) => {
    setInventario(event.target.value);
  };

  const handleClickEditar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editInventoryDepartment(
      selectedDepto._id,
      auth?.token,
      inventario,
    )
      .then((res) => {
        setIsLoading(false);
        handleClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(inventario);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Inventario</Modal.Title>
      </Modal.Header>
      <Form className="reservar__form" onSubmit={handleClickEditar}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="inventario">Inventario</Form.Label>
          <Form.Control
            type="input"
            id="inventario"
            onChange={handleSetInventario}
            value={inventario}
            required
            placeholder="Ingresa un nuevo nombre"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default EditarInventarioDepartamentoModal;
