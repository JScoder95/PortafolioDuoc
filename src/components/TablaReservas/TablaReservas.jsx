import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "../../api/axios";

import { cancelReserve } from "../../actions/departamentos";
import useAuth from "../../hooks/useAuth";
import { message } from "antd";
import { formatDate } from "../../common/utils";
import "./TablaReservas.css";

function TablaReservas({
  array,
  setIsLoading,
  handleOpenCheckIn,
  handleOpenCheckOut,
  handleOpenPago,
}) {
  const { auth } = useAuth();
  const [webpayResponse, setWebpayResponse] = useState();

  const success = () => {
    message.success("Has Cancelado la reserva Satisfactoriamente");
  };
  const error = () => {
    message.error("Ha ocurrido un error, intentalo nuevamente");
  };

  const handleClickCancelarReserva = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    cancelReserve(id, auth?.token)
      .then((res) => {
        setIsLoading(false);
        success();
      })
      .catch((err) => {
        error();
        console.log(err);
      });
  };
  useEffect(() => {
    async function fetchWebpay() {
      const valorFinal = array.map((reserva) => reserva.filter());
      if (valorFinal !== 0 && valorFinal !== NaN) {
        const responseWP = await axios.get(`/webpay_plus/pay/${valorFinal}`);

        setWebpayResponse(responseWP?.data);
      }
    }
    fetchWebpay();
  }, []);
  return (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>Departamento</th>
          <th>Reservado Por</th>
          <th>Fecha Inicio</th>
          <th>Fecha Termino</th>
          <th>Estado Pago</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {array?.map((item, index) => (
          <Fragment key={`item-${index}`}>
            <tr>
              <td>
                {" "}
                <i
                  className="bx bx-building-house"
                  style={{ color: "RGB(96 154 212)" }}
                ></i>{" "}
                {item?.departamento?.nombre}
              </td>
              <td>
                {" "}
                <i
                  className="bx bx-user"
                  style={{ color: "RGB(134 96 212)" }}
                ></i>{" "}
                {item?.usuario?.nombre}
              </td>
              <td>
                {" "}
                <i
                  className="bx bx-calendar-check"
                  style={{ color: "RGB(80 197 45)" }}
                ></i>{" "}
                {formatDate(item?.fechaInicio)}
              </td>
              <td>
                <i
                  className="bx bx-calendar-x"
                  style={{ color: "RGB(197 45 45)" }}
                ></i>{" "}
                {formatDate(item?.fechaFin)}
              </td>
              <td>
                {" "}
                <i
                  className="bx bx-credit-card-alt"
                  style={{
                    color:
                      item.statusPago === "Pago Exitoso"
                        ? "#2BB313"
                        : "#CE1111",
                  }}
                ></i>{" "}
                {item?.statusPago}
              </td>
              <td className="action__section">
                <div className="action__container">
                  {auth?.usuario?.rol === "Funcionario" &&
                  item.statusPago === "Pago Exitoso" ? (
                    <Fragment>
                      <Button
                        onClick={(e) => handleOpenCheckIn(e, item)}
                        variant="primary"
                        disabled={(item.checkIn === true && item.checkOut === true) || (item.checkIn === true && item.checkOut === false) ? true : false}
                        className="action__button"
                      >
                        Check In
                      </Button>
                      <Button
                        onClick={(e) => handleOpenCheckOut(e, item)}
                        variant="primary"
                        style={{ marginLeft: "10px" }}
                        className="action__button"
                        disabled={((item.checkOut === true && item.checkIn === true) || (item.checkOut === true && item.checkIn === false)) || (!item.checkIn && !item.checkOut) ? true : false}
                      >
                        Check Out
                      </Button>
                    </Fragment>
                  ) : auth?.usuario?.rol === "Funcionario" &&
                    (item.statusPago === "Pago Fallido" ||
                      item.statusPago === undefined) ? null : auth?.usuario
                      ?.rol === "Administrador" ? (
                    <Button
                      onClick={(e) => handleClickCancelarReserva(e, item?._id)}
                      variant="danger"
                      className="action__button"
                    >
                      Cancelar
                    </Button>
                  ) : auth?.usuario?.rol === "Cliente" &&
                    (item.statusPago === "Pago Fallido" ||
                      item.statusPago === undefined) ? (
                    <Button
                      onClick={(e) => handleOpenPago(e, item)}
                      variant="primary"
                      className="action__button"
                    >
                      {" "}
                      Pagar{" "}
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => handleClickCancelarReserva(e, item?._id)}
                      variant="danger"
                      className="action__button"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </Table>
  );
}

export default TablaReservas;
