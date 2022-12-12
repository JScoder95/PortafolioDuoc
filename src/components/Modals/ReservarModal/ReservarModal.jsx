import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../../hooks/useAuth";
import { MoneyFormatter } from "../../../common/utils";
import { reserveDepartment } from "../../../actions/departamentos";
import "./ReservarModal.css";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { es } from "date-fns/locale";

const ReservarModal = ({ show, handleClose, selectedDepto, setIsLoading }) => {
  const [dias, setDias] = useState(0);
  const [personas, setPersonas] = useState(0);
  const { auth, setAuth } = useAuth();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [valorFinal, setValorFinal] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [webpayResponse, setWebpayResponse] = useState();
  const [confirmarReserva, setConfirmarReserva] = useState(false);

  let fechasReservadas = [];

  const onChange = (dates) => {
    const [start, end] = dates;

    setDateRange(dates);
    const startD = new Date(start).getTime();
    const endD = new Date(end).getTime();
    console.log(startD, start);
    setDias(0);
    if (end === null && start !== null) {
      setDias(1);
    } else if (end === null && start === null) {
      setDias(0);
    } else {
      const diffTime = Math.abs(endD - startD) + 1;
      setDias(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
  };
  const handleSetDias = (event) => {
    setDias(event.target.value);
  };

  const handleSetPersonas = (event) => {
    setPersonas(event.target.value);
    console.log(personas);
  };
  useEffect(() => {
    setValorFinal(0);
    setConfirmarReserva(false);
    setDateRange([null, null]);
    setDias(0);
  }, [handleClose]);

  useEffect(() => {
    setValorFinal(selectedDepto.valorArriendo * dias);
  }, [startDate, endDate]);
  useEffect(() => {
    async function fetchReservas() {
      const token = {
        headers: {
          "Content-Type": "application/json",
          "x-token": auth?.token,
        },
      };
      const response = await axios.get(`/reservas/${selectedDepto._id}`, token);
      setReservas(response.data.reservaDB);
    }
    fetchReservas();
  }, [selectedDepto]);

  reservas.map((reserva) => {
    const inicio = new Date(reserva.fechaInicio);
    const fin = new Date(reserva.fechaFin);
    if (reserva.fechaInicio !== undefined && reserva.fechaFin !== undefined) {
      console.log("entre aqui");
      fechasReservadas.push({ start: inicio, end: fin });
    } else {
      return [];
    }
  });
  console.log(fechasReservadas);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);

    reserveDepartment(
      selectedDepto._id,
      auth?.token,
      valorFinal,
      dias,
      startDate,
      (endDate===null)?startDate:endDate,
    )
      .then((res) => {
        setIsLoading(false);
        setConfirmarReserva(true);
        // handleClose();
        console.log(res);
        localStorage.setItem("reservaID",res.data?.reserva?._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function fetchWebpay(){
      const responseWP = await axios.get(
        `/webpay_plus/pay/${valorFinal}`
      )
      console.log(responseWP)
      setWebpayResponse(responseWP?.data);
    }
    fetchWebpay();
  },[valorFinal])
console.log(webpayResponse)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Reservar Departamento</Modal.Title>
      </Modal.Header>
      <Form className="reservar__form" /* onSubmit={handleSubmit} */>
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
          <Form.Label htmlFor="dias">Fechas</Form.Label>
          <DatePicker
            className="form-control"
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDateIntervals={fechasReservadas}
            locale={es}
            dateFormat={"dd/MM/yyyy"}
            selectsRange={true}
            placeholderText="Selecciona las fechas"
            isClearable={true}
          >
            <p style={{ color: "red", textAlign: "center" }}>
              {" "}
              <b>
                Nota: Si la fecha esta en color gris ya esta reservada{" "}
              </b>{" "}
            </p>
          </DatePicker>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="dias">Cantidad de Dias</Form.Label>
          <Form.Control
            type="input"
            placeholder="Ingresa la Cantidad de Días"
            id="dias"
            onChange={handleSetDias}
            value={dias}
            disabled
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
            value={MoneyFormatter(valorFinal)}
            disabled
          />
        </Form.Group>
        {!confirmarReserva?(

        <Button variant="primary" onClick={handleSubmit}>
          Confirmar Reserva
        </Button>
        ):(

        <form action={webpayResponse?.url} method="POST">
          <input type="hidden" name="token_ws" value={webpayResponse?.token} />
          <input type="submit" className="btn btn-success" value="Pagar" />
        </form>
        )}
      </Form>
    </Modal>
  );
};

export default ReservarModal;
