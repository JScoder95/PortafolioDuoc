import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addDepartment } from "../../../actions/departamentos";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";

const AñadirDepartamentoModal = ({ show, handleClose, setIsLoading }) => {
  const [nombre, setNombre] = useState(null);
  const [direccion, setDireccion] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [baños, setBaños] = useState(null);
  const [habitaciones, setHabitaciones] = useState(null);
  const [valorArriendo, setValorArriendo] = useState(null);
  const [disponible, setDisponible] = useState(null);
  const { auth } = useAuth();
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  React.useEffect(() => {}, []);

  const handleSetNombre = (event) => {
    setNombre(event.target.value);
  };
  const handleSetDireccion = (event) => {
    setDireccion(event.target.value);
  };
  const handleSetUbicacion = (event) => {
    setUbicacion(event.target.value);
  };
  const handleSetBaños = (event) => {
    setBaños(event.target.value);
  };
  const handleSetHabitaciones = (event) => {
    setHabitaciones(event.target.value);
  };
  const handleSetValorArriendo = (event) => {
    setValorArriendo(event.target.value);
  };
  const handleSetDisponibilidad = (event) => {
    setDisponible(event.target.value);
  };

  const success = () => {
    message.success("Has Añadido el departamento correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, intentalo denuevo");
  };

  const handleClickAddDepartment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addDepartment(
      auth?.token,
      nombre,
      direccion,
      ubicacion,
      baños,
      habitaciones,
      valorArriendo,
      disponible
    )
      .then((res) => {
        setIsLoading(false);
        handleClose();
        success();
        console.log(res);
      })
      .catch((err) => {
        error();
        console.log(err);
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
        <Modal.Title>Añadir Departamento</Modal.Title>
      </Modal.Header>
      <Form className="reservar__form" onSubmit={handleClickAddDepartment}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nombre">Nombre</Form.Label>
          <Form.Control
            type="input"
            id="nombre"
            onChange={handleSetNombre}
            value={nombre}
            required
            placeholder="Nombre"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="direccion">Direccion</Form.Label>
          <Form.Control
            type="input"
            placeholder="Direccion"
            id="direccion"
            onChange={handleSetDireccion}
            value={direccion}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="ubicacion">Ubicacion</Form.Label>
          <Form.Control
            type="input"
            placeholder="Ubicacion"
            id="ubicacion"
            onChange={handleSetUbicacion}
            value={ubicacion}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="baños">Cantidad de Baños</Form.Label>
          <Form.Control
            type="input"
            placeholder="Cantidad de baños"
            id="baños"
            onChange={handleSetBaños}
            value={baños}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="habitaciones">Habitaciones</Form.Label>
          <Form.Control
            type="input"
            placeholder="Cantidad de habitaciones"
            id="habitaciones"
            onChange={handleSetHabitaciones}
            value={habitaciones}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="arriendo">Valor Arriendo</Form.Label>
          <Form.Control
            type="input"
            placeholder="Valor de arriendo"
            id="arriendo"
            onChange={handleSetValorArriendo}
            value={valorArriendo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disponibilidad">Disponibilidad</Form.Label>
          <Form.Control
            type="input"
            placeholder="Disponibilidad"
            id="disponibilidad"
            onChange={handleSetDisponibilidad}
            value={disponible}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear
        </Button>
      </Form>
    </Modal>
  );
};

export default AñadirDepartamentoModal;
