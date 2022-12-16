import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import useAuth from "../../../hooks/useAuth";
import { message } from "antd";
import axios from "../../../api/axios";

import "./PagoModalFuncionario.css";
import "antd/dist/antd.css";
import {  formatDate } from "../../../common/utils";

function PagoModalFuncionario(props) {
  
  const { handleClose, show, selectedDepto, setIsLoading } = props;
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
  const [webpayResponse, setWebpayResponse] = useState();

  localStorage.setItem('reservaID', idReserva);
  useEffect(() => {
    setNombre(selectedDepto.usuario?.nombre);
    setRut(selectedDepto.usuario?.rut);
    setTelefono(selectedDepto.usuario?.telefono);
    setCorreo(selectedDepto.usuario?.correo);
    setValorFinal(selectedDepto?.valorFinal);
    setNombreDpto(selectedDepto.departamento?.nombre);
    setIdDpto(selectedDepto.departamento?._id);
    setUbicacion(selectedDepto.departamento?.ubicacion);
    setValorArriendo(selectedDepto.departamento?.valorArriendo);
    setIdReserva(selectedDepto?._id);
    setFechaInicio(selectedDepto?.fechaInicio);
    setFechaFin(selectedDepto?.fechaFin);
    setCantidadDias(selectedDepto?.cantidadDias);
    setStatusPago(selectedDepto?.statusPago);
    setListaChequeo("");
  }, [selectedDepto]);

  useEffect(() => {
    async function fetchWebpay() {
      if (valorFinal !== 0 && valorFinal !== NaN && valorFinal !== undefined )   {
        const responseWP = await axios.get(`/webpay_plus/pay/${valorFinal}`);

        setWebpayResponse(responseWP?.data);
      }
    }
    fetchWebpay();
  },[valorFinal]);

  const success = () => {
    message.success("Has Hecho el Check Out Correctamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, Intenta nuevamente");
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
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario Check In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="login__form">
          <h6>Datos del Cliente:</h6>
          <Form.Group className="mb-1">
            <Form.Label>{`Nombre:   ${nombre}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Rut:   ${rut}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Telefono:   ${telefono}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Correo:   ${correo}`}</Form.Label>
          </Form.Group>
          <h6 style={{ margin: "15px 0px 15px 0px" }}>
            Datos del Departamento
          </h6>
          <Form.Group className="mb-1">
            <Form.Label>{`Nombre Publicacion:   ${nombreDpto}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Id Departamento:   ${idDepto}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Ubicacion:   ${ubicacion}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Valor Diario:   $${valorArriendo}`}</Form.Label>
          </Form.Group>
          <h6 style={{ margin: "15px 0px 15px 0px" }}>Datos de la Reserva</h6>
          <Form.Group className="mb-1">
            <Form.Label>{`Id Reserva:   ${idReserva}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Valor Final:   $${valorFinal}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Fecha Inicio:   ${formatDate(
              fechaInicio
            )}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Fecha Fin:   ${formatDate(fechaFin)}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Cantidad Total Dias:   ${cantidadDias}`}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>{`Status Pago:   ${statusPago}`}</Form.Label>
          </Form.Group>

        </Form>
        <form action={webpayResponse?.url} method="POST">
          <input type="hidden" name="token_ws" value={webpayResponse?.token} />
          <button
            type="submit"
            style={{
              width: "100%",
              border: "none",
              height: "40px",
            }}
            className="btn btn-success"
            //  value='Pagar'
          >
            <i className="bx bx-credit-card-alt"></i> Pagar{" "}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default PagoModalFuncionario;
