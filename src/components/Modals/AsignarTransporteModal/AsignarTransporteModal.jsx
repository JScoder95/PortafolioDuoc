import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import { toAssignTransport } from "../../../actions/departamentos";
import { updateMultasyReparaciones } from "../../../actions/users";
import "./AsignarTransporteModal.css";
import "antd/dist/antd.css";
import axios from "../../../api/axios";

function AsignarTransporteModal(props) {
  const { auth } = useAuth();
  const authLocal = ( auth==!{} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;
  const { handleClose,selectedDepto, show } = props;
  const [transporteSelected, setTransporteSelected] = useState("");
  const [multas, setMultas] = useState(0);
  const [reparacion, setReparacion] = useState(0);
  const [transporte, setTransporte] = useState([]);
  const [datosTransporte, setDatosTransporte] = useState();
  
  
  
  const handleSetTransporteSelected = (event) => {
    setTransporteSelected(event.target.value);
    if(event.target.value !== '0'){

      setDatosTransporte (transporte.find((transporte) => transporte._id === event.target.value))
    }
    else if (event.target.value === '0') {

      setDatosTransporte({modeloAuto: '', patente: ''})
    }
  };
  const handleSetMultas = (event) => {
    setMultas(event.target.value);
  };
  const handleSetReparacion = (event) => {
    setReparacion(event.target.value);
  };

  const success = () => {
    message.success("Has Asignado Transporte Correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, Intenta nuevamente");
  };
  useEffect(() => {
    async function fetchTransporte () {
      const token = {
        headers: {
          'x-token' : authLocal?.token
        }
      }
      const response = await axios('/asignacionTransporte',token);
      setTransporte(response.data.asignacionTransporte);
      
    }
  fetchTransporte();

  },[show] )
  useEffect(() => {
    setTransporteSelected('0');
    setDatosTransporte({})
  }, [handleClose])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await toAssignTransport(selectedDepto._id, transporteSelected,  authLocal?.token);
    console.log(response)
    if (response.data.ok) {
      success();
      handleClose();
     
    } else {
      error();
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Asignar Transporte</Modal.Title>
      </Modal.Header>
      <Form className="login__form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="listaChequeo">Asiganar Conductor</Form.Label>
          <Form.Select
            id="listaChequeo"
            
            onChange={handleSetTransporteSelected}
            value={transporteSelected}
            required
            
          >
          <option value='0' > Selecciona un Conductor</option>
          {transporte.map((transporte) => (
            <option key={transporte._id} value={transporte._id}> {transporte.conductor} </option>
          ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Vehiculo">Modelo Vehiculo</Form.Label>
          <Form.Control
            type="text"
            id="multas"
            autoComplete="off"
            disabled
            value={datosTransporte?.modeloAuto}
            required
            
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reparacion">Patente</Form.Label>
          <Form.Control
            type="text"
            id="reparacion"
            autoComplete="off"
            disabled
            value={datosTransporte?.patente}
            required
            
          />
        </Form.Group>
        {transporteSelected !== '0'? (
          
        <Button variant="primary" type="submit">
          Asiganar Transporte
        </Button>
        )
        :(
          <Button variant="primary" disabled type="submit">
          Asiganar Transporte
        </Button>
        )}
      </Form>
    </Modal>
  );
}
export default AsignarTransporteModal;
