import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../../../actions/users';
import useAuth from '../../../hooks/useAuth';


const EditarUsuarioModal = ({ show, handleClose, selectedUsuario, setIsLoading, setSelectedUsuario }) => {
    const { auth } = useAuth();
    const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;
    const [nombre, setNombre] = useState();
    const [rut, setRut] = useState();
    const [telefono, setTelefono] = useState();
    const [correo, setCorreo] = useState();
    const [id, setId] = useState('');
    
    useEffect(() => {
        if(selectedUsuario){
            setId(selectedUsuario._id);
            setNombre(selectedUsuario.nombre);
            setRut(selectedUsuario.rut);
            setTelefono(selectedUsuario.telefono);
            setCorreo(selectedUsuario.correo)
        }
    }, [selectedUsuario])
    

    const handleSetNombre = (event) => {
        setNombre(event.target.value)
    }

    const handleSetRut = (event) => {
        setRut(event.target.value)
    }

    const handleSetTelefono = (event) => {
        setTelefono(event.target.value)
    }

    const handleSetCorreo = (event) => {
        setCorreo(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        updateUser(nombre, rut, telefono, correo, id, authLocal?.token).then((res) => {
            setIsLoading(false);
            handleClose();
            setSelectedUsuario('');
            console.log(res);
        }).catch((err) => {
            console.log(err.response);
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
                Editar Usuario
            </Modal.Title>
        </Modal.Header>
        <Form className="reservar__form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                <Form.Control
                    type="input"  
                    id="nombre" 
                    onChange={handleSetNombre}
                    value={nombre}
                    required 
                    placeholder="Ingresa el nuevo nombre" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="rut">Rut</Form.Label>
                <Form.Control 
                    type="input" 
                    placeholder="Ingresa el nuevo rut" 
                    id="rut"
                    onChange={handleSetRut}
                    value={rut}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="telefono">Telefono</Form.Label>
                <Form.Control
                    type="input"  
                    id="telefono" 
                    onChange={handleSetTelefono}
                    value={telefono}
                    required 
                    placeholder="Ingresa el nuevo numero" 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="correo">Correo</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Ingresa el nuevo correo" 
                    id="correo"
                    onChange={handleSetCorreo}
                    value={correo}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Editar
            </Button>
        </Form> 
    </Modal>
  )
}

export default EditarUsuarioModal;