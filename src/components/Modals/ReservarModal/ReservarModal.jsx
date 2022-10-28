import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAuth from '../../../hooks/useAuth';
import { MoneyFormatter } from '../../../common/utils';
import { reserveDepartment } from '../../../actions/departamentos';
import './ReservarModal.css';


const ReservarModal = ({ show, handleClose, selectedDepto, setIsLoading }) => {
    const [dias, setDias] = useState(0);
    const [personas, setPersonas] = useState(0);
    const { auth, setAuth } = useAuth();

    const handleSetDias = (event) => {
        setDias(event.target.value)
    }

    const handleSetPersonas = (event) => {
        setPersonas(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const valorFinal = dias * selectedDepto.valorArriendo;
        reserveDepartment(selectedDepto._id, auth?.token, valorFinal, dias).then((res) => {
            setIsLoading(false);
            handleClose();
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
            <Modal.Title>
                Reservar Departamento
            </Modal.Title>
        </Modal.Header>
        <Form className="reservar__form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="personas">Cantidad de Personas</Form.Label>
                <Form.Control
                    type="input"  
                    id="personas" 
                    onChange={handleSetPersonas}
                    value={personas}
                    required 
                    placeholder="Ingresa la Cantidad de Personas" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="dias">Cantidad de Días</Form.Label>
                <Form.Control 
                    type="input" 
                    placeholder="Ingresa la Cantidad de Días" 
                    id="dias"
                    onChange={handleSetDias}
                    value={dias}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Añadir Servicios Extra" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="precio">Precio</Form.Label>
                <Form.Control 
                    type="input" 
                    id="precio"
                    value={MoneyFormatter(selectedDepto?.valorArriendo)}
                    disabled
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Pagar
            </Button>
        </Form> 
    </Modal>
  )
}

export default ReservarModal;