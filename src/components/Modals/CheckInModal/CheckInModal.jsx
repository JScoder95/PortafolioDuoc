import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import { doCheckIn } from "../../../actions/departamentos";
import jsPDF from "jspdf";
import "./CheckInModal.css";
import "antd/dist/antd.css";
import { formatDateInventory } from "../../../common/utils";

function CheckInModal(props) {
  const { auth } = useAuth();
  const { handleClose, show, selectedDepto, setIsLoading } = props;
  const pdfRef = useRef(null);
  const [listaChequeo, setListaChequeo] = useState("");
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [valorFinal, setValorFinal] = useState("");
  const [idDepto, setIdDpto] = useState("");
  const [idReserva, setIdReserva] = useState("");
  const [nombreDpto, setNombreDpto] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [valorArriendo, setValorArriendo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [statusPago, setStatusPago] = useState("");
  const [cantidadDias, setCantidadDias] = useState("");
  

  const date = new Date();

  const generarPDF = (e) => {
    e.preventDefault()
    const pdf = new jsPDF({
      format: "a4",
      unit: "pt",
    });
    // window.html2canvas = html2canvas;
    pdf.html(pdfRef.current, {
      callback: function (pdf) {
        pdf.save(
          `Reporte CheckIn-${formatDateInventory(date)}.pdf`
        );
      },
      html2canvas: { scale: 0.8 },
    });
    handleClose();
  };

  const handleSetLista = (event) => {
    setListaChequeo(event.target.value);
  };

  useEffect(() => {
    setNombre(selectedDepto.usuario?.nombre)
    setRut(selectedDepto.usuario?.rut)
    setTelefono(selectedDepto.usuario?.telefono)
    setCorreo(selectedDepto.usuario?.correo)
    setValorFinal(selectedDepto?.valorFinal)
    setNombreDpto(selectedDepto.departamento?.nombre)
    setIdDpto(selectedDepto.departamento?._id)
    setUbicacion(selectedDepto.departamento?.ubicacion)
    setValorArriendo(selectedDepto.departamento?.valorArriendo)
    setIdReserva(selectedDepto?._id)
    setFechaInicio(selectedDepto?.fechaInicio)
    setFechaFin(selectedDepto?.fechaFin)
    setCantidadDias(selectedDepto?.cantidadDias)
    setStatusPago(selectedDepto?.statusPago)
    setListaChequeo("")
  }, [selectedDepto])
  

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
        <Modal.Title id="contained-modal-title-vcenter">Formulario Check In</Modal.Title>
      </Modal.Header>
      <Modal.Body >
          <Form ref={pdfRef}  className="login__form" onSubmit={handleSubmit}> 
            <h6>Datos del Cliente:</h6>
            <Form.Group className="mb-1">
              <Form.Label >{`Nombre:   ${nombre}`}</Form.Label> 
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Rut:   ${rut}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Telefono:   ${telefono}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Correo:   ${correo}`}</Form.Label>
            </Form.Group>
            <h6 style={{ margin: "15px 0px 15px 0px" }}>Datos del Departamento</h6>
            <Form.Group className="mb-1">
              <Form.Label >{`Nombre Publicacion:   ${nombreDpto}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Id Departamento:   ${idDepto}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Ubicacion:   ${ubicacion}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Valor Diario:   $${valorArriendo}`}</Form.Label>
            </Form.Group>
            <h6 style={{ margin: "15px 0px 15px 0px" }}>Datos de la Reserva</h6>
            <Form.Group className="mb-1">
              <Form.Label >{`Id Reserva:   ${idReserva}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Valor Final:   $${valorFinal}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Fecha Inicio:   ${fechaInicio}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Fecha Fin:   ${fechaFin}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Cantidad Total Dias:   ${cantidadDias}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >{`Status Pago:   ${statusPago}`}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label >Status Check-In:  Done</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label htmlFor="listaChequeo">Formulario de Chequeo:</Form.Label>
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
              Check In
            </Button>
            <Button
              style={{ marginLeft: "20px", justifyContent: "end" }}
              onClick={(e) => generarPDF(e)}
            >
              Obtener Informe
            </Button>
          </Form>
      </Modal.Body>
    </Modal>
  );
}
export default CheckInModal;
