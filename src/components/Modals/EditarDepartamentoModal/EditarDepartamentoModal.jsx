import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editDepartment } from "../../../actions/departamentos";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import "./EditarDepartamentoModal.css";

const EditarDepartamentoModal = ({
  show,
  handleClose,
  selectedDepto,
  setIsLoading,
  setKey
}) => {
  const [nombre, setNombre] = useState(0);
  const [direccion, setDireccion] = useState(0);
  const [ubicacion, setUbicacion] = useState(0);
  const [baños, setBaños] = useState(0);
  const [habitaciones, setHabitaciones] = useState(0);
  const [valorArriendo, setValorArriendo] = useState(0);
  const [fechaPublicacion, setFechaPublicacion] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const { auth, setAuth } = useAuth();
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  React.useEffect(() => {
    if (selectedDepto) {
      setNombre(selectedDepto.nombre);
      setDireccion(selectedDepto.direccion);
      setUbicacion(selectedDepto.ubicacion);
      setBaños(selectedDepto.banos);
      setHabitaciones(selectedDepto.habitaciones);
      setValorArriendo(selectedDepto.valorArriendo);
      setFechaPublicacion(selectedDepto.fechaPublicacion);
      setDisponible(selectedDepto.disponible);
    }
  }, [selectedDepto]);

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
  const handleSetFechaPublicacion = (event) => {
    setFechaPublicacion(event.target.value);
  };
  const handleSetDisponibilidad = (event) => {
    setDisponible(event.target.value);
  };

  const success = () => {
    message.success("Has Editado el departamento Correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, intentalo nuevamente");
  };

  const handleClickEditar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editDepartment(
      selectedDepto._id,
      authLocal?.token,
      nombre,
      direccion,
      ubicacion,
      baños,
      habitaciones,
      valorArriendo,
      fechaPublicacion,
      disponible
    )
      .then((res) => {
        setIsLoading(false);
        handleClose();
        setKey("departamentos");
        success();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        error();
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
        <Modal.Title>Editar Departamento</Modal.Title>
      </Modal.Header>
      <Form className="reservar__form" onSubmit={handleClickEditar}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="nombre">Nombre</Form.Label>
          <Form.Control
            type="input"
            id="nombre"
            onChange={handleSetNombre}
            value={nombre}
            required
            placeholder="Ingresa un nuevo nombre"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="direccion">Direccion</Form.Label>
          <Form.Control
            type="input"
            placeholder="Ingresa nueva direccion"
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
            placeholder="Ingresa nueva ubicacion"
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
            placeholder="Ingresa la nueva cantidad de baños"
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
            placeholder="Ingresa la nueva cantidad de habitaciones"
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
            placeholder="Ingresa el valor de arriendo"
            id="arriendo"
            onChange={handleSetValorArriendo}
            value={valorArriendo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fecha">Fecha Publicacion</Form.Label>
          <Form.Control
            type="input"
            placeholder="Ingresa la fecha"
            id="fecha"
            onChange={handleSetFechaPublicacion}
            value={fechaPublicacion}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disponibilidad">Disponibilidad</Form.Label>
          <Form.Control
            type="input"
            placeholder="Ingresa la disponibilidad"
            id="disponibilidad"
            onChange={handleSetDisponibilidad}
            value={disponible}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default EditarDepartamentoModal;
