import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editDepartment, editInventoryDepartment } from "../../../actions/departamentos";
import useAuth from "../../../hooks/useAuth";
import { Checkbox, message } from 'antd'
import "./EditarInventarioDepartamentoModal.css";
import 'antd/dist/antd.css';

const EditarInventarioDepartamentoModal = ({
  show,
  handleClose,
  selectedDepto,
  setIsLoading,
}) => {
  const [inventario, setInventario] = useState([]);
  const [Mesas, setMesas] = useState(false);
  const [Sillas, setSillas] = useState(false);
  
  const { auth, setAuth } = useAuth();
  const authLocal = ( auth=={} ? auth : JSON.parse(localStorage.getItem("auth"))  ) ;

  React.useEffect(() => {
   if(inventario.includes("Mesas")){
    setMesas(true);
   } else {
    setMesas(false)
   }
   if(inventario.includes("Sillas")){
    setSillas(true);
   } else {
    setSillas(false)
   }
  }, [inventario]);

  React.useEffect(() => {
    if (selectedDepto) {
      setInventario(selectedDepto.inventario);
    }
  }, [selectedDepto]);

  const handleAddMesas = (e) => {
    if(!inventario.includes("Mesas")) {
      inventario.push("Mesas")
      setMesas(true);
      console.log(inventario)
    } else {
      let arr = inventario.filter(e => e !== "Mesas");
      setInventario(arr)
      console.log("nuevo inventario", arr);
    }
    console.log(e.target.checked);
  };
  const handleAddSillas = (e) => {
    if(!inventario.includes("Sillas")) {
      inventario.push("Sillas")
      setSillas(true);
      console.log(inventario)
    } else {
      let arr = inventario.filter(e => e !== "Sillas");
      setInventario(arr)
      console.log("nuevo inventario", arr);
    }
    console.log(e.target.checked);
  };

  const success = () => {
    message.success("Has Editado el Inventario Correctamente");
  };

  const error = () => {
    message.error("Ha ocurrido un error, intentalo nuevamente");
  };

  const handleClickEditar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editInventoryDepartment(
      selectedDepto._id,
      authLocal?.token,
      inventario,
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
          <div className="inventory">
            <Checkbox checked={Mesas} onChange={handleAddMesas}>Mesas</Checkbox>
            <Checkbox checked={Sillas} onChange={handleAddSillas}>Sillas</Checkbox>
          </div>
          <Form.Label htmlFor="inventario">{inventario}</Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default EditarInventarioDepartamentoModal;
