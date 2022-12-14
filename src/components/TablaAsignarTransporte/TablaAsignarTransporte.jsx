import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { cancelReserve } from "../../actions/departamentos";
import useAuth from "../../hooks/useAuth";
import "./TablaAsignarTransporte.css";
import { formatDate } from "../../common/utils";

function TablaAsignarTransporte({
  array,
  setIsLoading,
  handleOpenCheckIn,
  handleOpenCheckOut,
}) {
  const { auth } = useAuth();

  const handleClickCancelarReserva = (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    cancelReserve(id, auth?.token)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Departamento</th>
          <th>A Nombre de</th>
          <th>Fecha Inicio</th>
          <th>Fecha Termino</th>
          <th>Transporte</th>
          <th>Accion</th>
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
              {item?.transporte?.conductor.length >=0 ? (<td> <div> <i className="bx bx-face" style={{ color: "RGB(193 128 43)" }}  ></i> {item?.transporte?.conductor} </div><div> <i className="bx bx-car" style={{ color: "RGB(193 128 43)" }} ></i> {item?.transporte?.patente}</div> </td>):(<td> {' '} </td>)}
              
              <td className="action__section">
                <div className="action__container">
                  {auth?.usuario?.rol === "Funcionario" ? (
                    <Fragment>
                      <Button
                        onClick={(e) => handleOpenCheckIn(e, item)}
                        variant="primary"
                        disabled={
                          (item.checkIn === true && item.checkOut === true) ||
                          (item.checkIn === true && item.checkOut === false)
                            ? true
                            : false
                        }
                      >
                        Check In
                      </Button>
                      <Button
                        onClick={(e) => handleOpenCheckOut(e, item)}
                        variant="primary"
                        style={{ marginLeft: "10px" }}
                        disabled={
                          (item.checkOut === true && item.checkIn === true) ||
                          (item.checkOut === true && item.checkIn === false) ||
                          (!item.checkIn && !item.checkOut)
                            ? true
                            : false
                        }
                      >
                        Check Out
                      </Button>
                    </Fragment>
                  ) : (
                    <Button
                      onClick={(e) => handleClickCancelarReserva(e, item?._id)}
                      variant="primary"
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

export default TablaAsignarTransporte;
