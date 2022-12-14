import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import { formatDate, MoneyFormatter } from "../../common/utils";
import useAuth from "../../hooks/useAuth";

const queryParams = new URLSearchParams(window.location.search);

const tbk_token = queryParams.get("TBK_TOKEN");
const tbk_orden_compra = queryParams.get("TBK_ORDEN_COMPRA");
const tbk_id_sesion = queryParams.get("TBK_ID_SESION");
const ws_token = queryParams.get("token_ws");

export const RespuestaPago = () => {
  const [webpayResonse, setWebpayResonse] = useState();
  const [reserva, setReserva] = useState([]);
  const [statusCompra, setStatusCompra] = useState("");
  const [mensajeStatusCompra, setMensajeStatusCompra] = useState("");
  const { auth, setAuth } = useAuth();
  const authLocal = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    setAuth(authLocal);
    async function fetchReservas() {
      const token = {
        headers: {
          "Content-Type": "application/json",
          "x-token": auth?.token,
        },
      };
      const response = await axios.get(
        `/reservas/comfir/${localStorage.getItem("reservaID")}`,
        token
      );
      setReserva(response.data.reservaDB);
    }

    fetchReservas();
  }, []);
  useEffect(() => {
    async function fetchWebpay() {
      if (ws_token != null) {
        const response = await axios
          .get(`/webpay_plus/commit?token_ws=${ws_token}`)
          .then((res) => {
            setWebpayResonse(res.data);
            if(res.data?.viewData?.commitResponse?.status === "FAILED"){
            setStatusCompra('Pago Fallido')
            setMensajeStatusCompra('Su pago no se ha realizado correctamente, por favor intente nuevamente');
            const body = {
              id: localStorage.getItem("reservaID"),
              statusPago: 'Pago Fallido',
            };

            const config = {
              headers: {
                "Content-Type": "application/json",
                "x-token": authLocal?.token,
              },
            };
            const update = axios.post("reservas/update/status", body, config);
            console.log(update);
            }else{
            setStatusCompra('Pago Exitoso');
            setMensajeStatusCompra('Su pago se ha realizado correctamente, puede revisar su estado en el historial de reservas');
            const body = {
              id: localStorage.getItem("reservaID"),
              statusPago: 'Pago Exitoso',
            };

            const config = {
              headers: {
                "Content-Type": "application/json",
                "x-token": authLocal?.token,
              },
            };
            const update = axios.post("reservas/update/status", body, config);
            console.log(update);
            }
            
          });
      } else {
        const response = await axios
          .get(
            `/webpay_plus/commit?TBK_TOKEN=${tbk_token}&TBK_ORDEN_COMPRA=${tbk_orden_compra}&TBK_ORDEN_COMPRA${tbk_id_sesion}`
          )
          .then((res) => {
            setWebpayResonse(res.data);
            if(res.data?.pago === "Pago Fallido"){
              setStatusCompra('Pago Fallido')
              setMensajeStatusCompra('Usted a cancelado el pago, por favor intente nuevamente')
              }
            const body = {
              id: localStorage.getItem("reservaID"),
              statusPago: res.data?.pago,
            };
            const config = {
              headers: {
                "Content-Type": "application/json",
                "x-token": authLocal?.token,
              },
            };
            const update = axios.post("reservas/update/status", body, config);
            console.log(update);
          });
      }
    }

    fetchWebpay();
  }, []);

  console.log(webpayResonse);
  console.log(reserva);
  return (
    <div className="maincontainer">
      <div className="container">
        <div className="py-3 text-center">
          <h2>{statusCompra}</h2>
          <p className="lead">{mensajeStatusCompra}</p>
        </div>
        <div className="transfer-card shadow-none border mb-12">
          <h3 className="col-md-12 order-md-12 mb-12 transfer-card-title">
            {`Datos de la Reserva`}
          </h3>
          <p style={{ display: "flex" }}>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Numero de Reserva:"}
            </span>
            <p>{reserva?._id}</p>
          </p>

          <div>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Fecha Creación Reserva:"}
            </span>
            <p>{formatDate(reserva?.created)}</p>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Departamento:"}
              <p>
                {"Nombre:"} {reserva?.departamento?.nombre}{" "}
              </p>
              <p>
                {"Direccion:"} {reserva?.departamento?.direccion}
                {", "}
                {reserva?.departamento?.ubicacion}{" "}
              </p>
            </span>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Fecha Inicio Reserva:"}
            </span>
            <p>{formatDate(reserva.fechaInicio)}</p>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Fecha Fin Reserva:"}
            </span>
            <p>{formatDate(reserva.fechaFin)}</p>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Cantidad de Días:"}
            </span>
            <p> {reserva.cantidadDias} </p>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Valor:"}
            </span>
            <p>{MoneyFormatter(reserva.valorFinal)}</p>
            <span className="text-muted mb-2" style={{ marginRight: "5px" }}>
              {"Status:"}
            </span>
            <h3> {statusCompra} </h3>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 order-md-12 mb-12">
            <div className="text-sm-center">
              <Link to="/reservas" className="btn btn-success">
                <i className="mdi mdi-truck-fast me-1" /> {`Volver al inicio`}{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
