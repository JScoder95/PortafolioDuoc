import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import InnerImageZoom from "react-inner-image-zoom";
import Swal from "sweetalert2";

//Components

import {
  MoneyFormatter,
  capitalizeFirstLetter,
  formatDate,
} from "../../common/utils";
import axios from "../../api/axios";
import EmblaCarousel from "../../components/EmblaCarouselThumbs/EmblaCarouselThumbs";
import { reserveDepartment } from "../../actions/departamentos";

//Hooks
import useAuth from "../../hooks/useAuth";

//CSS
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "./EmblaCarouselThumbs.css";
//import "./ReservarModal.css";

const DepartamentDetails = () => {
  let fechasReservadas = [];
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [dias, setDias] = useState(0);
  const [personas, setPersonas] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [valorFinal, setValorFinal] = useState(0);
  const [reservas, setReservas] = useState([]);
  const [webpayResponse, setWebpayResponse] = useState();
  const [confirmarReserva, setConfirmarReserva] = useState(true);
  const [departamento, setDepartamento] = useState();

  const idParams = location.search.slice(
    location.search.lastIndexOf("=") + 1,
    location.search.length
  );

  useEffect(() => {
    console.log(idParams);
    async function getDepartamento() {
      await axios
        .get(`/depto/${idParams}`)
        .then((res) => setDepartamento(res.data.deptoDB));
    }
    getDepartamento();
  }, [useLocation]);
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
  }, []);
  useEffect(() => {
    setValorFinal(departamento?.valorArriendo * dias);
  }, [startDate, endDate]);
  useEffect(() => {
    async function fetchReservas() {
      const token = {
        headers: {
          "Content-Type": "application/json",
          "x-token": auth?.token,
        },
      };
      const response = await axios.get(`/reservas/${idParams}`, token);
      setReservas(response.data.reservaDB);
    }
    fetchReservas();
  }, []);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);

    reserveDepartment(
      idParams,
      auth?.token,
      valorFinal,
      dias,
      startDate,
      endDate === null ? startDate : endDate
    )
      .then((res) => {
        setConfirmarReserva(true);
        // handleClose();
        console.log(res);
        localStorage.setItem("reservaID", res.data?.reserva?._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function fetchWebpay() {
      const responseWP = await axios.get(`/webpay_plus/pay/${valorFinal}`);
      console.log(responseWP);
      setWebpayResponse(responseWP?.data);
    }
    fetchWebpay();
  }, [valorFinal]);

  return (
    <React.Fragment>
      <div style={{ background: "#eeeeee", padding: "15px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="titleContainer">
                <Link
                  className="dt-volver-link"
                  style={{
                    color: "#334240",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                  to="/departamentos"
                >
                  {" "}
                  <i class="bx bx-arrow-back"></i> Volver a los Productos
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-6">
                      {departamento ? (
                        <section className="sandbox__carousel">
                          <EmblaCarousel
                            slides={departamento?.imgs}
                            options={{}}
                          />
                        </section>
                      ) : null}
                    </div>
                    <div className="col-xl-6">
                      <div className="mt-4 mt-xl-3">
                        <h3>{departamento?.nombre}</h3>
                        <h5>
                          <div>
                            <b class="price">
                              {MoneyFormatter(departamento?.valorArriendo)}
                            </b>
                          </div>
                        </h5>
                        <div className="d-flex">
                          <span
                            className="text-muted mb-1"
                            style={{ marginRight: "40px" }}
                          > <i className="bx bx-map-pin" style={{color:'#D92132'}} ></i>
                            {"Ubicacion: "}{" "}
                            <p style={{paddingLeft:'14px'}} >
                              {" "}
                              {departamento?.direccion}{" "}
                              {departamento?.ubicacion}{" "}
                            </p>
                          </span>
                          <span
                            className="text-muted mb-1"
                            style={{ marginRight: "35px" }}
                          ><i className="bx bx-check-circle" style={{color:'#2ED73F'}} ></i>
                            {"Disponible: "} <p style={{paddingLeft:'14px'}}> {departamento?.disponible} </p>
                          </span>
                          <span
                            className="text-muted mb-1"
                            style={{ marginRight: "15px" }}
                          > <i className="bx bx-calendar" style={{color:'#1441DD'}} ></i>
                            {"Fecha de Publicacion: "}{" "}
                            <p style={{paddingLeft:'14px'}}>
                              {" "}
                              {formatDate(departamento?.fechaPublicacion)}{" "}
                            </p>
                          </span>
                        </div>
                        <h4>Ingresar Datos</h4>
                        <Form
                          className="reservar__form" /* onSubmit={handleSubmit} */
                        >
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="personas">
                              Cantidad de Personas
                            </Form.Label>
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
                                  Nota: Si la fecha esta en color gris ya esta
                                  reservada{" "}
                                </b>{" "}
                              </p>
                            </DatePicker>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label htmlFor="dias">
                              Cantidad de Dias
                            </Form.Label>
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
                            <Form.Check
                              type="checkbox"
                              label="Añadir Servicios Extra"
                            />
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
                          {!confirmarReserva ? (
                            <Button variant="primary" style={{
                              width: "100%",
                              border: "none",
                              height: "40px",
                            }} onClick={handleSubmit}>
                              <i className="bx bx-hotel"></i> Confirmar Reserva
                            </Button>
                          ) : (
                            <form action={webpayResponse?.url} method="POST">
                              <input
                                type="hidden"
                                name="token_ws"
                                value={webpayResponse?.token}
                              />
                              <button
                                type="submit"
                                style={{
                                  width: "100%",
                                  border: "none",
                                  height: "40px",
                                }}
                                className="btn btn-success"
                                //  value='Pagar'
                              ><i className="bx bx-credit-card-alt"></i> Pagar </button> 
                            </form>
                          )}
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DepartamentDetails;
